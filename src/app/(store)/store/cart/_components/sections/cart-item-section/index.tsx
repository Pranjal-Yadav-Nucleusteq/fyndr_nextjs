"use client";

import { Trash, X } from "lucide-react";
import React from "react";

import { MotionDiv } from "@/components/global/animations/motion-elements";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

import CartItemCard from "../../cart-item-card";

const CartItemSection = () => {
  const {
    items,
    appointmentType,
    showCartItemsDeleteButton,
    setShowCartItemsDeleteButton,
  } = useStoreCartStore();

  if (items.length === 0) return null;

  const toggleDeleteButton = () => {
    setShowCartItemsDeleteButton(!showCartItemsDeleteButton);
  };

  return (
    <>
      <div className="flex flex-col gap-4 border-b border-secondary-20 p-4">
        <div className="flex-between relative">
          <div className="heading-6-medium grid w-full grid-cols-8 px-5">
            <div className="col-span-3">Product</div>
            <div className="flex-center col-span-2">Quantity</div>
            <div className="col-span-3 flex place-content-end items-center">
              Price
            </div>
          </div>
          <MotionDiv
            onClick={toggleDeleteButton}
            className="flex-center absolute -top-16 right-4 h-[44px] w-[56px] cursor-pointer overflow-hidden rounded-10 border border-[#FF2B2B] p-4 text-[#FF2B2B]"
          >
            {showCartItemsDeleteButton ? (
              <MotionDiv
                key="cross"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.3,
                }}
              >
                <X size={22} />
              </MotionDiv>
            ) : (
              <MotionDiv
                key="trash"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.3,
                }}
              >
                <Trash size={20} />
              </MotionDiv>
            )}
          </MotionDiv>
        </div>

        <div className="flex flex-col gap-4 overflow-x-hidden">
          {items.map((item, i) => {
            const appointments =
              appointmentType === "APPOINTMENT_PER_ITEM"
                ? item.itemLevelAppointments
                : [];

            return (
              <div
                key={`${item.itemId}-${item.price}-${item.qty}-${item.modifiers.whole.length}-${item.modifiers.addon.length}`}
                className="flex-between items-start gap-4"
              >
                <CartItemCard
                  storeCartItem={item}
                  index={i}
                  appointments={appointments}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CartItemSection;
