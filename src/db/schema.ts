import { pgTable, serial, text, boolean, timestamp, integer, real, varchar } from 'drizzle-orm/pg-core';

// User table (required for foreign key references)
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  name: text('name'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Session table (for auth)
export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
});

// Pickups table
export const pickups = pgTable('pickups', {
  id: serial('id').primaryKey(),
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
  createdAt: timestamp('created_at').notNull().defaultNow(),
  completedAt: timestamp('completed_at'),
});

// Donations table
export const donations = pgTable('donations', {
  id: serial('id').primaryKey(),
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
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Routes table
export const routes = pgTable('routes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  collectorId: text('collector_id').notNull().references(() => user.id),
  status: text('status').notNull().default('planned'), // planned, active, completed
  totalDistance: real('total_distance').notNull(), // in km
  totalPickups: integer('total_pickups').notNull(),
  startTime: timestamp('start_time'),
  endTime: timestamp('end_time'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Route stops table
export const routeStops = pgTable('route_stops', {
  id: serial('id').primaryKey(),
  routeId: integer('route_id').notNull().references(() => routes.id),
  pickupId: integer('pickup_id').notNull().references(() => pickups.id),
  stopOrder: integer('stop_order').notNull(),
  address: text('address').notNull(),
  wasteType: text('waste_type').notNull(),
  status: text('status').notNull().default('pending'), // pending, in-progress, completed, skipped
  arrivalTime: timestamp('arrival_time'),
  departureTime: timestamp('departure_time'),
});

// Tracking locations table
export const trackingLocations = pgTable('tracking_locations', {
  id: serial('id').primaryKey(),
  collectorId: text('collector_id').notNull().references(() => user.id),
  routeId: integer('route_id').references(() => routes.id),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  speed: real('speed'), // in km/h, nullable
});