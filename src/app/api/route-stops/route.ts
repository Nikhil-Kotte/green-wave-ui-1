import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { routeStops } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const routeId = searchParams.get('route_id');

    // Validate route_id parameter is provided
    if (!routeId) {
      return NextResponse.json(
        { 
          error: 'Route ID is required',
          code: 'MISSING_ROUTE_ID' 
        },
        { status: 400 }
      );
    }

    // Validate route_id is a valid number
    if (isNaN(parseInt(routeId))) {
      return NextResponse.json(
        { 
          error: 'Valid route ID is required',
          code: 'INVALID_ROUTE_ID' 
        },
        { status: 400 }
      );
    }

    // Fetch all stops for the route ordered by stopOrder
    const stops = await db
      .select()
      .from(routeStops)
      .where(eq(routeStops.routeId, parseInt(routeId)))
      .orderBy(asc(routeStops.stopOrder));

    return NextResponse.json(stops, { status: 200 });
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
    const { routeId, pickupId, stopOrder, address, wasteType } = body;

    // Validate required fields
    if (!routeId) {
      return NextResponse.json(
        { 
          error: 'Route ID is required',
          code: 'MISSING_ROUTE_ID' 
        },
        { status: 400 }
      );
    }

    if (!pickupId) {
      return NextResponse.json(
        { 
          error: 'Pickup ID is required',
          code: 'MISSING_PICKUP_ID' 
        },
        { status: 400 }
      );
    }

    if (stopOrder === undefined || stopOrder === null) {
      return NextResponse.json(
        { 
          error: 'Stop order is required',
          code: 'MISSING_STOP_ORDER' 
        },
        { status: 400 }
      );
    }

    if (!address) {
      return NextResponse.json(
        { 
          error: 'Address is required',
          code: 'MISSING_ADDRESS' 
        },
        { status: 400 }
      );
    }

    if (!wasteType) {
      return NextResponse.json(
        { 
          error: 'Waste type is required',
          code: 'MISSING_WASTE_TYPE' 
        },
        { status: 400 }
      );
    }

    // Validate numeric fields are valid numbers
    if (isNaN(parseInt(routeId.toString()))) {
      return NextResponse.json(
        { 
          error: 'Valid route ID is required',
          code: 'INVALID_ROUTE_ID' 
        },
        { status: 400 }
      );
    }

    if (isNaN(parseInt(pickupId.toString()))) {
      return NextResponse.json(
        { 
          error: 'Valid pickup ID is required',
          code: 'INVALID_PICKUP_ID' 
        },
        { status: 400 }
      );
    }

    if (isNaN(parseInt(stopOrder.toString()))) {
      return NextResponse.json(
        { 
          error: 'Valid stop order is required',
          code: 'INVALID_STOP_ORDER' 
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedAddress = address.trim();
    const sanitizedWasteType = wasteType.trim();

    // Create new route stop with default status
    const newStop = await db
      .insert(routeStops)
      .values({
        routeId: parseInt(routeId.toString()),
        pickupId: parseInt(pickupId.toString()),
        stopOrder: parseInt(stopOrder.toString()),
        address: sanitizedAddress,
        wasteType: sanitizedWasteType,
        status: 'pending',
      })
      .returning();

    return NextResponse.json(newStop[0], { status: 201 });
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

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate ID is provided
    if (!id) {
      return NextResponse.json(
        { 
          error: 'Stop ID is required',
          code: 'MISSING_STOP_ID' 
        },
        { status: 400 }
      );
    }

    // Validate ID is a valid number
    if (isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid stop ID is required',
          code: 'INVALID_STOP_ID' 
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, arrivalTime, departureTime } = body;

    // Check if stop exists
    const existingStop = await db
      .select()
      .from(routeStops)
      .where(eq(routeStops.id, parseInt(id)))
      .limit(1);

    if (existingStop.length === 0) {
      return NextResponse.json(
        { 
          error: 'Route stop not found',
          code: 'STOP_NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Build update object with only provided fields
    const updates: {
      status?: string;
      arrivalTime?: string | null;
      departureTime?: string | null;
    } = {};

    if (status !== undefined) {
      if (typeof status !== 'string' || status.trim() === '') {
        return NextResponse.json(
          { 
            error: 'Valid status is required',
            code: 'INVALID_STATUS' 
          },
          { status: 400 }
        );
      }
      updates.status = status.trim();
    }

    if (arrivalTime !== undefined) {
      updates.arrivalTime = arrivalTime;
    }

    if (departureTime !== undefined) {
      updates.departureTime = departureTime;
    }

    // Ensure at least one field is being updated
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { 
          error: 'No valid fields to update',
          code: 'NO_UPDATE_FIELDS' 
        },
        { status: 400 }
      );
    }

    // Update the stop
    const updatedStop = await db
      .update(routeStops)
      .set(updates)
      .where(eq(routeStops.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedStop[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}