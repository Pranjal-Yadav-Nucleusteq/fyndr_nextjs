"use client";

import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

import SlotBooking from "@/components/global/appointment/slot-booking";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { Textarea } from "@/components/ui/textarea";
import ASSETS from "@/constants/assets";
import { parseAmount } from "@/lib/utils/parser";
import { AppointmentSlot } from "@/types/appointment/appointment.types";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";
import { GetStoreResponse } from "@/types/store/store.response";
import { StoreItem } from "@/types/store/store.types";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

import AppointmentPerCart from "./appointment-per-cart";
import AppointmentPerItem from "./appointment-per-item";
import ItemCard from "./item-card";
import ItemInfoSection from "./item-info-section";
import ModifierSection from "./modifier-section";
import NoAppointment from "./no-appointment";
import StoreQtySelector from "./store-qty-selector";

type Props = {
  trigger: React.ReactNode;
  storeItem: StoreItem;
  appointmentType: GetStoreResponse["catalogueAppointmentType"];
  bookingEnabled: GetStoreResponse["catalogBookingEnabled"];
  country: string;
  postalCode: string;
};

const wholeUnits = ["each", "set", "box", "pair"];

const AddToCartModal = ({
  trigger,
  storeItem,
  appointmentType,
  bookingEnabled,
}: Props) => {
  const { addCartItem, bizName, locationId } = useStoreCartStore();

  const [view, setView] = useState<"APPOINTMENT_VIEW" | "ITEM_INFO_VIEW">(
    "ITEM_INFO_VIEW"
  );
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentSlotPayload>();
  const [selectedAppointments, setSelectedAppointments] = useState<
    AppointmentSlotPayload[]
  >([]);
  const [selectedWholeModifierId, setSelectedWholeModifierId] =
    useState<string>("");
  const [selectedAddonModifierIds, setSelectedAddonModifierIds] = useState<
    string[]
  >([]);
  const [qty, setQty] = useState<number>(1);

  const isWholeUnit: boolean = wholeUnits.includes(storeItem.item.unit);

  const imageUrl =
    storeItem.item?.images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR;
  const itemName = storeItem.item.name;

  const wholeModifiers = storeItem.catalogueModifiers.filter(
    (item) => item.modifier.modType === "whole"
  );
  const addonModifiers = storeItem.catalogueModifiers.filter(
    (item) => item.modifier.modType === "addon"
  );

  // Reset appointment selection when view changes back to ITEM_INFO_VIEW or when qty changes
  useEffect(() => {
    if (view === "ITEM_INFO_VIEW") {
      setSelectedAppointment(undefined);
      setSelectedAppointments([]);
    }
  }, [view]);

  useEffect(() => {
    // Reset appointments if qty is reduced
    console.log("MODAL -> ", { selectedAppointments });

    if (selectedAppointments.length > qty) {
      setSelectedAppointments(selectedAppointments.slice(0, qty));
    }
  }, [qty, selectedAppointments]);

  const handleWholeModifierChange = (value: string) => {
    setSelectedWholeModifierId(value);
  };

  const handleAddonModifierChange = (modifierId: string, checked: boolean) => {
    setSelectedAddonModifierIds((prev) => {
      if (checked) {
        return [...prev, modifierId];
      } else {
        return prev.filter((id) => id !== modifierId);
      }
    });
  };

  const removeWholeModifier = () => {
    setSelectedWholeModifierId("");
  };

  const calculateTotalPrice = () => {
    let total = storeItem.price * Math.max(qty, 1);

    // Add whole modifier price
    if (selectedWholeModifierId) {
      const wholeModifier = wholeModifiers.find(
        (item) => item.modifier.objid.toString() === selectedWholeModifierId
      );
      if (wholeModifier) {
        total += wholeModifier.price;
      }
    }

    // Add addon modifiers prices
    selectedAddonModifierIds.forEach((id) => {
      const addonModifier = addonModifiers.find(
        (item) => item.modifier.objid.toString() === id
      );
      if (addonModifier) {
        total += addonModifier.price;
      }
    });

    return total;
  };

  const handleIncrement = () => {
    if (isWholeUnit) {
      setQty((prev) => prev + 1);
    } else {
      setQty((prev) => Math.round((prev + 0.1) * 100) / 100);
    }
  };

  const handleDecrement = () => {
    if (qty <= 1) return;
    if (isWholeUnit) {
      setQty((prev) => prev - 1);
    } else {
      setQty((prev) => Math.round((prev - 0.1) * 100) / 100);
    }
  };

  const handleAddToCart = async (
    mode: "NO_APPOINTMENT" | "APPOINTMENT_PER_ITEM" | "APPOINTMENT_PER_CART",
    appointments?: AppointmentSlotPayload[]
  ) => {
    if (qty < 1) {
      toast.error({
        message: "Please increase quantity.",
      });
    }

    const selectedAddonModifiers = addonModifiers.filter((item) =>
      selectedAddonModifierIds.includes(item.modifier.objid.toString())
    );

    const selectedWholeModifiers = selectedWholeModifierId
      ? wholeModifiers.filter(
          (item) => item.modifier.objid.toString() === selectedWholeModifierId
        )
      : [];

    if (mode === "APPOINTMENT_PER_ITEM" && appointments) {
      const itemLevelAppointments = appointments;
      addCartItem({
        itemId: storeItem.objid,
        itemLevelAppointments,
        price: storeItem.price,
        qty,
        storeItem,
        modifiers: {
          addon: selectedAddonModifiers,
          whole: selectedWholeModifiers,
        },
      });

      toast.success({
        message: "Item is added to cart.",
      });

      return;
    }

    const itemLevelAppointments = mode !== "APPOINTMENT_PER_ITEM" ? [] : [];

    addCartItem({
      itemId: storeItem.objid,
      itemLevelAppointments,
      price: storeItem.price,
      qty,
      storeItem,
      modifiers: {
        addon: selectedAddonModifiers,
        whole: selectedWholeModifiers,
      },
    });

    toast.success({
      message: "Item is added to cart.",
    });
  };

  const renderModalActions = () => {
    if (!bookingEnabled || appointmentType === null) {
      return <NoAppointment onAddToCart={handleAddToCart} />;
    } else if (appointmentType === "APPOINTMENT_PER_CART") {
      return <AppointmentPerCart onAddToCart={handleAddToCart} />;
    } else if (appointmentType === "APPOINTMENT_PER_ITEM") {
      return (
        <AppointmentPerItem
          onAddToCart={handleAddToCart}
          itemId={storeItem.objid}
          setCurrentView={setView}
          currentView={view}
          selectedAppointment={selectedAppointment}
          qty={qty}
          selectedAppointments={selectedAppointments}
          setSelectedAppointments={setSelectedAppointments}
        />
      );
    }

    return null;
  };

  const adjustSlotAvailability = (
    slots: AppointmentSlot[],
    selectedDate: Date
  ) => {
    const selectedDateStr = selectedDate.toISOString().split("T")[0];

    // Count how many times each slot is already selected for this date
    const slotUsageCount: { [key: string]: number } = {};

    selectedAppointments.forEach((appointment) => {
      const appointmentDate = Object.keys(appointment)[0];
      if (appointmentDate === selectedDateStr) {
        const slotData = appointment[appointmentDate];
        const slotKey = `${slotData.startTime}-${slotData.endTime}`;
        slotUsageCount[slotKey] = (slotUsageCount[slotKey] || 0) + 1;
      }
    });

    // Adjust slot availability
    return slots.map((slot) => {
      const slotKey = `${slot.startTime}-${slot.endTime}`;
      const usedCount = slotUsageCount[slotKey] || 0;
      return {
        ...slot,
        availableAppointments: Math.max(
          0,
          slot.availableAppointments - usedCount
        ),
      };
    });
  };

  const renderView = () => {
    switch (view) {
      case "ITEM_INFO_VIEW":
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-6">
              <div className="px-4">
                <ItemCard
                  currencySymbol="$"
                  imgUrl={imageUrl}
                  name={itemName}
                  price={storeItem.price}
                />
              </div>
              <ModifierSection
                modifiers={storeItem.catalogueModifiers}
                selectedWholeModifierId={selectedWholeModifierId}
                selectedAddonModifierIds={selectedAddonModifierIds}
                onWholeModifierChange={handleWholeModifierChange}
                onAddonModifierChange={handleAddonModifierChange}
                onRemoveWholeModifier={removeWholeModifier}
              />
            </div>
            <div className="px-4">
              <Textarea
                placeholder="Instructions: spice level, order for, include, exclude"
                className="no-focus placeholder min-h-20 !rounded-10 border border-secondary-20 text-black-70 shadow-none"
              />
            </div>
            <div className="flex-between px-4 pb-4 text-black-80">
              <div className="title-6">
                Total: ${parseAmount(calculateTotalPrice())}
              </div>
              <StoreQtySelector
                qty={qty}
                setQty={setQty}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            </div>
          </div>
        );
      case "APPOINTMENT_VIEW":
        return (
          <div className="flex flex-col gap-4">
            <div className="heading-6 flex items-center gap-2 px-4 text-primary">
              <ArrowLeft
                size={20}
                className="cursor-pointer"
                onClick={() => setView("ITEM_INFO_VIEW")}
              />{" "}
              Booking For: {bizName}
            </div>
            <SlotBooking
              objId={1}
              showHeader={false}
              title=""
              defaultLocationId={`${locationId}`}
              hideActions
              key={selectedAppointments.length} // This will re-render the component when appointments change
              onSlotSelect={(appointment) => {
                if (appointment) {
                  setSelectedAppointment(appointment);
                }
              }}
              slotAvailabilityAdjuster={adjustSlotAvailability}
              compactCalender
              className="rounded-none border-x-0 border-b-0"
              slotContainerClassName="grid sm:grid-cols-2"
              timeSlotClassName="w-full xs:w-full sm:w-full md:w-full lg-w-full xl:w-full"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={<div>Add To Cart</div>}
      trigger={trigger}
      closeOnOutsideClick={false}
      bodyClassName="!p-0"
    >
      <div className="no-scrollbar flex max-h-[80vh] flex-col overflow-y-scroll">
        <ItemInfoSection
          imgUrl={imageUrl}
          name={itemName}
          desc={storeItem.item.description}
          price={storeItem.price}
          unit={storeItem.item.unit}
          onlyImage={view === "APPOINTMENT_VIEW"}
        />
        {renderView()}
      </div>
      {renderModalActions()}
    </Modal>
  );
};

export default AddToCartModal;
