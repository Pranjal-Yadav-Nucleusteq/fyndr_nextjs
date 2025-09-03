"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import { onGetTax } from "@/actions/invoice.action";
import { parseAmount } from "@/lib/utils/parser";
import { DiscountType } from "@/types/global";
import { StoreCartItem } from "@/types/zustand/store-cart-store.types";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

import TipSelector from "../../tip-selector";

const calculateTotalPrice = (items: StoreCartItem[]) => {
  return items.reduce((total, cartItem) => {
    let itemTotal = cartItem.price;

    // Add whole modifiers price (these get multiplied by quantity)
    const wholeModifiersPrice = cartItem.modifiers.whole.reduce(
      (wholeTotal, modifier) => {
        return wholeTotal + modifier.price;
      },
      0
    );

    // Multiply (item price + whole modifiers) by quantity
    itemTotal = (itemTotal + wholeModifiersPrice) * cartItem.qty;

    // Add addon modifiers price (these don't get multiplied by quantity)
    const addonModifiersPrice = cartItem.modifiers.addon.reduce(
      (addonTotal, modifier) => {
        return addonTotal + modifier.price;
      },
      0
    );

    itemTotal += addonModifiersPrice;

    return total + itemTotal;
  }, 0);
};

const PricingSection = () => {
  const { items, postalCode, country, tipConfig, setTipConfig, getTipAmount } =
    useStoreCartStore();

  const { data, isLoading } = useQuery({
    queryKey: ["get-tax", postalCode, country],
    queryFn: () =>
      onGetTax({
        payload: { country: country || "", postalCode: postalCode || "" },
      }),
  });

  if (items.length === 0) return null;

  if (isLoading) {
    return <div className="flex-center w-full">Loading...</div>;
  }

  if (!data?.success || !data?.data) {
    return (
      <div className="flex-center w-full text-red-500">
        Failed to get tax details, please try again later.
      </div>
    );
  }

  const handleTip = (value: number, type: DiscountType) => {
    setTipConfig(value, type);
  };

  const totalPrice = calculateTotalPrice(items);
  const taxRate = data.data.taxRate;
  const totalTax = totalPrice * taxRate;

  // Calculate tip amount dynamically based on current total price
  const tipAmount = getTipAmount(totalPrice);
  const totalPayableAmount = totalPrice + totalTax + tipAmount;

  return (
    <div className="flex flex-col ">
      <div className="flex-between w-full gap-4 border-b border-secondary-20">
        <div className="heading-6 flex w-full flex-col gap-4 p-4 px-5">
          <div className="flex-between">
            <div>Total Price</div>
            <div>${parseAmount(totalPrice)}</div>
          </div>
          <div className="flex-between">
            <div>Tax</div>
            <div>${parseAmount(totalTax)}</div>
          </div>
          <div className="flex-between">
            <div className="flex-between gap-4">
              Add Tip:{" "}
              <TipSelector onSelect={handleTip} tipConfig={tipConfig} />
            </div>
            <div>${parseAmount(tipAmount)}</div>
          </div>
        </div>
        {/* <div className="h-4 w-[41px]"></div> */}
      </div>
      <div className="flex-between gap-4 border-b border-secondary-20">
        <div className="flex-between heading-6 w-full p-4 px-5">
          <div>Total Payable Amount</div>
          <div>${parseAmount(totalPayableAmount)}</div>
        </div>
        {/* <div className="h-4 w-[41px]"></div> */}
      </div>
    </div>
  );
};

export default PricingSection;
