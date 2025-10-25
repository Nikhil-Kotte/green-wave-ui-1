import { db } from '@/db';
import { routes, user } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    // Query actual collector user IDs from the database
    const collectors = await db.select({ id: user.id }).from(user).limit(3);
    
    if (collectors.length === 0) {
        console.error('❌ No users found in database. Please run user seeder first.');
        return;
    }

    // Use the first available collector ID for all routes, or cycle through if multiple exist
    const collectorId1 = collectors[0].id;
    const collectorId2 = collectors.length > 1 ? collectors[1].id : collectors[0].id;
    const collectorId3 = collectors.length > 2 ? collectors[2].id : collectors[0].id;

    // Calculate timestamps
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    const fiveDaysAgo = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000);

    const sampleRoutes = [
        {
            name: 'Downtown Collection Route',
            collectorId: collectorId1,
            status: 'completed',
            totalDistance: 24.5,
            totalPickups: 12,
            startTime: new Date(twoDaysAgo.setHours(8, 0, 0, 0)).toISOString(),
            endTime: new Date(twoDaysAgo.setHours(14, 30, 0, 0)).toISOString(),
            createdAt: new Date(twoDaysAgo.setHours(7, 0, 0, 0)).toISOString(),
        },
        {
            name: 'North District Morning Run',
            collectorId: collectorId2,
            status: 'completed',
            totalDistance: 31.8,
            totalPickups: 15,
            startTime: new Date(fiveDaysAgo.setHours(7, 30, 0, 0)).toISOString(),
            endTime: new Date(fiveDaysAgo.setHours(15, 45, 0, 0)).toISOString(),
            createdAt: new Date(fiveDaysAgo.setHours(6, 30, 0, 0)).toISOString(),
        },
        {
            name: 'Industrial Zone Pickup',
            collectorId: collectorId3,
            status: 'active',
            totalDistance: 15.2,
            totalPickups: 7,
            startTime: twoHoursAgo.toISOString(),
            endTime: null,
            createdAt: new Date(now.setHours(6, 0, 0, 0)).toISOString(),
        },
    ];

    await db.insert(routes).values(sampleRoutes);
    
    console.log('✅ Routes seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});