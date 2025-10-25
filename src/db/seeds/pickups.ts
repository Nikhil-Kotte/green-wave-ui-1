import { db } from '@/db';
import { pickups, user } from '@/db/schema';

async function main() {
    // Query users to get actual user IDs
    const users = await db.select().from(user).orderBy(user.email);
    
    if (users.length < 6) {
        console.error('❌ Not enough users in database. Please seed users first.');
        return;
    }

    // Map users - first 3 are regular users, next 3 are collectors
    const regularUsers = [users[0].id, users[1].id, users[2].id];
    const collectors = [users[3].id, users[4].id, users[5].id];

    const bangaloreAddresses = [
        '123 MG Road, Koramangala, Bangalore - 560034',
        '45 Indiranagar Main Road, Bangalore - 560038',
        '78 Whitefield Main Road, Bangalore - 560066',
        '234 HSR Layout, Sector 1, Bangalore - 560102',
        '567 Jayanagar 4th Block, Bangalore - 560011',
        '89 BTM Layout, 2nd Stage, Bangalore - 560076',
        '321 Malleshwaram 8th Cross, Bangalore - 560003',
        '456 Electronic City Phase 1, Bangalore - 560100',
        '654 JP Nagar 7th Phase, Bangalore - 560078',
        '789 Rajajinagar 2nd Block, Bangalore - 560010'
    ];

    const getDate = (daysOffset: number): string => {
        const date = new Date();
        date.setDate(date.getDate() + daysOffset);
        return date.toISOString().split('T')[0];
    };

    const getTimestamp = (daysOffset: number, hoursOffset: number = 0): string => {
        const date = new Date();
        date.setDate(date.getDate() + daysOffset);
        date.setHours(date.getHours() + hoursOffset);
        return date.toISOString();
    };

    const samplePickups = [
        // 10 Completed Pickups
        {
            userId: regularUsers[0],
            collectorId: collectors[0],
            wasteType: 'plastic',
            pickupDate: getDate(-5),
            pickupTime: 'morning',
            address: bangaloreAddresses[0],
            estimatedWeight: 12.5,
            actualWeight: 13.0,
            status: 'completed',
            notes: 'Collected plastic bottles and containers from household. All items properly sorted.',
            createdAt: getTimestamp(-6),
            completedAt: getTimestamp(-5, 10)
        },
        {
            userId: regularUsers[1],
            collectorId: collectors[1],
            wasteType: 'paper',
            pickupDate: getDate(-4),
            pickupTime: 'afternoon',
            address: bangaloreAddresses[1],
            estimatedWeight: 18.0,
            actualWeight: 17.5,
            status: 'completed',
            notes: 'Large collection of newspapers, magazines, and cardboard boxes. Good condition.',
            createdAt: getTimestamp(-5),
            completedAt: getTimestamp(-4, 14)
        },
        {
            userId: regularUsers[2],
            collectorId: collectors[2],
            wasteType: 'metal',
            pickupDate: getDate(-4),
            pickupTime: 'evening',
            address: bangaloreAddresses[2],
            estimatedWeight: 25.0,
            actualWeight: 24.0,
            status: 'completed',
            notes: 'Metal scraps, aluminum cans, and old utensils. Heavy load.',
            createdAt: getTimestamp(-5),
            completedAt: getTimestamp(-4, 18)
        },
        {
            userId: regularUsers[0],
            collectorId: collectors[0],
            wasteType: 'glass',
            pickupDate: getDate(-3),
            pickupTime: 'morning',
            address: bangaloreAddresses[3],
            estimatedWeight: 15.0,
            actualWeight: 16.0,
            status: 'completed',
            notes: 'Glass bottles and jars. Carefully packed and collected.',
            createdAt: getTimestamp(-4),
            completedAt: getTimestamp(-3, 9)
        },
        {
            userId: regularUsers[1],
            collectorId: collectors[1],
            wasteType: 'ewaste',
            pickupDate: getDate(-3),
            pickupTime: 'afternoon',
            address: bangaloreAddresses[4],
            estimatedWeight: 8.0,
            actualWeight: 8.5,
            status: 'completed',
            notes: 'Old mobile phones, chargers, and computer accessories. E-waste properly handled.',
            createdAt: getTimestamp(-4),
            completedAt: getTimestamp(-3, 15)
        },
        {
            userId: regularUsers[2],
            collectorId: collectors[2],
            wasteType: 'organic',
            pickupDate: getDate(-2),
            pickupTime: 'morning',
            address: bangaloreAddresses[5],
            estimatedWeight: 22.0,
            actualWeight: 23.0,
            status: 'completed',
            notes: 'Garden waste and kitchen organic waste. Fresh collection.',
            createdAt: getTimestamp(-3),
            completedAt: getTimestamp(-2, 10)
        },
        {
            userId: regularUsers[0],
            collectorId: collectors[0],
            wasteType: 'mixed',
            pickupDate: getDate(-2),
            pickupTime: 'evening',
            address: bangaloreAddresses[6],
            estimatedWeight: 30.0,
            actualWeight: 31.0,
            status: 'completed',
            notes: 'Mixed waste including plastic, paper, and metal. Large household cleanout.',
            createdAt: getTimestamp(-3),
            completedAt: getTimestamp(-2, 17)
        },
        {
            userId: regularUsers[1],
            collectorId: collectors[1],
            wasteType: 'plastic',
            pickupDate: getDate(-1),
            pickupTime: 'morning',
            address: bangaloreAddresses[7],
            estimatedWeight: 14.0,
            actualWeight: 13.5,
            status: 'completed',
            notes: 'Plastic packaging materials from online deliveries.',
            createdAt: getTimestamp(-2),
            completedAt: getTimestamp(-1, 11)
        },
        {
            userId: regularUsers[2],
            collectorId: collectors[2],
            wasteType: 'paper',
            pickupDate: getDate(-1),
            pickupTime: 'afternoon',
            address: bangaloreAddresses[8],
            estimatedWeight: 40.0,
            actualWeight: 39.0,
            status: 'completed',
            notes: 'Office paper waste - documents, files, and cardboard. Large commercial pickup.',
            createdAt: getTimestamp(-2),
            completedAt: getTimestamp(-1, 16)
        },
        {
            userId: regularUsers[0],
            collectorId: collectors[0],
            wasteType: 'glass',
            pickupDate: getDate(0),
            pickupTime: 'morning',
            address: bangaloreAddresses[9],
            estimatedWeight: 10.0,
            actualWeight: 11.0,
            status: 'completed',
            notes: 'Glass bottles from restaurant. Well packaged.',
            createdAt: getTimestamp(-1),
            completedAt: getTimestamp(0, 10)
        },

        // 5 Pending Pickups
        {
            userId: regularUsers[0],
            collectorId: null,
            wasteType: 'plastic',
            pickupDate: getDate(1),
            pickupTime: 'morning',
            address: bangaloreAddresses[0],
            estimatedWeight: 9.0,
            actualWeight: null,
            status: 'pending',
            notes: 'Plastic bags and containers from weekly groceries.',
            createdAt: getTimestamp(0),
            completedAt: null
        },
        {
            userId: regularUsers[1],
            collectorId: null,
            wasteType: 'glass',
            pickupDate: getDate(2),
            pickupTime: 'afternoon',
            address: bangaloreAddresses[1],
            estimatedWeight: 15.0,
            actualWeight: null,
            status: 'pending',
            notes: null,
            createdAt: getTimestamp(0),
            completedAt: null
        },
        {
            userId: regularUsers[2],
            collectorId: null,
            wasteType: 'ewaste',
            pickupDate: getDate(3),
            pickupTime: 'evening',
            address: bangaloreAddresses[2],
            estimatedWeight: 12.0,
            actualWeight: null,
            status: 'pending',
            notes: 'Old laptop and accessories. Please handle with care.',
            createdAt: getTimestamp(0),
            completedAt: null
        },
        {
            userId: regularUsers[0],
            collectorId: null,
            wasteType: 'organic',
            pickupDate: getDate(4),
            pickupTime: 'morning',
            address: bangaloreAddresses[3],
            estimatedWeight: 28.0,
            actualWeight: null,
            status: 'pending',
            notes: null,
            createdAt: getTimestamp(0),
            completedAt: null
        },
        {
            userId: regularUsers[1],
            collectorId: null,
            wasteType: 'paper',
            pickupDate: getDate(5),
            pickupTime: 'afternoon',
            address: bangaloreAddresses[4],
            estimatedWeight: 20.0,
            actualWeight: null,
            status: 'pending',
            notes: 'Old books and magazines for recycling.',
            createdAt: getTimestamp(0),
            completedAt: null
        },

        // 3 In-Progress Pickups
        {
            userId: regularUsers[2],
            collectorId: collectors[0],
            wasteType: 'mixed',
            pickupDate: getDate(0),
            pickupTime: 'evening',
            address: bangaloreAddresses[5],
            estimatedWeight: 18.0,
            actualWeight: null,
            status: 'in-progress',
            notes: 'Mixed waste from apartment complex. Multiple bags.',
            createdAt: getTimestamp(0, -12),
            completedAt: null
        },
        {
            userId: regularUsers[0],
            collectorId: collectors[1],
            wasteType: 'metal',
            pickupDate: getDate(1),
            pickupTime: 'evening',
            address: bangaloreAddresses[6],
            estimatedWeight: 35.0,
            actualWeight: null,
            status: 'in-progress',
            notes: 'Construction metal waste. Heavy items.',
            createdAt: getTimestamp(0, -10),
            completedAt: null
        },
        {
            userId: regularUsers[1],
            collectorId: collectors[2],
            wasteType: 'plastic',
            pickupDate: getDate(1),
            pickupTime: 'morning',
            address: bangaloreAddresses[7],
            estimatedWeight: 40.0,
            actualWeight: null,
            status: 'in-progress',
            notes: 'Bulk plastic waste from warehouse. Large quantity.',
            createdAt: getTimestamp(0, -8),
            completedAt: null
        }
    ];

    await db.insert(pickups).values(samplePickups);
    
    console.log('✅ Pickups seeder completed successfully');
    console.log(`   - 10 completed pickups`);
    console.log(`   - 5 pending pickups`);
    console.log(`   - 3 in-progress pickups`);
    console.log(`   Total: 18 waste pickup records created`);
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});