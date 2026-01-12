"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

export interface CartTopping {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  size?: "small" | "medium" | "large";
  quantity: number;
  unitPrice: number;
  toppings: CartTopping[];
  specialInstructions?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "id"> }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, { ...action.payload, id: generateId() }],
        isOpen: true,
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "LOAD_CART":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("beethoven-cart");
    if (saved) {
      try {
        const items = JSON.parse(saved);
        dispatch({ type: "LOAD_CART", payload: items });
      } catch {}
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("beethoven-cart", JSON.stringify(state.items));
  }, [state.items]);

  const subtotal = state.items.reduce((sum, item) => {
    const toppingsTotal = item.toppings.reduce((t, topping) => t + topping.price, 0);
    return sum + (item.unitPrice + toppingsTotal) * item.quantity;
  }, 0);

  const tax = subtotal * 0.12; // BC PST + GST
  const total = subtotal + tax;
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items: state.items,
    isOpen: state.isOpen,
    addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
    updateQuantity: (id, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    openCart: () => dispatch({ type: "OPEN_CART" }),
    closeCart: () => dispatch({ type: "CLOSE_CART" }),
    subtotal,
    tax,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
