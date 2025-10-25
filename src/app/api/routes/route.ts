import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { routes, routeStops } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single route by ID with stops
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const route = await db
        .select()
        .from(routes)
        .where(eq(routes.id, parseInt(id)))
        .limit(1);

      if (route.length === 0) {
        return NextResponse.json(
          { error: 'Route not found', code: 'ROUTE_NOT_FOUND' },
          { status: 404 }
        );
      }

      // Fetch related route stops
      const stops = await db
        .select()
        .from(routeStops)
        .where(eq(routeStops.routeId, parseInt(id)))
        .orderBy(routeStops.stopOrder);

      return NextResponse.json({
        ...route[0],
        stops
      });
    }

    // List all routes with filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const collectorId = searchParams.get('collector_id');
    const status = searchParams.get('status');

    let query = db.select().from(routes);

    // Apply filters
    const conditions = [];
    if (collectorId) {
      conditions.push(eq(routes.collectorId, collectorId));
    }
    if (status) {
      conditions.push(eq(routes.status, status));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(routes.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();

    // Security check: reject if userId provided in body
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json(
        {
          error: 'User ID cannot be provided in request body',
          code: 'USER_ID_NOT_ALLOWED'
        },
        { status: 400 }
      );
    }

    const { name, collectorId, totalDistance, totalPickups } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Route name is required', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!collectorId) {
      return NextResponse.json(
        { error: 'Collector ID is required', code: 'MISSING_COLLECTOR_ID' },
        { status: 400 }
      );
    }

    if (totalDistance === undefined || totalDistance === null) {
      return NextResponse.json(
        { error: 'Total distance is required', code: 'MISSING_TOTAL_DISTANCE' },
        { status: 400 }
      );
    }

    if (totalPickups === undefined || totalPickups === null) {
      return NextResponse.json(
        { error: 'Total pickups is required', code: 'MISSING_TOTAL_PICKUPS' },
        { status: 400 }
      );
    }

    // Validate types
    if (typeof totalDistance !== 'number' || totalDistance < 0) {
      return NextResponse.json(
        { error: 'Total distance must be a positive number', code: 'INVALID_TOTAL_DISTANCE' },
        { status: 400 }
      );
    }

    if (typeof totalPickups !== 'number' || totalPickups < 0 || !Number.isInteger(totalPickups)) {
      return NextResponse.json(
        { error: 'Total pickups must be a positive integer', code: 'INVALID_TOTAL_PICKUPS' },
        { status: 400 }
      );
    }

    const newRoute = await db
      .insert(routes)
      .values({
        name: name.trim(),
        collectorId: collectorId.trim(),
        totalDistance,
        totalPickups,
        status: 'planned',
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newRoute[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Security check: reject if userId provided in body
    if ('userId' in body || 'user_id' in body || 'collectorId' in body || 'collector_id' in body) {
      return NextResponse.json(
        {
          error: 'User ID cannot be provided in request body',
          code: 'USER_ID_NOT_ALLOWED'
        },
        { status: 400 }
      );
    }

    // Check if route exists
    const existingRoute = await db
      .select()
      .from(routes)
      .where(eq(routes.id, parseInt(id)))
      .limit(1);

    if (existingRoute.length === 0) {
      return NextResponse.json(
        { error: 'Route not found', code: 'ROUTE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const { status, startTime, endTime } = body;

    // Build update object
    const updates: any = {};

    if (status !== undefined) {
      const validStatuses = ['planned', 'active', 'completed'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          {
            error: 'Invalid status. Must be one of: planned, active, completed',
            code: 'INVALID_STATUS'
          },
          { status: 400 }
        );
      }
      updates.status = status;
    }

    if (startTime !== undefined) {
      if (startTime !== null && typeof startTime !== 'string') {
        return NextResponse.json(
          { error: 'Start time must be a valid ISO timestamp string', code: 'INVALID_START_TIME' },
          { status: 400 }
        );
      }
      updates.startTime = startTime;
    }

    if (endTime !== undefined) {
      if (endTime !== null && typeof endTime !== 'string') {
        return NextResponse.json(
          { error: 'End time must be a valid ISO timestamp string', code: 'INVALID_END_TIME' },
          { status: 400 }
        );
      }
      updates.endTime = endTime;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update', code: 'NO_UPDATES' },
        { status: 400 }
      );
    }

    const updated = await db
      .update(routes)
      .set(updates)
      .where(eq(routes.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { error: 'Valid ID is required', code: 'INVALID_ID' },
        { status: 400 }
      );
    }

    // Check if route exists
    const existingRoute = await db
      .select()
      .from(routes)
      .where(eq(routes.id, parseInt(id)))
      .limit(1);

    if (existingRoute.length === 0) {
      return NextResponse.json(
        { error: 'Route not found', code: 'ROUTE_NOT_FOUND' },
        { status: 404 }
      );
    }

    const deleted = await db
      .delete(routes)
      .where(eq(routes.id, parseInt(id)))
      .returning();

    return NextResponse.json({
      message: 'Route deleted successfully',
      route: deleted[0]
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}