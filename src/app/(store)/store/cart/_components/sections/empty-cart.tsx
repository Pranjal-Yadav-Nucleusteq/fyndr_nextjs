"use client";

import { ShoppingCart } from "lucide-react";
import React from "react";

import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

const EmptyCart = () => {
  const { items } = useStoreCartStore();

  if (items.length !== 0) return null;

  return (
    <div className="flex-center min-h-64 w-full flex-col gap-4 p-4">
      <div className="flex gap-4">
        <ShoppingCart className="size-20 text-primary" />
        <div className="heading-6-medium flex-center text-black-heading">
          Cart is empty
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
