import { db } from '@/db';
import { pickups, user } from '@/db/schema';

async function main() {
    // First, fetch actual user IDs from the database
    const users = await db.select({ id: user.id }).from(user).limit(10);
    
    if (users.length < 5) {
        throw new Error('Not enough users in database. Please run user seeder first.');
    }

    const userIds = users.map(u => u.id);
    const collectorIds = userIds.slice(0, 3); // Use first 3 users as collectors
    const customerIds = userIds.slice(3); // Rest as customers

    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    // Helper function to generate date string
    const getDateString = (daysOffset: number): string => {
        const date = new Date(today);
        date.setDate(today.getDate() + daysOffset);
        return date.toISOString().split('T')[0];
    };

    const samplePickups = [
        // 10 Completed Pickups
        {
            userId: customerIds[0] || userIds[0],
            wasteType: 'plastic',
            pickupDate: getDateString(-6),
            pickupTime: 'morning',
            address: '123 Green Street, Eco District, Mumbai 400001',
            estimatedWeight: 15.5,
            actualWeight: 14.2,
            notes: 'Collected plastic bottles and containers. Customer was very cooperative.',
            status: 'completed',
            collectorId: collectorIds[0] || userIds[0],
            createdAt: new Date(lastWeek.getTime() - 518400000).toISOString(),
            completedAt: new Date(lastWeek.getTime() + 86400000).toISOString(),
        },
        {
            userId: customerIds[1] || userIds[1],
            wasteType: 'paper',
            pickupDate: getDateString(-5),
            pickupTime: 'afternoon',
            address: '45 Recycle Avenue, Green Park, Delhi 110016',
            estimatedWeight: 25.0,
            actualWeight: 28.3,
            notes: 'Large amount of newspapers and cardboard boxes. Sorted on site.',
            status: 'completed',
            collectorId: collectorIds[1] || userIds[1],
            createdAt: new Date(lastWeek.getTime() - 432000000).toISOString(),
            completedAt: new Date(lastWeek.getTime() + 172800000).toISOString(),
        },
        {
            userId: customerIds[2] || userIds[2],
            wasteType: 'metal',
            pickupDate: getDateString(-4),
            pickupTime: 'evening',
            address: '78 Steel Road, Industrial Area, Bangalore 560001',
            estimatedWeight: 45.0,
            actualWeight: 42.7,
            notes: 'Metal cans and scrap materials. Heavy load, required extra time.',
            status: 'completed',
            collectorId: collectorIds[2] || userIds[2],
            createdAt: new Date(lastWeek.getTime() - 345600000).toISOString(),
            completedAt: new Date(lastWeek.getTime() + 259200000).toISOString(),
        },
        {
            userId: customerIds[0] || userIds[0],
            wasteType: 'glass',
            pickupDate: getDateString(-3),
            pickupTime: 'morning',
            address: '23 Crystal Lane, Posh Colony, Hyderabad 500001',
            estimatedWeight: 12.0,
            actualWeight: 11.5,
            notes: 'Glass bottles and jars. All items were clean and sorted.',
            status: 'completed',
            collectorId: collectorIds[0] || userIds[0],
            createdAt: new Date(lastWeek.getTime() - 259200000).toISOString(),
            completedAt: new Date(lastWeek.getTime() + 345600000).toISOString(),
        },
        {
            userId: customerIds[1] || userIds[1],
            wasteType: 'ewaste',
            pickupDate: getDateString(-2),
            pickupTime: 'afternoon',
            address: '67 Tech Street, IT Park, Pune 411001',
            estimatedWeight: 8.5,
            actualWeight: 9.2,
            notes: 'Old computer parts and mobile phones. Handled with care.',
            status: 'completed',
            collectorId: collectorIds[1] || userIds[1],
            createdAt: new Date(lastWeek.getTime() - 172800000).toISOString(),
            completedAt: new Date(lastWeek.getTime() + 432000000).toISOString(),
        },
        {
            userId: customerIds[2] || userIds[2],
            wasteType: 'organic',
            pickupDate: getDateString(-1),
            pickupTime: 'morning',
            address: '89 Garden Road, Eco Village, Chennai 600001',
            estimatedWeight: 20.0,
            actualWeight: 22.5,
            notes: 'Kitchen waste and garden trimmings. Good for composting.',
            status: 'completed',
            collectorId: collectorIds[2] || userIds[2],
            createdAt: new Date(lastWeek.getTime() - 86400000).toISOString(),
            completedAt: new Date(lastWeek.getTime() + 518400000).toISOString(),
        },
        {
            userId: customerIds[0] || userIds[0],
            wasteType: 'mixed',
            pickupDate: getDateString(-6),
            pickupTime: 'evening',
            address: '34 Mixed Street, Central District, Kolkata 700001',
            estimatedWeight: 30.0,
            actualWeight: 32.8,
            notes: 'Mixed recyclables including plastic, paper, and metal. Needs sorting.',
            status: 'completed',
            collectorId: collectorIds[0] || userIds[0],
            createdAt: new Date(lastWeek.getTime() - 518400000).toISOString(),
            completedAt: new Date(lastWeek.getTime() + 86400000).toISOString(),
        },
        {
            userId: customerIds[1] || userIds[1],
            wasteType: 'plastic',
            pickupDate: getDateString(-5),
            pickupTime: 'morning',
            address: '56 Clean Avenue, Residential Zone, Ahmedabad 380001',
            estimatedWeight: 18.0,
            actualWeight: 16.9,
            notes: 'PET bottles and plastic packaging materials. All clean and dry.',
            status: 'completed',
            collectorId: collectorIds[1] || userIds[1],
            createdAt: new Date(lastWeek.getTime() - 432000000).toISOString(),
            completedAt: new Date(lastWeek.getTime() + 172800000).toISOString(),
        },
        {
            userId: customerIds[2] || userIds[2],
            wasteType: 'paper',
            pickupDate: getDateString(-4),
            pickupTime: 'afternoon',
            address: '12 Book Street, University Area, Jaipur 302001',
            estimatedWeight: 35.0,
            actualWeight: 38.4,
            notes: 'Old textbooks and office papers. Large quantity from office clearance.',
            status: 'completed',
            collectorId: collectorIds[2] || userIds[2],
            createdAt: new Date(lastWeek.getTime() - 345600000).toISOString(),
            completedAt: new Date(lastWeek.getTime() + 259200000).toISOString(),
        },
        {
            userId: customerIds[0] || userIds[0],
            wasteType: 'metal',
            pickupDate: getDateString(-3),
            pickupTime: 'morning',
            address: '90 Iron Road, Workshop Area, Lucknow 226001',
            estimatedWeight: 50.0,
            actualWeight: 48.6,
            notes: 'Scrap metal from workshop. Heavy items, required assistance.',
            status: 'completed',
            collectorId: collectorIds[0] || userIds[0],
            createdAt: new Date(lastWeek.getTime() - 259200000).toISOString(),
            completedAt: new Date(lastWeek.getTime() + 345600000).toISOString(),
        },

        // 5 Pending Pickups
        {
            userId: customerIds[1] || userIds[1],
            wasteType: 'glass',
            pickupDate: getDateString(3),
            pickupTime: 'afternoon',
            address: '45 Window Street, Glass District, Chandigarh 160001',
            estimatedWeight: 15.0,
            actualWeight: null,
            notes: 'Glass bottles and containers. Please handle with care.',
            status: 'pending',
            collectorId: null,
            createdAt: new Date().toISOString(),
            completedAt: null,
        },
        {
            userId: customerIds[2] || userIds[2],
            wasteType: 'organic',
            pickupDate: getDateString(4),
            pickupTime: 'morning',
            address: '78 Compost Lane, Farm Area, Indore 452001',
            estimatedWeight: 25.0,
            actualWeight: null,
            notes: 'Garden waste and food scraps. Large quantity available.',
            status: 'pending',
            collectorId: null,
            createdAt: new Date().toISOString(),
            completedAt: null,
        },
        {
            userId: customerIds[0] || userIds[0],
            wasteType: 'ewaste',
            pickupDate: getDateString(5),
            pickupTime: 'evening',
            address: '23 Circuit Road, Electronic City, Bhopal 462001',
            estimatedWeight: 10.0,
            actualWeight: null,
            notes: 'Old electronic devices including laptops and monitors.',
            status: 'pending',
            collectorId: null,
            createdAt: new Date().toISOString(),
            completedAt: null,
        },
        {
            userId: customerIds[1] || userIds[1],
            wasteType: 'plastic',
            pickupDate: getDateString(6),
            pickupTime: 'morning',
            address: '56 Bottle Street, Clean Neighborhood, Nagpur 440001',
            estimatedWeight: 20.0,
            actualWeight: null,
            notes: 'Plastic containers and packaging materials from event.',
            status: 'pending',
            collectorId: null,
            createdAt: new Date().toISOString(),
            completedAt: null,
        },
        {
            userId: customerIds[2] || userIds[2],
            wasteType: 'mixed',
            pickupDate: getDateString(7),
            pickupTime: 'afternoon',
            address: '89 Recycle Plaza, Green Area, Surat 395001',
            estimatedWeight: 30.0,
            actualWeight: null,
            notes: 'Mixed recyclables from apartment complex. Multiple types of waste.',
            status: 'pending',
            collectorId: null,
            createdAt: new Date().toISOString(),
            completedAt: null,
        },

        // 3 In-Progress Pickups
        {
            userId: customerIds[0] || userIds[0],
            wasteType: 'paper',
            pickupDate: getDateString(0),
            pickupTime: 'morning',
            address: '12 Document Street, Office Park, Visakhapatnam 530001',
            estimatedWeight: 22.0,
            actualWeight: null,
            notes: 'Office papers and magazines. Collector en route.',
            status: 'in-progress',
            collectorId: collectorIds[0] || userIds[0],
            createdAt: new Date(today.getTime() - 3600000).toISOString(),
            completedAt: null,
        },
        {
            userId: customerIds[1] || userIds[1],
            wasteType: 'metal',
            pickupDate: getDateString(0),
            pickupTime: 'afternoon',
            address: '34 Scrap Avenue, Industrial Zone, Vadodara 390001',
            estimatedWeight: 40.0,
            actualWeight: null,
            notes: 'Metal waste from factory. Collection in progress.',
            status: 'in-progress',
            collectorId: collectorIds[1] || userIds[1],
            createdAt: new Date(today.getTime() - 7200000).toISOString(),
            completedAt: null,
        },
        {
            userId: customerIds[2] || userIds[2],
            wasteType: 'glass',
            pickupDate: getDateString(0),
            pickupTime: 'evening',
            address: '67 Crystal Avenue, Shopping District, Kochi 682001',
            estimatedWeight: 18.0,
            actualWeight: null,
            notes: 'Glass bottles from restaurant. Collector arrived.',
            status: 'in-progress',
            collectorId: collectorIds[2] || userIds[2],
            createdAt: new Date(today.getTime() - 5400000).toISOString(),
            completedAt: null,
        },
    ];

    await db.insert(pickups).values(samplePickups);
    
    console.log('✅ Pickups seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});