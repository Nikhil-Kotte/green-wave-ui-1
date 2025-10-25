import { db } from '@/db';
import { trackingLocations, user, routes } from '@/db/schema';

async function main() {
  // Query users to get collectors
  const users = await db.select().from(user).orderBy(user.email);
  
  // Query routes to get route IDs
  const routesData = await db.select().from(routes).limit(2);
  
  // Verify we have enough data
  if (users.length < 4) {
    throw new Error('Not enough users in database. Need at least 4 users.');
  }
  
  if (routesData.length < 2) {
    throw new Error('Not enough routes in database. Need at least 2 routes.');
  }
  
  // Get collector IDs (index 2 and 3 - Carlos Rodriguez and David Thompson)
  const collector1Id = users[2].id;
  const collector2Id = users[3].id;
  
  // Get route IDs
  const route1Id = routesData[0].id;
  const route2Id = routesData[1].id;
  
  // Generate location points
  const locationPoints = [];
  
  // Collector 1 - 10 location points
  // Base: 12.9716°N, 77.5946°E (MG Road, Bangalore)
  // Moving northeast over 3 hours (starting 3 hours ago)
  const collector1BaseTime = Date.now() - (3 * 60 * 60 * 1000);
  const collector1Interval = 18 * 60 * 1000; // 18 minutes
  
  for (let i = 0; i < 10; i++) {
    locationPoints.push({
      collectorId: collector1Id,
      routeId: route1Id,
      latitude: 12.9716 + (i * 0.0025), // Progressive increment northeast
      longitude: 77.5946 + (i * 0.0015),
      timestamp: new Date(collector1BaseTime + (i * collector1Interval)).toISOString(),
      speed: 22 + (i * 2.2), // 22-42 km/h range
    });
  }
  
  // Collector 2 - 12 location points
  // Base: 12.9616°N, 77.5846°E (Indiranagar area)
  // Moving east over 4 hours (starting 4 hours ago)
  const collector2BaseTime = Date.now() - (4 * 60 * 60 * 1000);
  const collector2Interval = 20 * 60 * 1000; // 20 minutes
  
  for (let i = 0; i < 12; i++) {
    locationPoints.push({
      collectorId: collector2Id,
      routeId: route2Id,
      latitude: 12.9616 + (i * 0.0025), // Progressive increment
      longitude: 77.5846 + (i * 0.002), // Moving east
      timestamp: new Date(collector2BaseTime + (i * collector2Interval)).toISOString(),
      speed: 26 + (i * 1.5), // 26-44 km/h range
    });
  }
  
  await db.insert(trackingLocations).values(locationPoints);
  
  console.log('✅ Tracking locations seeder completed successfully');
  console.log(`   - Generated 10 location points for collector 1 (${collector1Id})`);
  console.log(`   - Generated 12 location points for collector 2 (${collector2Id})`);
}

main().catch((error) => {
  console.error('❌ Seeder failed:', error);
});