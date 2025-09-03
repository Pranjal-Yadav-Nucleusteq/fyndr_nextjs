import React from "react";

import DefaultCard from "@/components/global/cards/default-card";
import LocalSearch from "@/components/global/search/local-search";
import ROUTES from "@/constants/routes";
import {
  GetStoreDetailsResponse,
  GetStoreResponse,
} from "@/types/store/store.response";

import StoreItemCard from "./store-item-card";

type Props = {
  businessName: string;
  storeItems: GetStoreDetailsResponse["catalogueItems"];
  storeUrl: string;
  bizId: number;
  storeId: number;
  categoryId: number;
  locationId: number;
  query: string;
  appointmentType: GetStoreResponse["catalogueAppointmentType"];
  bookingEnabled: GetStoreResponse["catalogBookingEnabled"];
  country: string;
  postalCode: string;
};

const StoreItemSection = ({
  businessName,
  storeItems,
  bizId,
  categoryId,
  storeId,
  storeUrl,
  query,
  appointmentType,
  bookingEnabled,
  country,
  postalCode,
}: Props) => {
  const filteredItems = storeItems.filter((item) => {
    if (!query || query.trim() === "") {
      return true;
    }

    const searchTerm = query.toLowerCase().trim();
    const nameMatch = item.item.name.toLowerCase().includes(searchTerm);
    const descriptionMatch = item.item.description
      ? item.item.description.toLowerCase().includes(searchTerm)
      : false;

    return nameMatch || descriptionMatch;
  });

  return (
    <DefaultCard className="p-0">
      <div className="heading-6-medium border-b border-secondary-20 p-4 text-secondary">
        Order at {businessName}
      </div>
      <div className="flex flex-col gap-4 p-4">
        <LocalSearch
          route={ROUTES.STORE_ITEMS({
            bizId,
            storeId,
            categoryId,
            storeUrl,
          })}
          placeholder="Search store item"
        />
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((storeItem) => (
              <StoreItemCard
                key={storeItem.objid}
                storeItem={storeItem}
                appointmentType={appointmentType}
                bookingEnabled={bookingEnabled}
                country={country}
                postalCode={postalCode}
              />
            ))}
          </div>
        ) : (
          <div className="flex-center w-full py-4">
            <p className="text-black-70">No items found</p>
          </div>
        )}
      </div>
    </DefaultCard>
  );
};

export default StoreItemSection;
