import { type Product, type InsertProduct, type Contact, type InsertContact, 
         type Order, type OrderItem, type InsertOrder } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  getProductById(id: number): Promise<Product | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  getOrders(): Promise<Order[]>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private contacts: Map<number, Contact>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private currentProductId: number;
  private currentContactId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;

  constructor() {
    this.products = new Map();
    this.contacts = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.currentProductId = 1;
    this.currentContactId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    this.initializeProducts();
  }

  private initializeProducts() {
    const defaultProducts: InsertProduct[] = [
      {
        name: "Silk Scrunchie Set",
        description: "Handmade silk scrunchies in pastel colors",
        price: "12.99",
        category: "scrunchies",
        imageUrl: "https://images.unsplash.com/photo-1594205354876-7930d557a78c",
        featured: true
      },
      {
        name: "Lavender Dreams Candle",
        description: "Hand-poured scented candle with natural lavender",
        price: "24.99",
        category: "candles",
        imageUrl: "https://images.unsplash.com/photo-1599313804818-2eaba0b14cba",
        featured: true
      }
    ];

    defaultProducts.forEach(product => {
      const id = this.currentProductId++;
      const newProduct: Product = { ...product, id };
      this.products.set(id, newProduct);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.featured
    );
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const newContact = { ...contact, id };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    let total = 0;

    // Calculate total and create order items
    for (const item of order.items) {
      const product = await this.getProductById(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      const itemPrice = parseFloat(product.price.toString()) * item.quantity;
      total += itemPrice;

      const orderItem: OrderItem = {
        id: this.currentOrderItemId++,
        orderId: id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      };

      this.orderItems.set(orderItem.id, orderItem);
    }

    const newOrder: Order = {
      id,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      status: "pending",
      total: total.toString(),
      createdAt: new Date()
    };

    this.orders.set(id, newOrder);
    return newOrder;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      item => item.orderId === orderId
    );
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
}

export const storage = new MemStorage();