"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  PawPrint,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const display = { fontFamily: "var(--font-display)" } as const;

export interface BowlItem {
  id: number;
  name: string;
  price: number;
  priceFormatted: string;
  image: string;
  category: string;
  quantity: number;
}

interface BowlContextType {
  items: BowlItem[];
  isOpen: boolean;
  openBowl: () => void;
  closeBowl: () => void;
  addToBowl: (item: Omit<BowlItem, "quantity">) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeFromBowl: (id: number) => void;
  clearBowl: () => void;
  getItemQuantity: (id: number) => number;
  totalCount: number;
  totalPrice: number;
}

const BowlContext = createContext<BowlContextType | null>(null);

export function useBowl() {
  const ctx = useContext(BowlContext);
  if (!ctx) {
    throw new Error("useBowl must be used within BowlProvider");
  }
  return ctx;
}

export function BowlProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BowlItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToBowl = (newItem: Omit<BowlItem, "quantity">) => {
    setOrderPlaced(false);
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromBowl = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearBowl = () => {
    setItems([]);
  };

  const getItemQuantity = (id: number) => {
    return items.find((i) => i.id === id)?.quantity ?? 0;
  };

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const freeShippingThreshold = 50;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setItems([]);
    }, 400);
  };

  return (
    <BowlContext.Provider
      value={{
        items,
        isOpen,
        openBowl: () => setIsOpen(true),
        closeBowl: () => {
          setIsOpen(false);
          setOrderPlaced(false);
        },
        addToBowl,
        updateQuantity,
        removeFromBowl,
        clearBowl,
        getItemQuantity,
        totalCount,
        totalPrice,
      }}
    >
      {children}

      {/* Floating Bottom-Right "My Pet's Bowl" Trigger Pill */}
      <AnimatePresence>
        {totalCount > 0 && !isOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.85 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(true)}
            style={display}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 pl-5 pr-3 py-2.5 rounded-full bg-[#1F1924] text-white shadow-[0_20px_50px_rgba(232,69,122,0.4)] border-2 border-[#FF8FB1] cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-[#FF6F9C] text-white">
              <PawPrint className="w-4 h-4 fill-current" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D9F27A] text-[#233000] text-[11px] font-bold flex items-center justify-center">
                {totalCount}
              </span>
            </div>
            <div className="text-left pr-1">
              <div className="text-xs text-[#FFB3C8] font-medium leading-none">
                My Pet’s Bowl
              </div>
              <div className="text-sm font-bold text-white">
                ${totalPrice.toFixed(2)} • View Bowl
              </div>
            </div>
            <span className="w-8 h-8 rounded-full bg-[#D9F27A] text-[#233000] flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-Over "My Pet's Bowl" Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
                setOrderPlaced(false);
              }}
              className="fixed inset-0 z-50 bg-[#1F1924]/55 backdrop-blur-sm"
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[440px] bg-gradient-to-b from-[#FFE3EE] via-[#FFF0F6] to-[#FFDCEB] text-[#2A1621] shadow-2xl border-l border-[#F9BDD3] flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#F7C2D6] flex items-center justify-between bg-[#FFD6E6]/70 backdrop-blur-md">
                <div className="flex items-center gap-2.5" style={display}>
                  <div className="w-10 h-10 rounded-2xl bg-[#FF6F9C] text-white flex items-center justify-center shadow-sm">
                    <PawPrint className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1F1924] leading-none">
                      My Pet’s Bowl
                    </h3>
                    <p className="text-xs text-[#7E6372] mt-1 font-sans">
                      {totalCount} {totalCount === 1 ? "box" : "boxes"} selected
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Close Bowl"
                  onClick={() => {
                    setIsOpen(false);
                    setOrderPlaced(false);
                  }}
                  className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1F1924] flex items-center justify-center transition cursor-pointer shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              {!orderPlaced && items.length > 0 && (
                <div className="px-6 py-3.5 bg-[#FFEBF3] border-b border-[#F8C8DA]">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#5E4653] mb-1.5">
                    {amountToFreeShipping > 0 ? (
                      <span>
                        Add{" "}
                        <strong className="text-[#E8457A]">
                          ${amountToFreeShipping.toFixed(2)}
                        </strong>{" "}
                        more for <strong>FREE Fresh Delivery!</strong>
                      </span>
                    ) : (
                      <span className="text-[#2BB673] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <strong>You unlocked FREE Fresh Delivery!</strong>
                      </span>
                    )}
                    <span>
                      {Math.min(
                        100,
                        Math.round((totalPrice / freeShippingThreshold) * 100)
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F8C8DA] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          100,
                          (totalPrice / freeShippingThreshold) * 100
                        )}%`,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-[#FF6F9C] to-[#2BB673]"
                    />
                  </div>
                </div>
              )}

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {orderPlaced ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12 px-4"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#D9F27A] text-[#233000] flex items-center justify-center mb-5 shadow-lg">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4
                      style={display}
                      className="text-3xl font-bold text-[#1F1924] mb-2"
                    >
                      Fresh Bowl Confirmed!
                    </h4>
                    <p className="text-sm text-[#6E5664] leading-relaxed mb-6">
                      Our kitchen is steaming your pet’s fresh pouches! You’ll
                      receive a tracking link as soon as your chilled box ships.
                    </p>
                    <Button
                      variant="pink"
                      onClick={() => {
                        setOrderPlaced(false);
                        setIsOpen(false);
                      }}
                      style={display}
                    >
                      Back to Wayora
                    </Button>
                  </motion.div>
                ) : items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                    <div className="w-16 h-16 rounded-3xl bg-[#FFD8E8] text-[#E8457A] flex items-center justify-center mb-4">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h4
                      style={display}
                      className="text-2xl font-bold text-[#1F1924] mb-1.5"
                    >
                      Your Pet’s Bowl is Empty
                    </h4>
                    <p className="text-sm text-[#6E5664] mb-6 max-w-xs">
                      Click “Add to Bowl” on any of our freshly steamed recipes
                      to build your custom box.
                    </p>
                    <Button
                      variant="lime"
                      onClick={() => setIsOpen(false)}
                      style={display}
                    >
                      Explore Recipes
                    </Button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex items-center gap-3.5 p-3.5 rounded-3xl bg-white/85 border border-[#F8C2D6] shadow-sm"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-18 h-18 rounded-2xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8457A]">
                            For {item.category} • 7 Pouches
                          </span>
                          <h4
                            style={display}
                            className="text-base font-bold text-[#1F1924] truncate"
                          >
                            {item.name}
                          </h4>
                          <div className="flex items-center justify-between mt-2">
                            <span
                              style={display}
                              className="text-base font-bold text-[#1F1924]"
                            >
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>

                            {/* Quantity Controls */}
                            <div className="inline-flex items-center gap-2 bg-[#FFE6F0] rounded-full p-1 border border-[#F7BDD2]">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded-full bg-white text-[#1F1924] flex items-center justify-center hover:bg-[#FF6F9C] hover:text-white transition cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span
                                style={display}
                                className="text-xs font-bold px-1.5"
                              >
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded-full bg-white text-[#1F1924] flex items-center justify-center hover:bg-[#FF6F9C] hover:text-white transition cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() => removeFromBowl(item.id)}
                          className="p-1.5 text-[#9E8292] hover:text-[#E8457A] transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Drawer Footer */}
              {!orderPlaced && items.length > 0 && (
                <div className="p-6 border-t border-[#F7C2D6] bg-[#FFD8E8]/85 backdrop-blur-md space-y-4">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center justify-between text-[#5E4653]">
                      <span>Total Pouches</span>
                      <span className="font-semibold">
                        {totalCount * 7} Fresh Pouches
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#5E4653]">
                      <span>Chilled Delivery</span>
                      <span className="font-semibold text-[#2BB673]">
                        {amountToFreeShipping === 0 ? "FREE" : "$5.00"}
                      </span>
                    </div>
                    <div
                      style={display}
                      className="flex items-center justify-between text-xl font-bold text-[#1F1924] pt-2 border-t border-[#F5B8CE]"
                    >
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    variant="lime"
                    size="lg"
                    onClick={handleCheckout}
                    style={display}
                    className="w-full"
                  >
                    <span>Complete Fresh Bowl Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </BowlContext.Provider>
  );
}

