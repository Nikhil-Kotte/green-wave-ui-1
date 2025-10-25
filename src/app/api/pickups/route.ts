import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pickups } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

const VALID_WASTE_TYPES = ['plastic', 'metal', 'paper', 'glass', 'ewaste', 'organic', 'mixed'];
const VALID_PICKUP_TIMES = ['morning', 'afternoon', 'evening'];
const VALID_STATUSES = ['pending', 'assigned', 'in-progress', 'completed', 'cancelled'];

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single pickup by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const pickup = await db.select()
        .from(pickups)
        .where(and(eq(pickups.id, parseInt(id)), eq(pickups.userId, user.id)))
        .limit(1);

      if (pickup.length === 0) {
        return NextResponse.json({ 
          error: 'Pickup not found',
          code: 'PICKUP_NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(pickup[0], { status: 200 });
    }

    // List pickups with pagination and filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const statusFilter = searchParams.get('status');
    const userIdFilter = searchParams.get('user_id');
    const collectorIdFilter = searchParams.get('collector_id');

    let conditions = [eq(pickups.userId, user.id)];

    if (statusFilter) {
      if (!VALID_STATUSES.includes(statusFilter)) {
        return NextResponse.json({ 
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
          code: "INVALID_STATUS" 
        }, { status: 400 });
      }
      conditions.push(eq(pickups.status, statusFilter));
    }

    if (userIdFilter) {
      conditions.push(eq(pickups.userId, userIdFilter));
    }

    if (collectorIdFilter) {
      conditions.push(eq(pickups.collectorId, collectorIdFilter));
    }

    const results = await db.select()
      .from(pickups)
      .where(and(...conditions))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
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
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    const { wasteType, pickupDate, pickupTime, address, estimatedWeight, notes } = body;

    // Validate required fields
    if (!wasteType) {
      return NextResponse.json({ 
        error: "wasteType is required",
        code: "MISSING_WASTE_TYPE" 
      }, { status: 400 });
    }

    if (!pickupDate) {
      return NextResponse.json({ 
        error: "pickupDate is required",
        code: "MISSING_PICKUP_DATE" 
      }, { status: 400 });
    }

    if (!pickupTime) {
      return NextResponse.json({ 
        error: "pickupTime is required",
        code: "MISSING_PICKUP_TIME" 
      }, { status: 400 });
    }

    if (!address) {
      return NextResponse.json({ 
        error: "address is required",
        code: "MISSING_ADDRESS" 
      }, { status: 400 });
    }

    if (estimatedWeight === undefined || estimatedWeight === null) {
      return NextResponse.json({ 
        error: "estimatedWeight is required",
        code: "MISSING_ESTIMATED_WEIGHT" 
      }, { status: 400 });
    }

    // Validate wasteType enum
    if (!VALID_WASTE_TYPES.includes(wasteType)) {
      return NextResponse.json({ 
        error: `Invalid wasteType. Must be one of: ${VALID_WASTE_TYPES.join(', ')}`,
        code: "INVALID_WASTE_TYPE" 
      }, { status: 400 });
    }

    // Validate pickupTime enum
    if (!VALID_PICKUP_TIMES.includes(pickupTime)) {
      return NextResponse.json({ 
        error: `Invalid pickupTime. Must be one of: ${VALID_PICKUP_TIMES.join(', ')}`,
        code: "INVALID_PICKUP_TIME" 
      }, { status: 400 });
    }

    // Validate estimatedWeight is a positive number
    if (typeof estimatedWeight !== 'number' || estimatedWeight <= 0) {
      return NextResponse.json({ 
        error: "estimatedWeight must be a positive number",
        code: "INVALID_ESTIMATED_WEIGHT" 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedAddress = address.trim();

    const newPickup = await db.insert(pickups)
      .values({
        userId: user.id,
        wasteType: wasteType.trim(),
        pickupDate: pickupDate.trim(),
        pickupTime: pickupTime.trim(),
        address: sanitizedAddress,
        estimatedWeight,
        notes: notes ? notes.trim() : null,
        status: 'pending',
        createdAt: new Date().toISOString()
      })
      .returning();

    return NextResponse.json(newPickup[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const body = await request.json();

    // Security check: reject if userId provided in body
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED" 
      }, { status: 400 });
    }

    // Check if record exists and belongs to user
    const existing = await db.select()
      .from(pickups)
      .where(and(eq(pickups.id, parseInt(id)), eq(pickups.userId, user.id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Pickup not found',
        code: 'PICKUP_NOT_FOUND' 
      }, { status: 404 });
    }

    const { status, collectorId, actualWeight, notes, completedAt } = body;

    // Prepare update data
    const updateData: any = {};

    if (status !== undefined) {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json({ 
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
          code: "INVALID_STATUS" 
        }, { status: 400 });
      }
      updateData.status = status;

      // Auto-set completedAt if status is completed and not provided
      if (status === 'completed' && !completedAt) {
        updateData.completedAt = new Date().toISOString();
      }
    }

    if (collectorId !== undefined) {
      updateData.collectorId = collectorId;
    }

    if (actualWeight !== undefined) {
      if (actualWeight !== null && (typeof actualWeight !== 'number' || actualWeight <= 0)) {
        return NextResponse.json({ 
          error: "actualWeight must be a positive number or null",
          code: "INVALID_ACTUAL_WEIGHT" 
        }, { status: 400 });
      }
      updateData.actualWeight = actualWeight;
    }

    if (notes !== undefined) {
      updateData.notes = notes ? notes.trim() : null;
    }

    if (completedAt !== undefined) {
      updateData.completedAt = completedAt;
    }

    const updated = await db.update(pickups)
      .set(updateData)
      .where(and(eq(pickups.id, parseInt(id)), eq(pickups.userId, user.id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'Pickup not found',
        code: 'PICKUP_NOT_FOUND' 
      }, { status: 404 });
    }

    return NextResponse.json(updated[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if record exists and belongs to user
    const existing = await db.select()
      .from(pickups)
      .where(and(eq(pickups.id, parseInt(id)), eq(pickups.userId, user.id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Pickup not found',
        code: 'PICKUP_NOT_FOUND' 
      }, { status: 404 });
    }

    const deleted = await db.delete(pickups)
      .where(and(eq(pickups.id, parseInt(id)), eq(pickups.userId, user.id)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ 
        error: 'Pickup not found',
        code: 'PICKUP_NOT_FOUND' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Pickup deleted successfully',
      pickup: deleted[0]
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}