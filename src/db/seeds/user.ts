import { db } from '@/db';
import { user } from '@/db/schema';

async function main() {
    const now = Date.now();
    const sixMonthsAgo = now - (180 * 24 * 60 * 60 * 1000);
    
    const sampleUsers = [
        // Regular users (residents)
        {
            id: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            email: 'sarah.johnson@gmail.com',
            emailVerified: 1,
            name: 'Sarah Johnson',
            createdAt: Math.floor(sixMonthsAgo + (30 * 24 * 60 * 60 * 1000)),
            updatedAt: Math.floor(sixMonthsAgo + (30 * 24 * 60 * 60 * 1000)),
        },
        {
            id: 'user_02h5myu3f9a1x4c2o8n7r6x9s5',
            email: 'michael.chen@outlook.com',
            emailVerified: 1,
            name: 'Michael Chen',
            createdAt: Math.floor(sixMonthsAgo + (45 * 24 * 60 * 60 * 1000)),
            updatedAt: Math.floor(sixMonthsAgo + (45 * 24 * 60 * 60 * 1000)),
        },
        {
            id: 'user_03h6nzv4g0b2y5d3p9o8s7y0t6',
            email: 'priya.patel@yahoo.com',
            emailVerified: 1,
            name: 'Priya Patel',
            createdAt: Math.floor(sixMonthsAgo + (60 * 24 * 60 * 60 * 1000)),
            updatedAt: Math.floor(sixMonthsAgo + (60 * 24 * 60 * 60 * 1000)),
        },
        // Waste collectors (drivers)
        {
            id: 'user_04h7oaw5h1c3z6e4q0p9t8z1u7',
            email: 'james.wilson@wastecollect.com',
            emailVerified: 1,
            name: 'James Wilson',
            createdAt: Math.floor(sixMonthsAgo + (90 * 24 * 60 * 60 * 1000)),
            updatedAt: Math.floor(sixMonthsAgo + (90 * 24 * 60 * 60 * 1000)),
        },
        {
            id: 'user_05h8pbx6i2d4a7f5r1q0u9a2v8',
            email: 'carlos.rodriguez@wastecollect.com',
            emailVerified: 1,
            name: 'Carlos Rodriguez',
            createdAt: Math.floor(sixMonthsAgo + (100 * 24 * 60 * 60 * 1000)),
            updatedAt: Math.floor(sixMonthsAgo + (100 * 24 * 60 * 60 * 1000)),
        },
        {
            id: 'user_06h9qcy7j3e5b8g6s2r1v0b3w9',
            email: 'david.thompson@wastecollect.com',
            emailVerified: 1,
            name: 'David Thompson',
            createdAt: Math.floor(sixMonthsAgo + (110 * 24 * 60 * 60 * 1000)),
            updatedAt: Math.floor(sixMonthsAgo + (110 * 24 * 60 * 60 * 1000)),
        },
        // NGO representatives
        {
            id: 'user_07hajdz8k4f6c9h7t3s2w1c4x0',
            email: 'amanda.green@greenearthngo.org',
            emailVerified: 1,
            name: 'Amanda Green',
            createdAt: Math.floor(sixMonthsAgo + (120 * 24 * 60 * 60 * 1000)),
            updatedAt: Math.floor(sixMonthsAgo + (120 * 24 * 60 * 60 * 1000)),
        },
        {
            id: 'user_08hbkea9l5g7d0i8u4t3x2d5y1',
            email: 'robert.kumar@helpinghands.org',
            emailVerified: 1,
            name: 'Robert Kumar',
            createdAt: Math.floor(sixMonthsAgo + (130 * 24 * 60 * 60 * 1000)),
            updatedAt: Math.floor(sixMonthsAgo + (130 * 24 * 60 * 60 * 1000)),
        },
        // Admin users
        {
            id: 'user_09hclfb0m6h8e1j9v5u4y3e6z2',
            email: 'admin@wastemanagement.com',
            emailVerified: 1,
            name: 'Admin User',
            createdAt: Math.floor(sixMonthsAgo),
            updatedAt: Math.floor(sixMonthsAgo),
        },
        {
            id: 'user_10hdmgc1n7i9f2k0w6v5z4f7a3',
            email: 'supervisor@wastemanagement.com',
            emailVerified: 1,
            name: 'Lisa Martinez',
            createdAt: Math.floor(sixMonthsAgo + (10 * 24 * 60 * 60 * 1000)),
            updatedAt: Math.floor(sixMonthsAgo + (10 * 24 * 60 * 60 * 1000)),
        },
    ];

    await db.insert(user).values(sampleUsers);
    
    console.log('✅ Users seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});