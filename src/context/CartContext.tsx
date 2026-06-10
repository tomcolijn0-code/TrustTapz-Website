"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  slug: string;
  naam: string;
  aantal: number;
  prijs: number;
  variant?: string; // bijv. "Wit" of "Zwart"
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, aantal: number, variant?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tt-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("tt-cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function addItem(item: CartItem) {
    setItems((prev) => {
      const exists = prev.some(
        (i) =>
          i.slug === item.slug &&
          i.aantal === item.aantal &&
          i.variant === item.variant
      );
      return exists ? prev : [...prev, item];
    });
    setIsOpen(true);
  }

  function removeItem(slug: string, aantal: number, variant?: string) {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.slug === slug && i.aantal === aantal && i.variant === variant)
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, i) => sum + i.prijs, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
