import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { donations } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

const VALID_ITEM_TYPES = ['electronics', 'furniture', 'clothing', 'books', 'toys', 'kitchenware', 'other'];
const VALID_CONDITIONS = ['excellent', 'good', 'fair'];
const VALID_STATUSES = ['pending', 'accepted', 'rejected', 'picked-up', 'delivered'];

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single donation by ID
    if (id) {
      if (isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        }, { status: 400 });
      }

      const donation = await db.select()
        .from(donations)
        .where(and(
          eq(donations.id, parseInt(id)),
          eq(donations.userId, user.id)
        ))
        .limit(1);

      if (donation.length === 0) {
        return NextResponse.json({ 
          error: 'Donation not found',
          code: 'NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(donation[0], { status: 200 });
    }

    // List donations with filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const filterUserId = searchParams.get('user_id');
    const filterNgoId = searchParams.get('ngo_id');
    const filterStatus = searchParams.get('status');

    let query = db.select().from(donations);
    const conditions = [eq(donations.userId, user.id)];

    if (filterUserId) {
      conditions.push(eq(donations.userId, filterUserId));
    }

    if (filterNgoId) {
      conditions.push(eq(donations.ngoId, filterNgoId));
    }

    if (filterStatus) {
      if (!VALID_STATUSES.includes(filterStatus)) {
        return NextResponse.json({ 
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
          code: 'INVALID_STATUS' 
        }, { status: 400 });
      }
      conditions.push(eq(donations.status, filterStatus));
    }

    if (conditions.length > 1) {
      query = query.where(and(...conditions));
    } else {
      query = query.where(conditions[0]);
    }

    const results = await query.limit(limit).offset(offset);

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
        error: 'User ID cannot be provided in request body',
        code: 'USER_ID_NOT_ALLOWED' 
      }, { status: 400 });
    }

    // Validate required fields
    const requiredFields = [
      'itemType', 'itemName', 'condition', 'quantity', 
      'description', 'pickupAddress', 'contactNumber'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ 
          error: `${field} is required`,
          code: 'MISSING_REQUIRED_FIELD' 
        }, { status: 400 });
      }
    }

    // Validate itemType
    if (!VALID_ITEM_TYPES.includes(body.itemType)) {
      return NextResponse.json({ 
        error: `Invalid item type. Must be one of: ${VALID_ITEM_TYPES.join(', ')}`,
        code: 'INVALID_ITEM_TYPE' 
      }, { status: 400 });
    }

    // Validate condition
    if (!VALID_CONDITIONS.includes(body.condition)) {
      return NextResponse.json({ 
        error: `Invalid condition. Must be one of: ${VALID_CONDITIONS.join(', ')}`,
        code: 'INVALID_CONDITION' 
      }, { status: 400 });
    }

    // Validate quantity
    if (typeof body.quantity !== 'number' || body.quantity <= 0) {
      return NextResponse.json({ 
        error: 'Quantity must be a positive number',
        code: 'INVALID_QUANTITY' 
      }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedData = {
      userId: user.id,
      ngoId: body.ngoId?.trim() || null,
      itemType: body.itemType.trim(),
      itemName: body.itemName.trim(),
      condition: body.condition.trim(),
      quantity: parseInt(body.quantity),
      description: body.description.trim(),
      pickupAddress: body.pickupAddress.trim(),
      contactNumber: body.contactNumber.trim(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newDonation = await db.insert(donations)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newDonation[0], { status: 201 });
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: 'Valid ID is required',
        code: 'INVALID_ID' 
      }, { status: 400 });
    }

    const body = await request.json();

    // Security check: reject if userId provided in body
    if ('userId' in body || 'user_id' in body) {
      return NextResponse.json({ 
        error: 'User ID cannot be provided in request body',
        code: 'USER_ID_NOT_ALLOWED' 
      }, { status: 400 });
    }

    // Check if donation exists and belongs to user
    const existingDonation = await db.select()
      .from(donations)
      .where(and(
        eq(donations.id, parseInt(id)),
        eq(donations.userId, user.id)
      ))
      .limit(1);

    if (existingDonation.length === 0) {
      return NextResponse.json({ 
        error: 'Donation not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    // Build update object
    const updates: any = {
      updatedAt: new Date().toISOString()
    };

    // Validate and add status if provided
    if (body.status) {
      if (!VALID_STATUSES.includes(body.status)) {
        return NextResponse.json({ 
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
          code: 'INVALID_STATUS' 
        }, { status: 400 });
      }
      updates.status = body.status.trim();
    }

    // Add ngoId if provided
    if (body.ngoId !== undefined) {
      updates.ngoId = body.ngoId ? body.ngoId.trim() : null;
    }

    // Update the donation
    const updated = await db.update(donations)
      .set(updates)
      .where(and(
        eq(donations.id, parseInt(id)),
        eq(donations.userId, user.id)
      ))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ 
        error: 'Donation not found',
        code: 'NOT_FOUND' 
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: 'Valid ID is required',
        code: 'INVALID_ID' 
      }, { status: 400 });
    }

    // Check if donation exists and belongs to user
    const existingDonation = await db.select()
      .from(donations)
      .where(and(
        eq(donations.id, parseInt(id)),
        eq(donations.userId, user.id)
      ))
      .limit(1);

    if (existingDonation.length === 0) {
      return NextResponse.json({ 
        error: 'Donation not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    // Delete the donation
    const deleted = await db.delete(donations)
      .where(and(
        eq(donations.id, parseInt(id)),
        eq(donations.userId, user.id)
      ))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ 
        error: 'Donation not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Donation deleted successfully',
      donation: deleted[0]
    }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error as Error).message 
    }, { status: 500 });
  }
}