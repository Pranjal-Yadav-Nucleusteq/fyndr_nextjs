import React from "react";

import DefaultCard from "@/components/global/cards/default-card";

import CartActionSection from "./_components/sections/cart-action-section";
import CartItemSection from "./_components/sections/cart-item-section";
import EmptyCart from "./_components/sections/empty-cart";
import HeadingSection from "./_components/sections/heading-section";
import PricingSection from "./_components/sections/pricing-section";

const StoreCart = () => {
  return (
    <main className="my-10 flex flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-[1550px] flex-col gap-4 sm:flex-row xl:w-11/12">
        <DefaultCard className="flex w-full flex-col p-0 text-black-heading">
          <HeadingSection />
          <CartItemSection />
          <PricingSection />
          <CartActionSection />
          <EmptyCart />
        </DefaultCard>
      </div>
    </main>
  );
};

export default StoreCart;
