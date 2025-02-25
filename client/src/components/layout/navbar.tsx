import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <a className="font-bold text-2xl text-primary">Pravaah</a>
          </Link>
          
          <div className="hidden sm:flex space-x-8">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <a className={cn(
                  "text-foreground/60 hover:text-foreground transition-colors",
                  location === link.href && "text-primary font-medium"
                )}>
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
