import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { trackingLocations } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collectorId = searchParams.get('collector_id');

    if (!collectorId) {
      return NextResponse.json({ 
        error: "collector_id parameter is required",
        code: "MISSING_COLLECTOR_ID" 
      }, { status: 400 });
    }

    const location = await db.select()
      .from(trackingLocations)
      .where(eq(trackingLocations.collectorId, collectorId))
      .orderBy(desc(trackingLocations.timestamp))
      .limit(1);

    if (location.length === 0) {
      return NextResponse.json({ 
        error: 'No location found for collector',
        code: "LOCATION_NOT_FOUND" 
      }, { status: 404 });
    }

    return NextResponse.json(location[0], { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { collectorId, routeId, latitude, longitude, speed } = body;

    if (!collectorId) {
      return NextResponse.json({ 
        error: "collectorId is required",
        code: "MISSING_COLLECTOR_ID" 
      }, { status: 400 });
    }

    if (latitude === undefined || latitude === null) {
      return NextResponse.json({ 
        error: "latitude is required",
        code: "MISSING_LATITUDE" 
      }, { status: 400 });
    }

    if (longitude === undefined || longitude === null) {
      return NextResponse.json({ 
        error: "longitude is required",
        code: "MISSING_LONGITUDE" 
      }, { status: 400 });
    }

    if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
      return NextResponse.json({ 
        error: "latitude must be a number between -90 and 90",
        code: "INVALID_LATITUDE" 
      }, { status: 400 });
    }

    if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
      return NextResponse.json({ 
        error: "longitude must be a number between -180 and 180",
        code: "INVALID_LONGITUDE" 
      }, { status: 400 });
    }

    if (speed !== undefined && speed !== null && (typeof speed !== 'number' || speed < 0)) {
      return NextResponse.json({ 
        error: "speed must be a positive number",
        code: "INVALID_SPEED" 
      }, { status: 400 });
    }

    const newLocation = await db.insert(trackingLocations)
      .values({
        collectorId,
        routeId: routeId || null,
        latitude,
        longitude,
        timestamp: new Date().toISOString(),
        speed: speed || null,
      })
      .returning();

    return NextResponse.json(newLocation[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}