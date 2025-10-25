import { db } from '@/db';
import { trackingLocations, user, routes } from '@/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
    // Query actual collector user IDs from the database
    const collectors = await db.select({ id: user.id }).from(user).limit(2);
    
    if (collectors.length < 2) {
        console.error('❌ Not enough users in database. Please run the users seeder first.');
        return;
    }

    // Query actual route IDs from the database
    const existingRoutes = await db.select({ id: routes.id }).from(routes).limit(3);
    
    const collectorIds = collectors.map(c => c.id);
    const routeIds = existingRoutes.length > 0 ? existingRoutes.map(r => r.id) : [null];

    // Base coordinates (San Francisco area)
    const baseLatitude = 37.7749;
    const baseLongitude = -122.4194;

    // Helper function to generate progressive coordinates
    const generatePath = (startLat: number, startLon: number, points: number) => {
        const path = [];
        let lat = startLat;
        let lon = startLon;
        
        for (let i = 0; i < points; i++) {
            path.push({ lat, lon });
            // Increment coordinates to simulate movement (roughly 100-200 meters per point)
            lat += (Math.random() * 0.002) + 0.001;
            lon += (Math.random() * 0.002) + 0.001;
        }
        
        return path;
    };

    // Generate timestamps over the past 2-4 hours
    const now = new Date();
    const generateTimestamps = (count: number, hoursAgo: number) => {
        const timestamps = [];
        const startTime = new Date(now.getTime() - (hoursAgo * 60 * 60 * 1000));
        const interval = (hoursAgo * 60 * 60 * 1000) / count;
        
        for (let i = 0; i < count; i++) {
            const timestamp = new Date(startTime.getTime() + (i * interval));
            timestamps.push(timestamp.toISOString());
        }
        
        return timestamps;
    };

    const sampleTrackingLocations = [];

    // Collector 1: 10 location points over 3 hours
    const collector1Path = generatePath(baseLatitude, baseLongitude, 10);
    const collector1Timestamps = generateTimestamps(10, 3);
    const collector1Speeds = [25, 32, 28, 35, 30, 40, 38, 33, 27, 20];

    for (let i = 0; i < collector1Path.length; i++) {
        sampleTrackingLocations.push({
            collectorId: collectorIds[0],
            routeId: routeIds[0],
            latitude: collector1Path[i].lat,
            longitude: collector1Path[i].lon,
            timestamp: collector1Timestamps[i],
            speed: collector1Speeds[i],
        });
    }

    // Collector 2: 12 location points over 4 hours
    const collector2Path = generatePath(baseLatitude + 0.01, baseLongitude - 0.01, 12);
    const collector2Timestamps = generateTimestamps(12, 4);
    const collector2Speeds = [22, 30, 35, 28, 42, 38, 33, 29, 45, 40, 36, 25];

    for (let i = 0; i < collector2Path.length; i++) {
        sampleTrackingLocations.push({
            collectorId: collectorIds[1],
            routeId: routeIds.length > 1 ? routeIds[1] : routeIds[0],
            latitude: collector2Path[i].lat,
            longitude: collector2Path[i].lon,
            timestamp: collector2Timestamps[i],
            speed: collector2Speeds[i],
        });
    }

    await db.insert(trackingLocations).values(sampleTrackingLocations);
    
    console.log('✅ Tracking locations seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});