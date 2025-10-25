import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user, pickups, donations } from '@/db/schema';
import { eq, or, sum, count, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Execute all count and sum queries in parallel for efficiency
    const [
      totalUsersResult,
      totalPickupsResult,
      completedPickupsResult,
      pendingPickupsResult,
      totalWeightResult,
      totalDonationsResult,
      pendingDonationsResult,
      acceptedDonationsResult,
    ] = await Promise.all([
      // Total users count
      db.select({ count: count() }).from(user),
      
      // Total pickups count
      db.select({ count: count() }).from(pickups),
      
      // Completed pickups count
      db.select({ count: count() }).from(pickups).where(eq(pickups.status, 'completed')),
      
      // Pending pickups count
      db.select({ count: count() }).from(pickups).where(eq(pickups.status, 'pending')),
      
      // Total weight recycled (sum of actualWeight, handling nulls)
      db.select({ 
        totalWeight: sql<number>`COALESCE(SUM(${pickups.actualWeight}), 0)` 
      }).from(pickups),
      
      // Total donations count
      db.select({ count: count() }).from(donations),
      
      // Pending donations count
      db.select({ count: count() }).from(donations).where(eq(donations.status, 'pending')),
      
      // Accepted donations count (accepted, picked-up, or delivered)
      db.select({ count: count() })
        .from(donations)
        .where(
          or(
            eq(donations.status, 'accepted'),
            eq(donations.status, 'picked-up'),
            eq(donations.status, 'delivered')
          )
        ),
    ]);

    // Extract values from results
    const totalUsers = totalUsersResult[0]?.count ?? 0;
    const totalPickups = totalPickupsResult[0]?.count ?? 0;
    const completedPickups = completedPickupsResult[0]?.count ?? 0;
    const pendingPickups = pendingPickupsResult[0]?.count ?? 0;
    const totalWeightRecycled = parseFloat((totalWeightResult[0]?.totalWeight ?? 0).toFixed(2));
    const totalDonations = totalDonationsResult[0]?.count ?? 0;
    const pendingDonations = pendingDonationsResult[0]?.count ?? 0;
    const acceptedDonations = acceptedDonationsResult[0]?.count ?? 0;

    // Return statistics object
    return NextResponse.json({
      totalUsers,
      totalPickups,
      completedPickups,
      pendingPickups,
      totalWeightRecycled,
      totalDonations,
      pendingDonations,
      acceptedDonations,
    }, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}