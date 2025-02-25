import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertOrderSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/featured", async (_req, res) => {
    const products = await storage.getFeaturedProducts();
    res.json(products);
  });

  app.get("/api/products/category/:category", async (req, res) => {
    const products = await storage.getProductsByCategory(req.params.category);
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await storage.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  });

  app.post("/api/contact", async (req, res) => {
    const result = insertContactSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const contact = await storage.createContact(result.data);
    res.json(contact);
  });

  // Order management routes
  app.post("/api/orders", async (req, res) => {
    const result = insertOrderSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    try {
      const order = await storage.createOrder(result.data);
      const items = await storage.getOrderItems(order.id);
      res.json({ ...order, items });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  });

  app.get("/api/orders", async (_req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  app.get("/api/orders/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid order ID" });
    }

    const order = await storage.getOrder(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const items = await storage.getOrderItems(order.id);
    res.json({ ...order, items });
  });

  const httpServer = createServer(app);
  return httpServer;
}