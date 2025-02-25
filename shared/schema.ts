import { pgTable, text, serial, numeric, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = [
  "scrunchies",
  "candles", 
  "accessories",
  "posters",
  "bracelets"
] as const;

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").default(false)
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull()
});

// New tables for order management
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  status: text("status").notNull().default("pending"),
  total: numeric("total").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: numeric("price").notNull()
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  price: true,
  category: true,
  imageUrl: true,
  featured: true
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  message: true
}).extend({
  email: z.string().email("Please enter a valid email address")
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  customerName: true,
  customerEmail: true
}).extend({
  items: z.array(z.object({
    productId: z.number(),
    quantity: z.number().min(1),
  }))
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

// Update IStorage interface
export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  // New methods for order management
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  getOrders(): Promise<Order[]>;
}