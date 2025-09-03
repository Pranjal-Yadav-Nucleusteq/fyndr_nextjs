"use client";

import React from "react";

import Button from "@/components/global/buttons";
import Input from "@/components/global/input";
// import { Textarea } from "@/components/ui/textarea";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

import AppointmentInfoCard from "../../appointment-info-card";
import DeliveryDateAndTimePicker from "../../delivery-date-and-time-picker";

const CartActionSection = () => {
  const {
    appointmentType,
    cartLevelAppointments,
    openAppointmentModal,
    items,
  } = useStoreCartStore();

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 p-4 px-5">
      {appointmentType === "APPOINTMENT_PER_CART" && (
        <div className="flex flex-col gap-4">
          <DeliveryDateAndTimePicker />
          {cartLevelAppointments.length > 0 && (
            <div className="flex flex-col gap-4">
              <AppointmentInfoCard
                appointment={cartLevelAppointments[0]}
                onEdit={openAppointmentModal}
                className="p-0"
                editClassName="text-secondary"
              />
            </div>
          )}
        </div>
      )}

      {/* <Textarea
        placeholder="Special Instruction (Optional)"
        className="no-focus placeholder min-h-20 !rounded-10 border border-secondary-20 text-black-70 shadow-none"
      /> */}
      <Input placeholder="Special Instruction (Optional)" />
      <div className="flex-center my-4 w-full">
        <Button
          stdHeight
          stdWidth
          variant="primary"
          className="w-full max-w-md"
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default CartActionSection;
