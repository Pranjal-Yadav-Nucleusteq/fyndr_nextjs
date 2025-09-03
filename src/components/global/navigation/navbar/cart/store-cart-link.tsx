"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

import CartBadge from "./cart-badge";

type Props = {
  className?: string;
};

const StoreCartLink = ({ className }: Props) => {
  const { items } = useStoreCartStore();
  const count = items.length;

  return (
    <Link
      href={ROUTES.STORE_CART}
      className={cn(
        "flex-center small-regular relative flex-col gap-1 text-white",
        className
      )}
    >
      <ShoppingCart size={20} className="" />
      <p className="hidden lg:flex">Cart</p>
      <CartBadge className="absolute -right-2 -top-2" count={count} />
    </Link>
  );
};

export default StoreCartLink;
