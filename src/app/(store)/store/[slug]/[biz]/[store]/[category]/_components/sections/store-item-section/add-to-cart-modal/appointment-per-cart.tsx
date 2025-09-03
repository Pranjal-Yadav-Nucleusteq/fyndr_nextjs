"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";

import Button from "@/components/global/buttons";
import ROUTES from "@/constants/routes";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

type Props = {
  onAddToCart: (mode: "APPOINTMENT_PER_CART") => void;
};

const AppointmentPerCart = ({ onAddToCart }: Props) => {
  const [transition, startTransition] = useTransition();
  const { items } = useStoreCartStore();

  const handleAddToCart = () => {
    startTransition(async () => {
      onAddToCart("APPOINTMENT_PER_CART");
    });
  };

  return (
    <div className="flex-between gap-4 border-t border-secondary-20 p-4">
      {items.length > 0 ? (
        <Button variant="primary" stdHeight stdWidth asChild>
          <Link href={ROUTES.STORE_CART}>Checkout</Link>
        </Button>
      ) : (
        <div></div>
      )}
      <Button
        variant="primary-outlined"
        stdHeight
        stdWidth
        onClick={handleAddToCart}
        disabled={transition}
      >
        <ShoppingCart size={20} className="!size-5" />{" "}
        {transition ? "Adding to cart" : "Add to cart"}
      </Button>
    </div>
  );
};

export default AppointmentPerCart;
