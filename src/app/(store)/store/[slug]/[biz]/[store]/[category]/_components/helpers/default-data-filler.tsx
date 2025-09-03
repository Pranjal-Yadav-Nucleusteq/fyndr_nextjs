/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";

import { GetStoreResponse } from "@/types/store/store.response";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";

type Props = {
  bizId: number;
  storeId: number;
  locationId: number;
  storeUrl: string;
  bizName: string;
  storeName: string;
  appointmentType: GetStoreResponse["catalogueAppointmentType"];
  country: string;
  postalCode: string;
};

const DefaultDataFiller = ({
  bizId,
  bizName,
  locationId,
  storeId,
  storeName,
  storeUrl,
  appointmentType,
  country,
  postalCode,
}: Props) => {
  const {
    setCartData,
    setShowCartItemsDeleteButton,
    clearCart,
    bizId: currentBizId,
    locationId: currentLocationId,
  } = useStoreCartStore();

  React.useEffect(() => {
    // Check if we're switching to a different business or location
    const isDifferentBusiness = currentBizId !== null && currentBizId !== bizId;
    const isDifferentLocation =
      currentLocationId !== null && currentLocationId !== locationId;

    // Clear cart if switching businesses or locations
    if (isDifferentBusiness || isDifferentLocation) {
      // if (isDifferentBusiness) {
      clearCart();
    }

    // Set the new cart data
    setCartData({
      bizId,
      bizName,
      locationId,
      storeId,
      storeName,
      storeUrl,
      appointmentType,
      country,
      postalCode,
    });

    setShowCartItemsDeleteButton(false);
  }, [
    bizId,
    bizName,
    locationId,
    storeId,
    storeName,
    storeUrl,
    appointmentType,
    country,
    postalCode,
    currentBizId,
    currentLocationId,
  ]);

  return null;
};

export default DefaultDataFiller;
