"use client";

import { AnimatePresence } from "motion/react";
import React from "react";

import { MotionDiv } from "@/components/global/animations/motion-elements";
import Button from "@/components/global/buttons";
import CircularProgress from "@/components/global/progress/circular-progress";
import { useTimer } from "@/hooks/use-timer";
import { parseAmount } from "@/lib/utils/parser";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";
import { StoreCartItem } from "@/types/zustand/store-cart-store.types";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

import AppointmentInfoCard from "./appointment-info-card";
import AllAppointmentsModal from "./sections/cart-item-section/all-appointments-modal";
import StoreCartQtySelector from "./store-cart-qty-selector";

type Props = {
  storeCartItem: StoreCartItem;
  index: number;
  appointments: AppointmentSlotPayload[];
};

const CartItemCard = ({ storeCartItem, index, appointments }: Props) => {
  const {
    updateItemQuantity,
    incrementItemQuantity,
    decrementItemQuantity,
    getQuantityStep,
    showCartItemsDeleteButton,
    removeCartItem,
  } = useStoreCartStore();

  const { startTimer, isActive, timer } = useTimer(5);

  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [isRemoved, setIsRemoved] = React.useState<boolean>(false);
  const [showUndo, setShowUndo] = React.useState<boolean>(false);
  const [isUndoing, setIsUndoing] = React.useState<boolean>(false);

  const name = storeCartItem.storeItem.item.name;
  const itemPrice = storeCartItem.price;
  const wholeModifiers = storeCartItem.modifiers.whole;
  const addonModifiers = storeCartItem.modifiers.addon;
  const qty = storeCartItem.qty;

  const handleQtyChange = (newQty: number) => {
    updateItemQuantity(index, newQty);
  };

  const handleIncrement = () => {
    incrementItemQuantity(index);
  };

  const handleDecrement = () => {
    decrementItemQuantity(index);
  };

  const handleRemoveCartItem = () => {
    setIsDeleting(true);

    // After slide out animation, show undo timer
    setTimeout(() => {
      setShowUndo(true);
      startTimer();
    }, 500); // Just the slide out duration
  };

  const handleUndo = () => {
    setIsUndoing(true);
    setShowUndo(false);

    // Reset states after slide-in animation completes
    setTimeout(() => {
      setIsDeleting(false);
      setIsUndoing(false);
    }, 500); // Match the slide-in animation duration
  };

  // Watch for timer completion
  React.useEffect(() => {
    if (showUndo && !isActive && timer === 0) {
      // Timer finished - remove item permanently
      setIsRemoved(true);
      setTimeout(() => {
        removeCartItem(storeCartItem.itemId, index);
        setIsDeleting(false);
        setShowUndo(false);
        setIsRemoved(false);
      }, 300);
    }
  }, [isActive, timer, showUndo, removeCartItem, storeCartItem.itemId, index]);

  const step = getQuantityStep(index);

  const totalPrice = parseAmount(
    itemPrice + wholeModifiers.reduce((acc, mod) => acc + mod.price, 0)
  );

  if (isRemoved) {
    return null;
  }

  const actualAppointments = appointments.filter((appointment) => {
    const startTime = Object.values(appointment)[0].startTime;
    const endTime = Object.values(appointment)[0].endTime;

    return startTime && endTime;
  });

  return (
    <div
      className={`flex w-full flex-col rounded-10 ${
        actualAppointments.length > 0 ? "border border-secondary-20" : ""
      }`}
    >
      {/* Main Cart Item */}
      <AnimatePresence mode="wait">
        {!showUndo ? (
          <MotionDiv
            key="cart-item"
            initial={isUndoing ? { x: "-100%", opacity: 0.3 } : false}
            animate={{
              x: "0%",
              opacity: 1,
            }}
            exit={{
              x: "-100%",
              opacity: 0,
            }}
            transition={{
              x: {
                duration: isUndoing ? 0.5 : isDeleting ? 0.5 : 0.3,
                delay: isDeleting && !isUndoing ? 0.4 : 0,
                ease: "easeInOut",
              },
              opacity: {
                duration: isUndoing ? 0.3 : isDeleting ? 0.3 : 0.2,
                delay: isDeleting && !isUndoing ? 0.7 : 0,
              },
            }}
            className="w-full"
          >
            <div className="relative flex w-full flex-col gap-4 overflow-hidden rounded-10 bg-primary-0.5 shadow-row">
              {/* Red Overlay Animation */}
              <AnimatePresence>
                {isDeleting && !isUndoing && (
                  <MotionDiv
                    initial={{
                      width: "0%",
                    }}
                    animate={{
                      width: "100%",
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-y-0 right-0 z-10 rounded-10 bg-[#FF2B2B]"
                  />
                )}
              </AnimatePresence>

              <div className="heading-6 relative grid w-full grid-cols-8 gap-4 rounded-10 bg-primary-0.5 text-black-heading">
                <div className="col-span-3 flex flex-col gap-2 py-4 pl-5">
                  <div className="flex flex-row gap-2">
                    <div>{name}</div>
                    {wholeModifiers.length > 0 && (
                      <div>({wholeModifiers[0].modifier.modName})</div>
                    )}
                  </div>
                  {addonModifiers.length > 0 && (
                    <div className="body-3 flex text-black-60">
                      <div>Add-ons: </div>
                      <div className="">
                        {addonModifiers.map((mod, i) => (
                          <span key={mod.objid} className="ml-1">
                            {mod.modifier.modName}{" "}
                            <span className="body-3-medium">
                              (${mod.price})
                            </span>
                            {addonModifiers.length - 1 > i ? "," : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-center col-span-2 py-4">
                  <StoreCartQtySelector
                    qty={qty}
                    min={1}
                    onDecrement={handleDecrement}
                    onIncrement={handleIncrement}
                    setQty={handleQtyChange}
                    step={step}
                  />
                </div>

                <div className="col-span-3 flex h-full place-content-end items-center overflow-hidden">
                  <div className="relative flex size-full justify-end gap-4">
                    {/* Price Text */}
                    <MotionDiv
                      key={`price-text-${storeCartItem.itemId}`}
                      className="flex items-center justify-end"
                      animate={{
                        x: showCartItemsDeleteButton ? -80 : 0,
                        opacity: isDeleting && !isUndoing ? 0 : 1,
                      }}
                      transition={{
                        type: "keyframes",
                        stiffness: 400,
                        damping: 30,
                        duration: 0.3,
                      }}
                    >
                      <div className="pr-4">${totalPrice}</div>
                    </MotionDiv>

                    {/* Delete Button */}
                    <AnimatePresence>
                      {showCartItemsDeleteButton &&
                        !(isDeleting && !isUndoing) && (
                          <MotionDiv
                            key={`delete-button-${storeCartItem.itemId}`}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            initial={{ x: 100, opacity: 0 }}
                            transition={{
                              type: "keyframes",
                              stiffness: 400,
                              damping: 30,
                              duration: 0.3,
                            }}
                            onClick={handleRemoveCartItem}
                            className="body-1-medium flex-center absolute right-0 top-0 h-full cursor-pointer rounded-r-10 bg-[#FF2B2B] px-4 text-white"
                            whileHover={{
                              backgroundColor: "#E02424",
                              transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Delete
                          </MotionDiv>
                        )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {actualAppointments.length > 0 && (
              <div className="flex gap-2">
                {actualAppointments.length === 1 ? (
                  <div className="flex gap-4">
                    <AppointmentInfoCard appointment={actualAppointments[0]} />
                  </div>
                ) : (
                  <AllAppointmentsModal
                    trigger={
                      <div className="body-1-medium cursor-pointer px-5 py-4 text-primary underline">
                        {actualAppointments.length} Appointments
                      </div>
                    }
                    appointments={actualAppointments}
                  />
                )}
              </div>
            )}
          </MotionDiv>
        ) : (
          /* Undo Timer UI */
          <MotionDiv
            key="undo-timer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="flex w-full items-center justify-end rounded-10 px-5 py-4"
          >
            <div className="flex items-center gap-2">
              <Button variant="primary-dark" stdHeight onClick={handleUndo}>
                Undo
              </Button>
              <CircularProgress
                value={((5 - timer) / 5) * 100}
                duration={300}
                size={58}
                strokeWidth={3}
                labelClassName="heading-6 text-secondary"
                renderLabel={() => `${timer}`}
                progressClassName="stroke-secondary"
              />
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartItemCard;
