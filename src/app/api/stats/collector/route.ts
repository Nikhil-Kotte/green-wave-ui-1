import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { routes, pickups } from '@/db/schema';
import { eq, and, sum, count } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const collectorId = searchParams.get('collector_id');

    // Validate collector_id is provided
    if (!collectorId) {
      return NextResponse.json(
        { 
          error: 'Collector ID is required',
          code: 'MISSING_COLLECTOR_ID'
        },
        { status: 400 }
      );
    }

    // Calculate routes statistics
    const routesCompleted = await db
      .select({ count: count() })
      .from(routes)
      .where(and(
        eq(routes.collectorId, collectorId),
        eq(routes.status, 'completed')
      ));

    const activeRoutesCount = await db
      .select({ count: count() })
      .from(routes)
      .where(and(
        eq(routes.collectorId, collectorId),
        eq(routes.status, 'active')
      ));

    const totalRoutesCount = await db
      .select({ count: count() })
      .from(routes)
      .where(eq(routes.collectorId, collectorId));

    // Calculate pickups statistics
    const pickupsCompletedCount = await db
      .select({ count: count() })
      .from(pickups)
      .where(and(
        eq(pickups.collectorId, collectorId),
        eq(pickups.status, 'completed')
      ));

    // Calculate total distance from completed routes
    const distanceResult = await db
      .select({ total: sum(routes.totalDistance) })
      .from(routes)
      .where(and(
        eq(routes.collectorId, collectorId),
        eq(routes.status, 'completed')
      ));

    // Extract values and provide defaults
    const routesCompletedValue = routesCompleted[0]?.count || 0;
    const activeRoutesValue = activeRoutesCount[0]?.count || 0;
    const totalRoutesValue = totalRoutesCount[0]?.count || 0;
    const pickupsCompletedValue = pickupsCompletedCount[0]?.count || 0;
    const distanceTraveledValue = distanceResult[0]?.total || 0;

    // Round distance to 2 decimal places
    const distanceTraveled = Math.round(Number(distanceTraveledValue) * 100) / 100;

    return NextResponse.json({
      routesCompleted: routesCompletedValue,
      activeRoutes: activeRoutesValue,
      totalRoutes: totalRoutesValue,
      pickupsCompleted: pickupsCompletedValue,
      distanceTraveled
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error as Error).message 
      },
      { status: 500 }
    );
  }
}