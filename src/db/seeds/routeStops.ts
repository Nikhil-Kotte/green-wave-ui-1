import { db } from '@/db';
import { routeStops, routes, pickups } from '@/db/schema';

async function main() {
    // First, query actual routes to get their IDs
    const existingRoutes = await db.select().from(routes);
    
    if (existingRoutes.length === 0) {
        console.error('❌ No routes found. Please run routes seeder first.');
        return;
    }

    // Query actual pickups to get their IDs and addresses
    const existingPickups = await db.select().from(pickups);
    
    if (existingPickups.length === 0) {
        console.error('❌ No pickups found. Please run pickups seeder first.');
        return;
    }

    // Separate routes by status
    const completedRoutes = existingRoutes.filter(r => r.status === 'completed').slice(0, 2);
    const activeRoute = existingRoutes.find(r => r.status === 'active');

    const sampleRouteStops = [];

    // Create stops for completed routes (4-6 stops each)
    if (completedRoutes.length >= 1) {
        const route1 = completedRoutes[0];
        const route1Pickups = existingPickups.slice(0, 5);
        
        sampleRouteStops.push(
            {
                routeId: route1.id,
                pickupId: route1Pickups[0].id,
                stopOrder: 1,
                address: route1Pickups[0].address,
                wasteType: route1Pickups[0].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-15T06:15:00').toISOString(),
                departureTime: new Date('2024-01-15T06:30:00').toISOString(),
            },
            {
                routeId: route1.id,
                pickupId: route1Pickups[1].id,
                stopOrder: 2,
                address: route1Pickups[1].address,
                wasteType: route1Pickups[1].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-15T06:45:00').toISOString(),
                departureTime: new Date('2024-01-15T07:00:00').toISOString(),
            },
            {
                routeId: route1.id,
                pickupId: route1Pickups[2].id,
                stopOrder: 3,
                address: route1Pickups[2].address,
                wasteType: route1Pickups[2].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-15T07:15:00').toISOString(),
                departureTime: new Date('2024-01-15T07:35:00').toISOString(),
            },
            {
                routeId: route1.id,
                pickupId: route1Pickups[3].id,
                stopOrder: 4,
                address: route1Pickups[3].address,
                wasteType: route1Pickups[3].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-15T07:50:00').toISOString(),
                departureTime: new Date('2024-01-15T08:10:00').toISOString(),
            },
            {
                routeId: route1.id,
                pickupId: route1Pickups[4].id,
                stopOrder: 5,
                address: route1Pickups[4].address,
                wasteType: route1Pickups[4].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-15T08:25:00').toISOString(),
                departureTime: new Date('2024-01-15T08:45:00').toISOString(),
            }
        );
    }

    if (completedRoutes.length >= 2) {
        const route2 = completedRoutes[1];
        const route2Pickups = existingPickups.slice(5, 11);
        
        sampleRouteStops.push(
            {
                routeId: route2.id,
                pickupId: route2Pickups[0].id,
                stopOrder: 1,
                address: route2Pickups[0].address,
                wasteType: route2Pickups[0].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-16T06:10:00').toISOString(),
                departureTime: new Date('2024-01-16T06:25:00').toISOString(),
            },
            {
                routeId: route2.id,
                pickupId: route2Pickups[1].id,
                stopOrder: 2,
                address: route2Pickups[1].address,
                wasteType: route2Pickups[1].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-16T06:40:00').toISOString(),
                departureTime: new Date('2024-01-16T06:55:00').toISOString(),
            },
            {
                routeId: route2.id,
                pickupId: route2Pickups[2].id,
                stopOrder: 3,
                address: route2Pickups[2].address,
                wasteType: route2Pickups[2].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-16T07:10:00').toISOString(),
                departureTime: new Date('2024-01-16T07:30:00').toISOString(),
            },
            {
                routeId: route2.id,
                pickupId: route2Pickups[3].id,
                stopOrder: 4,
                address: route2Pickups[3].address,
                wasteType: route2Pickups[3].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-16T07:45:00').toISOString(),
                departureTime: new Date('2024-01-16T08:00:00').toISOString(),
            },
            {
                routeId: route2.id,
                pickupId: route2Pickups[4].id,
                stopOrder: 5,
                address: route2Pickups[4].address,
                wasteType: route2Pickups[4].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-16T08:15:00').toISOString(),
                departureTime: new Date('2024-01-16T08:35:00').toISOString(),
            },
            {
                routeId: route2.id,
                pickupId: route2Pickups[5].id,
                stopOrder: 6,
                address: route2Pickups[5].address,
                wasteType: route2Pickups[5].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-16T08:50:00').toISOString(),
                departureTime: new Date('2024-01-16T09:10:00').toISOString(),
            }
        );
    }

    // Create stops for active route (5 stops with mixed statuses)
    if (activeRoute) {
        const activePickups = existingPickups.slice(11, 16);
        
        sampleRouteStops.push(
            {
                routeId: activeRoute.id,
                pickupId: activePickups[0].id,
                stopOrder: 1,
                address: activePickups[0].address,
                wasteType: activePickups[0].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-20T06:05:00').toISOString(),
                departureTime: new Date('2024-01-20T06:20:00').toISOString(),
            },
            {
                routeId: activeRoute.id,
                pickupId: activePickups[1].id,
                stopOrder: 2,
                address: activePickups[1].address,
                wasteType: activePickups[1].wasteType,
                status: 'completed',
                arrivalTime: new Date('2024-01-20T06:35:00').toISOString(),
                departureTime: new Date('2024-01-20T06:50:00').toISOString(),
            },
            {
                routeId: activeRoute.id,
                pickupId: activePickups[2].id,
                stopOrder: 3,
                address: activePickups[2].address,
                wasteType: activePickups[2].wasteType,
                status: 'in-progress',
                arrivalTime: new Date('2024-01-20T07:05:00').toISOString(),
                departureTime: null,
            },
            {
                routeId: activeRoute.id,
                pickupId: activePickups[3].id,
                stopOrder: 4,
                address: activePickups[3].address,
                wasteType: activePickups[3].wasteType,
                status: 'pending',
                arrivalTime: null,
                departureTime: null,
            },
            {
                routeId: activeRoute.id,
                pickupId: activePickups[4].id,
                stopOrder: 5,
                address: activePickups[4].address,
                wasteType: activePickups[4].wasteType,
                status: 'pending',
                arrivalTime: null,
                departureTime: null,
            }
        );
    }

    if (sampleRouteStops.length > 0) {
        await db.insert(routeStops).values(sampleRouteStops);
        console.log('✅ Route stops seeder completed successfully');
    } else {
        console.log('⚠️ No route stops created. Check if routes and pickups exist.');
    }
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});