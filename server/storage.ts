import { type Product, type InsertProduct, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private contacts: Map<number, Contact>;
  private currentProductId: number;
  private currentContactId: number;

  constructor() {
    this.products = new Map();
    this.contacts = new Map();
    this.currentProductId = 1;
    this.currentContactId = 1;
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
}

export const storage = new MemStorage();