import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { trackingLocations } from '@/db/schema';
import { eq, and, gte, lte, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Validate required collector_id parameter
    const collectorId = searchParams.get('collector_id');
    if (!collectorId) {
      return NextResponse.json(
        { 
          error: 'collector_id query parameter is required',
          code: 'MISSING_COLLECTOR_ID' 
        },
        { status: 400 }
      );
    }

    // Optional filter parameters
    const startTime = searchParams.get('start_time');
    const endTime = searchParams.get('end_time');
    const routeId = searchParams.get('route_id');
    
    // Pagination parameters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '100'), 500);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Build where conditions dynamically
    const conditions = [eq(trackingLocations.collectorId, collectorId)];

    if (startTime) {
      conditions.push(gte(trackingLocations.timestamp, startTime));
    }

    if (endTime) {
      conditions.push(lte(trackingLocations.timestamp, endTime));
    }

    if (routeId) {
      const routeIdInt = parseInt(routeId);
      if (!isNaN(routeIdInt)) {
        conditions.push(eq(trackingLocations.routeId, routeIdInt));
      }
    }

    // Execute query with all conditions
    const locations = await db
      .select()
      .from(trackingLocations)
      .where(and(...conditions))
      .orderBy(desc(trackingLocations.timestamp))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { collectorId, latitude, longitude } = body;
    
    if (!collectorId) {
      return NextResponse.json(
        { 
          error: 'collectorId is required',
          code: 'MISSING_COLLECTOR_ID' 
        },
        { status: 400 }
      );
    }

    if (latitude === undefined || latitude === null) {
      return NextResponse.json(
        { 
          error: 'latitude is required',
          code: 'MISSING_LATITUDE' 
        },
        { status: 400 }
      );
    }

    if (longitude === undefined || longitude === null) {
      return NextResponse.json(
        { 
          error: 'longitude is required',
          code: 'MISSING_LONGITUDE' 
        },
        { status: 400 }
      );
    }

    // Validate latitude and longitude ranges
    if (latitude < -90 || latitude > 90) {
      return NextResponse.json(
        { 
          error: 'latitude must be between -90 and 90',
          code: 'INVALID_LATITUDE' 
        },
        { status: 400 }
      );
    }

    if (longitude < -180 || longitude > 180) {
      return NextResponse.json(
        { 
          error: 'longitude must be between -180 and 180',
          code: 'INVALID_LONGITUDE' 
        },
        { status: 400 }
      );
    }

    // Optional fields
    const routeId = body.routeId ? parseInt(body.routeId) : null;
    const speed = body.speed !== undefined && body.speed !== null ? parseFloat(body.speed) : null;

    // Validate speed if provided
    if (speed !== null && (speed < 0 || speed > 300)) {
      return NextResponse.json(
        { 
          error: 'speed must be between 0 and 300 km/h',
          code: 'INVALID_SPEED' 
        },
        { status: 400 }
      );
    }

    // Insert location with auto-generated timestamp
    const newLocation = await db
      .insert(trackingLocations)
      .values({
        collectorId,
        routeId,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        timestamp: new Date().toISOString(),
        speed,
      })
      .returning();

    return NextResponse.json(newLocation[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Check if record exists
    const existing = await db
      .select()
      .from(trackingLocations)
      .where(eq(trackingLocations.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { 
          error: 'Location record not found',
          code: 'NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Delete the record
    const deleted = await db
      .delete(trackingLocations)
      .where(eq(trackingLocations.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Location record deleted successfully',
        record: deleted[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}