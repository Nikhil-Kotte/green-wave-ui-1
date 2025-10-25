import { db } from '@/db';
import { user, donations } from '@/db/schema';

async function main() {
    // First, verify we have enough users in the database
    const users = await db.select().from(user).orderBy(user.email);
    
    if (users.length < 10) {
        throw new Error(`❌ Not enough users in database. Found ${users.length}, need at least 10. Please run the users seeder first.`);
    }

    const sampleDonations = [
        // Pending Donations (no NGO assigned)
        {
            userId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            ngoId: null,
            itemType: 'electronics',
            itemName: 'Dell Laptop i5 8GB RAM',
            condition: 'good',
            quantity: 1,
            description: 'Working laptop with minor scratches on the lid. Includes original charger and carrying case. Battery holds charge for 3-4 hours. Perfect for students or basic office work.',
            pickupAddress: '123 Tech Street, Silicon Valley, CA 94025',
            contactNumber: '+1-555-0101',
            status: 'pending',
            createdAt: new Date('2024-01-15T10:30:00Z'),
            updatedAt: new Date('2024-01-15T10:30:00Z'),
        },
        {
            userId: 'user_06n9qcy7j3e4d8g6s2r1v0b3w9',
            ngoId: null,
            itemType: 'furniture',
            itemName: 'Oak Dining Table with 4 Chairs',
            condition: 'excellent',
            quantity: 5,
            description: 'Solid oak dining set in excellent condition. Table seats 6-8 people comfortably. Chairs have cushioned seats with no tears or stains. Heavy and sturdy construction.',
            pickupAddress: '456 Home Avenue, Portland, OR 97201',
            contactNumber: '+1-555-0102',
            status: 'pending',
            createdAt: new Date('2024-01-16T14:15:00Z'),
            updatedAt: new Date('2024-01-16T14:15:00Z'),
        },
        {
            userId: 'user_07o0rdz8k4f5e9h7t3s2w1c4x0',
            ngoId: null,
            itemType: 'clothing',
            itemName: 'Winter Clothes Bundle',
            condition: 'good',
            quantity: 15,
            description: 'Assorted winter clothing including jackets, sweaters, and coats for adults and children. All items are clean, no major stains or damage. Sizes range from small to XL.',
            pickupAddress: '789 Charity Lane, Seattle, WA 98101',
            contactNumber: '+1-555-0103',
            status: 'pending',
            createdAt: new Date('2024-01-17T09:45:00Z'),
            updatedAt: new Date('2024-01-17T09:45:00Z'),
        },
        {
            userId: 'user_09q2tfb0m6h7g1j9v5u4y3e6z2',
            ngoId: null,
            itemType: 'books',
            itemName: 'College Textbooks Collection',
            condition: 'fair',
            quantity: 20,
            description: 'Various college textbooks covering engineering, computer science, and mathematics. Some highlighting and notes inside. Covers show wear but pages are intact. Great for students on a budget.',
            pickupAddress: '321 University Drive, Austin, TX 78701',
            contactNumber: '+1-555-0104',
            status: 'pending',
            createdAt: new Date('2024-01-18T16:20:00Z'),
            updatedAt: new Date('2024-01-18T16:20:00Z'),
        },
        {
            userId: 'user_10r3ugc1n7i8h2k0w6v5z4f7a3',
            ngoId: null,
            itemType: 'toys',
            itemName: 'Educational Toys Set',
            condition: 'excellent',
            quantity: 8,
            description: 'High-quality educational toys for ages 3-8. Includes building blocks, puzzles, STEM learning kits, and board games. All pieces complete and toys are thoroughly cleaned.',
            pickupAddress: '654 Family Street, Denver, CO 80202',
            contactNumber: '+1-555-0105',
            status: 'pending',
            createdAt: new Date('2024-01-19T11:00:00Z'),
            updatedAt: new Date('2024-01-19T11:00:00Z'),
        },

        // Accepted Donations (NGO assigned)
        {
            userId: 'user_01h4kxt2e8z9y3b1n7m6q5w8r4',
            ngoId: 'user_07o0rdz8k4f5e9h7t3s2w1c4x0',
            itemType: 'kitchenware',
            itemName: 'Complete Kitchen Utensils Set',
            condition: 'good',
            quantity: 25,
            description: 'Full set of kitchen utensils including pots, pans, plates, cutlery, and cooking tools. Some items show normal wear from use but all are functional and clean. Great for setting up a new kitchen.',
            pickupAddress: '987 Kitchen Road, San Francisco, CA 94102',
            contactNumber: '+1-555-0106',
            status: 'accepted',
            createdAt: new Date('2024-01-12T08:30:00Z'),
            updatedAt: new Date('2024-01-14T10:15:00Z'),
        },
        {
            userId: 'user_06n9qcy7j3e4d8g6s2r1v0b3w9',
            ngoId: 'user_08p1sea9l5g6f0i8u4t3x2d5y1',
            itemType: 'electronics',
            itemName: 'Samsung Smart TV 42 inch',
            condition: 'excellent',
            quantity: 1,
            description: 'Samsung 42-inch Smart TV in excellent working condition. Includes remote control, power cable, and wall mount bracket. Screen is crystal clear with no dead pixels. Less than 2 years old.',
            pickupAddress: '234 Media Boulevard, Los Angeles, CA 90001',
            contactNumber: '+1-555-0107',
            status: 'accepted',
            createdAt: new Date('2024-01-13T13:45:00Z'),
            updatedAt: new Date('2024-01-15T09:30:00Z'),
        },

        // Picked-up Donation
        {
            userId: 'user_07o0rdz8k4f5e9h7t3s2w1c4x0',
            ngoId: 'user_07o0rdz8k4f5e9h7t3s2w1c4x0',
            itemType: 'furniture',
            itemName: 'Single Bed with Mattress',
            condition: 'good',
            quantity: 1,
            description: 'Single bed frame (metal) with a 6-inch memory foam mattress. Frame is sturdy with no rust. Mattress is clean, no stains or tears. Only 1 year old.',
            pickupAddress: '567 Sleep Avenue, Chicago, IL 60601',
            contactNumber: '+1-555-0108',
            status: 'picked-up',
            createdAt: new Date('2024-01-10T15:00:00Z'),
            updatedAt: new Date('2024-01-14T14:30:00Z'),
        },

        // Delivered Donation
        {
            userId: 'user_09q2tfb0m6h7g1j9v5u4y3e6z2',
            ngoId: 'user_08p1sea9l5g6f0i8u4t3x2d5y1',
            itemType: 'clothing',
            itemName: 'Professional Work Clothes',
            condition: 'excellent',
            quantity: 10,
            description: 'High-quality professional attire including suits, dress shirts, blouses, and dress pants. All items are dry-cleaned and in excellent condition. Sizes range from small to large. Perfect for job interviews and office wear.',
            pickupAddress: '890 Professional Plaza, New York, NY 10001',
            contactNumber: '+1-555-0109',
            status: 'delivered',
            createdAt: new Date('2024-01-08T12:00:00Z'),
            updatedAt: new Date('2024-01-15T16:45:00Z'),
        },
    ];

    await db.insert(donations).values(sampleDonations);
    
    console.log('✅ Donations seeder completed successfully - 9 donation records created');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});