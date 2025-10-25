import { db } from '@/db';
import { routes, user } from '@/db/schema';
import { asc } from 'drizzle-orm';

async function main() {
    // Query users first to get collector IDs
    const users = await db.select().from(user).orderBy(asc(user.email));
    
    if (users.length < 5) {
        throw new Error('Not enough users in database. Need at least 5 users to seed routes.');
    }
    
    const sampleRoutes = [
        {
            name: 'Downtown Morning Collection',
            collectorId: users[2].id,
            status: 'completed',
            totalDistance: 12.5,
            totalPickups: 8,
            startTime: new Date('2024-01-15T08:00:00').toISOString(),
            endTime: new Date('2024-01-15T12:30:00').toISOString(),
            createdAt: new Date('2024-01-14T10:00:00').toISOString(),
        },
        {
            name: 'Residential Area Afternoon Route',
            collectorId: users[3].id,
            status: 'completed',
            totalDistance: 18.3,
            totalPickups: 12,
            startTime: new Date('2024-01-16T13:00:00').toISOString(),
            endTime: new Date('2024-01-16T17:45:00').toISOString(),
            createdAt: new Date('2024-01-15T14:00:00').toISOString(),
        },
        {
            name: 'Industrial Zone Collection',
            collectorId: users[4].id,
            status: 'active',
            totalDistance: 25.7,
            totalPickups: 15,
            startTime: new Date('2024-01-17T09:00:00').toISOString(),
            endTime: null,
            createdAt: new Date('2024-01-16T16:00:00').toISOString(),
        },
    ];

    await db.insert(routes).values(sampleRoutes);
    
    console.log('✅ Routes seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});