import { db } from '@/db';
import { user } from '@/db/schema';

async function main() {
    const now = new Date();
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    const threeMonthsAgo = new Date(now);
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    const sampleUsers = [
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            email: 'sarah.johnson@gmail.com',
            name: 'Sarah Johnson',
            emailVerified: true,
            createdAt: new Date(sixMonthsAgo.getTime() + 30 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(sixMonthsAgo.getTime() + 30 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'user_02j5myu3f9a0z4c2o8n7r6x9s5',
            email: 'michael.chen@outlook.com',
            name: 'Michael Chen',
            emailVerified: true,
            createdAt: new Date(sixMonthsAgo.getTime() + 45 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(sixMonthsAgo.getTime() + 45 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'user_03k6nzv4g0b1a5d3p9o8s7y0t6',
            email: 'priya.patel@yahoo.com',
            name: 'Priya Patel',
            emailVerified: true,
            createdAt: new Date(threeMonthsAgo.getTime() + 15 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(threeMonthsAgo.getTime() + 15 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'user_04l7oaw5h1c2b6e4q0p9t8z1u7',
            email: 'james.wilson@wastecollect.com',
            name: 'James Wilson',
            emailVerified: true,
            createdAt: new Date(sixMonthsAgo.getTime() + 20 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(sixMonthsAgo.getTime() + 20 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'user_05m8pbx6i2d3c7f5r1q0u9a2v8',
            email: 'carlos.rodriguez@wastecollect.com',
            name: 'Carlos Rodriguez',
            emailVerified: true,
            createdAt: new Date(sixMonthsAgo.getTime() + 25 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(sixMonthsAgo.getTime() + 25 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'user_06n9qcy7j3e4d8g6s2r1v0b3w9',
            email: 'david.thompson@wastecollect.com',
            name: 'David Thompson',
            emailVerified: true,
            createdAt: new Date(threeMonthsAgo.getTime() + 10 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(threeMonthsAgo.getTime() + 10 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'user_07o0rdz8k4f5e9h7t3s2w1c4x0',
            email: 'amanda.green@greenearthngo.org',
            name: 'Amanda Green',
            emailVerified: true,
            createdAt: new Date(sixMonthsAgo.getTime() + 35 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(sixMonthsAgo.getTime() + 35 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'user_08p1sea9l5g6f0i8u4t3x2d5y1',
            email: 'robert.kumar@helpinghands.org',
            name: 'Robert Kumar',
            emailVerified: true,
            createdAt: new Date(threeMonthsAgo.getTime() + 20 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(threeMonthsAgo.getTime() + 20 * 24 * 60 * 60 * 1000),
        },
        {
            id: 'user_09q2tfb0m6h7g1j9v5u4y3e6z2',
            email: 'admin@wastemanagement.com',
            name: 'Admin User',
            emailVerified: true,
            createdAt: sixMonthsAgo,
            updatedAt: sixMonthsAgo,
        },
        {
            id: 'user_10r3ugc1n7i8h2k0w6v5z4f7a3',
            email: 'supervisor@wastemanagement.com',
            name: 'Lisa Martinez',
            emailVerified: true,
            createdAt: new Date(sixMonthsAgo.getTime() + 5 * 24 * 60 * 60 * 1000),
            updatedAt: new Date(sixMonthsAgo.getTime() + 5 * 24 * 60 * 60 * 1000),
        },
    ];

    await db.insert(user).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});