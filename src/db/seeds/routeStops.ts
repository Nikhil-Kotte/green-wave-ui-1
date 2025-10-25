import { db } from '@/db';
import { routeStops, routes, pickups } from '@/db/schema';

async function main() {
    // Query existing routes and pickups
    const existingRoutes = await db.select().from(routes);
    const existingPickups = await db.select().from(pickups);

    // Verify we have enough routes and pickups
    if (existingRoutes.length < 3) {
        throw new Error(`❌ Not enough routes found. Expected at least 3, found ${existingRoutes.length}`);
    }
    if (existingPickups.length < 16) {
        throw new Error(`❌ Not enough pickups found. Expected at least 16, found ${existingPickups.length}`);
    }

    // Route 1 - 5 completed stops (Jan 15, 2024)
    const route1Stops = [
        {
            routeId: existingRoutes[0].id,
            pickupId: existingPickups[0].id,
            stopOrder: 1,
            address: existingPickups[0].address,
            wasteType: existingPickups[0].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-15T08:15:00').toISOString(),
            departureTime: new Date('2024-01-15T08:27:00').toISOString(),
        },
        {
            routeId: existingRoutes[0].id,
            pickupId: existingPickups[1].id,
            stopOrder: 2,
            address: existingPickups[1].address,
            wasteType: existingPickups[1].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-15T08:45:00').toISOString(),
            departureTime: new Date('2024-01-15T08:56:00').toISOString(),
        },
        {
            routeId: existingRoutes[0].id,
            pickupId: existingPickups[2].id,
            stopOrder: 3,
            address: existingPickups[2].address,
            wasteType: existingPickups[2].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-15T09:10:00').toISOString(),
            departureTime: new Date('2024-01-15T09:21:00').toISOString(),
        },
        {
            routeId: existingRoutes[0].id,
            pickupId: existingPickups[3].id,
            stopOrder: 4,
            address: existingPickups[3].address,
            wasteType: existingPickups[3].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-15T09:38:00').toISOString(),
            departureTime: new Date('2024-01-15T09:51:00').toISOString(),
        },
        {
            routeId: existingRoutes[0].id,
            pickupId: existingPickups[4].id,
            stopOrder: 5,
            address: existingPickups[4].address,
            wasteType: existingPickups[4].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-15T10:05:00').toISOString(),
            departureTime: new Date('2024-01-15T10:15:00').toISOString(),
        },
    ];

    // Route 2 - 6 completed stops (Jan 16, 2024)
    const route2Stops = [
        {
            routeId: existingRoutes[1].id,
            pickupId: existingPickups[5].id,
            stopOrder: 1,
            address: existingPickups[5].address,
            wasteType: existingPickups[5].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-16T08:10:00').toISOString(),
            departureTime: new Date('2024-01-16T08:22:00').toISOString(),
        },
        {
            routeId: existingRoutes[1].id,
            pickupId: existingPickups[6].id,
            stopOrder: 2,
            address: existingPickups[6].address,
            wasteType: existingPickups[6].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-16T08:40:00').toISOString(),
            departureTime: new Date('2024-01-16T08:53:00').toISOString(),
        },
        {
            routeId: existingRoutes[1].id,
            pickupId: existingPickups[7].id,
            stopOrder: 3,
            address: existingPickups[7].address,
            wasteType: existingPickups[7].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-16T09:08:00').toISOString(),
            departureTime: new Date('2024-01-16T09:21:00').toISOString(),
        },
        {
            routeId: existingRoutes[1].id,
            pickupId: existingPickups[8].id,
            stopOrder: 4,
            address: existingPickups[8].address,
            wasteType: existingPickups[8].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-16T09:40:00').toISOString(),
            departureTime: new Date('2024-01-16T09:50:00').toISOString(),
        },
        {
            routeId: existingRoutes[1].id,
            pickupId: existingPickups[9].id,
            stopOrder: 5,
            address: existingPickups[9].address,
            wasteType: existingPickups[9].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-16T10:10:00').toISOString(),
            departureTime: new Date('2024-01-16T10:24:00').toISOString(),
        },
        {
            routeId: existingRoutes[1].id,
            pickupId: existingPickups[10].id,
            stopOrder: 6,
            address: existingPickups[10].address,
            wasteType: existingPickups[10].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-16T10:42:00').toISOString(),
            departureTime: new Date('2024-01-16T10:57:00').toISOString(),
        },
    ];

    // Route 3 - 5 stops (2 completed, 1 in-progress, 2 pending) (Jan 20, 2024)
    const route3Stops = [
        {
            routeId: existingRoutes[2].id,
            pickupId: existingPickups[11].id,
            stopOrder: 1,
            address: existingPickups[11].address,
            wasteType: existingPickups[11].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-20T08:12:00').toISOString(),
            departureTime: new Date('2024-01-20T08:25:00').toISOString(),
        },
        {
            routeId: existingRoutes[2].id,
            pickupId: existingPickups[12].id,
            stopOrder: 2,
            address: existingPickups[12].address,
            wasteType: existingPickups[12].wasteType,
            status: 'completed',
            arrivalTime: new Date('2024-01-20T08:42:00').toISOString(),
            departureTime: new Date('2024-01-20T08:55:00').toISOString(),
        },
        {
            routeId: existingRoutes[2].id,
            pickupId: existingPickups[13].id,
            stopOrder: 3,
            address: existingPickups[13].address,
            wasteType: existingPickups[13].wasteType,
            status: 'in-progress',
            arrivalTime: new Date('2024-01-20T09:10:00').toISOString(),
            departureTime: null,
        },
        {
            routeId: existingRoutes[2].id,
            pickupId: existingPickups[14].id,
            stopOrder: 4,
            address: existingPickups[14].address,
            wasteType: existingPickups[14].wasteType,
            status: 'pending',
            arrivalTime: null,
            departureTime: null,
        },
        {
            routeId: existingRoutes[2].id,
            pickupId: existingPickups[15].id,
            stopOrder: 5,
            address: existingPickups[15].address,
            wasteType: existingPickups[15].wasteType,
            status: 'pending',
            arrivalTime: null,
            departureTime: null,
        },
    ];

    // Combine all stops
    const allStops = [...route1Stops, ...route2Stops, ...route3Stops];

    await db.insert(routeStops).values(allStops);

    console.log('✅ Route stops seeder completed successfully');
    console.log(`   - Route 1: ${route1Stops.length} completed stops`);
    console.log(`   - Route 2: ${route2Stops.length} completed stops`);
    console.log(`   - Route 3: ${route3Stops.length} stops (2 completed, 1 in-progress, 2 pending)`);
    console.log(`   - Total: ${allStops.length} route stops created`);
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});