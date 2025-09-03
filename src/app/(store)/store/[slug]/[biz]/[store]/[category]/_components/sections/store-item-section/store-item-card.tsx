import Image from "next/image";
import React from "react";

import Button from "@/components/global/buttons";
import ASSETS from "@/constants/assets";
import { parseAmount } from "@/lib/utils/parser";
import { GetStoreResponse } from "@/types/store/store.response";
import { StoreItem } from "@/types/store/store.types";

import AddToCartModal from "./add-to-cart-modal";

type Props = {
  storeItem: StoreItem;
  appointmentType: GetStoreResponse["catalogueAppointmentType"];
  bookingEnabled: GetStoreResponse["catalogBookingEnabled"];
  country: string;
  postalCode: string;
};

const StoreItemCard = ({
  storeItem,
  appointmentType,
  bookingEnabled,
  country,
  postalCode,
}: Props) => {
  const imageUrl =
    storeItem.item?.images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR;
  const title = storeItem.item.name;
  const price = storeItem.price;

  return (
    <div className="relative h-fit">
      <Image
        src={imageUrl}
        alt={title}
        width={350}
        height={300}
        className="aspect-[5/3] w-full rounded-10 object-cover"
      />
      <div className="flex-between body-1 lg:heading-7 absolute bottom-0 w-full rounded-b-10 bg-black/80 p-4 text-white">
        <div className="flex flex-col gap-1">
          <h3>{title}</h3>
          <div>${parseAmount(price)}</div>
        </div>

        <AddToCartModal
          trigger={
            <Button variant="primary" stdHeight stdWidth>
              Add
            </Button>
          }
          storeItem={storeItem}
          appointmentType={appointmentType}
          bookingEnabled={bookingEnabled}
          country={country}
          postalCode={postalCode}
        />
      </div>
    </div>
  );
};

export default StoreItemCard;
