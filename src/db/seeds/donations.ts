import { db } from '@/db';
import { user, donations } from '@/db/schema';

async function main() {
    // First, get actual user IDs from the database
    const existingUsers = await db.select({ id: user.id }).from(user);
    
    if (existingUsers.length < 3) {
        throw new Error('Not enough users in database. Please seed users first.');
    }

    // Use actual user IDs from database
    const donorIds = existingUsers.slice(0, 5).map(u => u.id);
    const ngoIds = existingUsers.slice(5, 8).map(u => u.id);

    const now = new Date();
    const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString();

    const sampleDonations = [
        // 5 Pending donations
        {
            userId: donorIds[0],
            ngoId: null,
            itemType: 'electronics',
            itemName: 'Samsung Galaxy S10',
            condition: 'good',
            quantity: 1,
            description: 'Fully functional smartphone with minor scratches on the back. Includes original charger and case.',
            pickupAddress: '123 Green Valley Road, Mumbai 400001',
            contactNumber: '+91 98765 43210',
            status: 'pending',
            createdAt: daysAgo(2),
            updatedAt: daysAgo(2),
        },
        {
            userId: donorIds[1],
            ngoId: null,
            itemType: 'furniture',
            itemName: 'IKEA Dining Table Set',
            condition: 'excellent',
            quantity: 1,
            description: 'Solid wood dining table with 4 chairs. Like new condition, only used for 6 months.',
            pickupAddress: '45 Park Street, Kolkata 700016',
            contactNumber: '+91 98234 56789',
            status: 'pending',
            createdAt: daysAgo(3),
            updatedAt: daysAgo(3),
        },
        {
            userId: donorIds[2],
            ngoId: null,
            itemType: 'clothing',
            itemName: 'Winter Coats and Jackets',
            condition: 'good',
            quantity: 8,
            description: 'Collection of 8 winter jackets in various sizes (M, L, XL). Clean and in good condition.',
            pickupAddress: '78 MG Road, Bangalore 560001',
            contactNumber: '+91 98876 54321',
            status: 'pending',
            createdAt: daysAgo(4),
            updatedAt: daysAgo(4),
        },
        {
            userId: donorIds[3],
            ngoId: null,
            itemType: 'books',
            itemName: 'Educational Textbooks Collection',
            condition: 'good',
            quantity: 25,
            description: 'Assorted educational books including science, mathematics, and English textbooks for grades 8-12.',
            pickupAddress: '234 Anna Salai, Chennai 600002',
            contactNumber: '+91 98345 67890',
            status: 'pending',
            createdAt: daysAgo(5),
            updatedAt: daysAgo(5),
        },
        {
            userId: donorIds[4],
            ngoId: null,
            itemType: 'toys',
            itemName: 'Children Toys and Games',
            condition: 'excellent',
            quantity: 15,
            description: 'Mix of board games, puzzles, and educational toys. All pieces complete and in excellent condition.',
            pickupAddress: '567 Civil Lines, Delhi 110054',
            contactNumber: '+91 98456 78901',
            status: 'pending',
            createdAt: daysAgo(2),
            updatedAt: daysAgo(2),
        },
        // 2 Accepted donations
        {
            userId: donorIds[0],
            ngoId: ngoIds[0],
            itemType: 'kitchenware',
            itemName: 'Stainless Steel Cookware Set',
            condition: 'excellent',
            quantity: 1,
            description: 'Complete 12-piece stainless steel cookware set including pots, pans, and lids. Barely used.',
            pickupAddress: '89 Residency Road, Pune 411001',
            contactNumber: '+91 98567 89012',
            status: 'accepted',
            createdAt: daysAgo(5),
            updatedAt: daysAgo(1),
        },
        {
            userId: donorIds[1],
            ngoId: ngoIds[1],
            itemType: 'electronics',
            itemName: 'Dell Laptop with Accessories',
            condition: 'good',
            quantity: 1,
            description: 'Dell Inspiron 15 laptop with charger and mouse. Works perfectly, some wear on keyboard.',
            pickupAddress: '123 Nehru Place, Ahmedabad 380001',
            contactNumber: '+91 98678 90123',
            status: 'accepted',
            createdAt: daysAgo(6),
            updatedAt: daysAgo(2),
        },
        // 1 Picked-up donation
        {
            userId: donorIds[2],
            ngoId: ngoIds[2],
            itemType: 'furniture',
            itemName: 'Study Desk and Chair',
            condition: 'fair',
            quantity: 1,
            description: 'Wooden study desk with drawer and matching chair. Shows signs of use but sturdy and functional.',
            pickupAddress: '456 Salt Lake, Hyderabad 500001',
            contactNumber: '+91 98789 01234',
            status: 'picked-up',
            createdAt: daysAgo(7),
            updatedAt: daysAgo(1),
        },
    ];

    await db.insert(donations).values(sampleDonations);
    
    console.log('✅ Donations seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});