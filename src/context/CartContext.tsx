
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/types';
import { toast } from '@/components/ui/sonner';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    const existingItemIndex = items.findIndex(
      (item) => 
        item.product.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );

    if (existingItemIndex > -1) {
      const newItems = [...items];
      newItems[existingItemIndex].quantity += quantity;
      setItems(newItems);
      toast.success('Item quantity updated in cart');
    } else {
      setItems([
        ...items,
        {
          product,
          quantity,
          selectedSize,
          selectedColor,
        },
      ]);
      toast.success('Item added to cart');
    }
  };

  const removeItem = (productId: string) => {
    setItems(items.filter((item) => item.product.id !== productId));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const newItems = items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    setItems(newItems);
  };

  const clearCart = () => {
    setItems([]);
    toast.info('Cart cleared');
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
