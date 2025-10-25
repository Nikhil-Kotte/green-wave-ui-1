import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// User table (required for foreign key references)
export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  name: text('name'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull(),
});

// Session table (for auth)
export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id),
  expiresAt: integer('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
});

// Pickups table
export const pickups = sqliteTable('pickups', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => user.id),
  wasteType: text('waste_type').notNull(), // plastic, metal, paper, glass, ewaste, organic, mixed
  pickupDate: text('pickup_date').notNull(),
  pickupTime: text('pickup_time').notNull(), // morning, afternoon, evening
  address: text('address').notNull(),
  estimatedWeight: real('estimated_weight').notNull(), // in kg
  actualWeight: real('actual_weight'), // in kg, nullable
  notes: text('notes'),
  status: text('status').notNull().default('pending'), // pending, assigned, in-progress, completed, cancelled
  collectorId: text('collector_id').references(() => user.id),
  createdAt: text('created_at').notNull(),
  completedAt: text('completed_at'),
});

// Donations table
export const donations = sqliteTable('donations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => user.id),
  ngoId: text('ngo_id').references(() => user.id),
  itemType: text('item_type').notNull(), // electronics, furniture, clothing, books, toys, kitchenware, other
  itemName: text('item_name').notNull(),
  condition: text('condition').notNull(), // excellent, good, fair
  quantity: integer('quantity').notNull(),
  description: text('description').notNull(),
  pickupAddress: text('pickup_address').notNull(),
  contactNumber: text('contact_number').notNull(),
  status: text('status').notNull().default('pending'), // pending, accepted, rejected, picked-up, delivered
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Routes table
export const routes = sqliteTable('routes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  collectorId: text('collector_id').notNull().references(() => user.id),
  status: text('status').notNull().default('planned'), // planned, active, completed
  totalDistance: real('total_distance').notNull(), // in km
  totalPickups: integer('total_pickups').notNull(),
  startTime: text('start_time'),
  endTime: text('end_time'),
  createdAt: text('created_at').notNull(),
});

// Route stops table
export const routeStops = sqliteTable('route_stops', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  routeId: integer('route_id').notNull().references(() => routes.id),
  pickupId: integer('pickup_id').notNull().references(() => pickups.id),
  stopOrder: integer('stop_order').notNull(),
  address: text('address').notNull(),
  wasteType: text('waste_type').notNull(),
  status: text('status').notNull().default('pending'), // pending, in-progress, completed, skipped
  arrivalTime: text('arrival_time'),
  departureTime: text('departure_time'),
});

// Tracking locations table
export const trackingLocations = sqliteTable('tracking_locations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  collectorId: text('collector_id').notNull().references(() => user.id),
  routeId: integer('route_id').references(() => routes.id),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  timestamp: text('timestamp').notNull(),
  speed: real('speed'), // in km/h, nullable
});