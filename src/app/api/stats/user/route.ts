import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { pickups, donations } from '@/db/schema';
import { eq, and, or, sum, count, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    // Validate user_id parameter
    if (!userId) {
      return NextResponse.json(
        { 
          error: 'User ID is required',
          code: 'MISSING_USER_ID' 
        },
        { status: 400 }
      );
    }

    // Calculate pickup statistics
    const pickupStats = await db
      .select({
        totalPickups: count(),
        completedPickups: sum(
          sql`CASE WHEN ${pickups.status} = 'completed' THEN 1 ELSE 0 END`
        ).mapWith(Number),
        totalWeightRecycled: sum(
          sql`CASE WHEN ${pickups.status} = 'completed' AND ${pickups.actualWeight} IS NOT NULL THEN ${pickups.actualWeight} ELSE 0 END`
        ).mapWith(Number),
      })
      .from(pickups)
      .where(eq(pickups.userId, userId));

    // Calculate donation statistics
    const donationStats = await db
      .select({
        totalDonations: count(),
        acceptedDonations: sum(
          sql`CASE WHEN ${donations.status} IN ('accepted', 'picked-up', 'delivered') THEN 1 ELSE 0 END`
        ).mapWith(Number),
      })
      .from(donations)
      .where(eq(donations.userId, userId));

    // Extract and calculate statistics
    const totalPickups = pickupStats[0]?.totalPickups || 0;
    const completedPickups = pickupStats[0]?.completedPickups || 0;
    const totalWeightRecycled = Math.round((pickupStats[0]?.totalWeightRecycled || 0) * 100) / 100;
    const co2Saved = Math.round(totalWeightRecycled * 2.5 * 100) / 100;
    const totalDonations = donationStats[0]?.totalDonations || 0;
    const acceptedDonations = donationStats[0]?.acceptedDonations || 0;

    // Return statistics
    return NextResponse.json({
      totalPickups,
      completedPickups,
      totalWeightRecycled,
      co2Saved,
      totalDonations,
      acceptedDonations,
    });

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