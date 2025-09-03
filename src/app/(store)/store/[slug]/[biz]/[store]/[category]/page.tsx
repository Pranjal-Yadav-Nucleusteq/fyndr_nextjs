import { notFound } from "next/navigation";
import React from "react";

import { onGetStore, onGetStoreDetails } from "@/actions/store.action";
import ASSETS from "@/constants/assets";
import { RouteParams } from "@/types/global";

import DefaultDataFiller from "./_components/helpers/default-data-filler";
import BannerSection from "./_components/sections/banner-section";
import StoreItemSection from "./_components/sections/store-item-section";

const extractIdFromSlug = (slug: string): number | null => {
  if (!slug || typeof slug !== "string") return null;

  const parts = slug.split("-");
  const lastPart = parts[parts.length - 1];

  // Validate that the last part is a valid ID (numeric IDs)
  return /^\d+$/.test(lastPart) ? Number(lastPart) : null;
};

const extractRouteIds = (params: {
  biz: string;
  store: string;
  category: string;
}) => {
  const bizId = extractIdFromSlug(params.biz);
  const storeId = extractIdFromSlug(params.store);
  const categoryId = extractIdFromSlug(params.category);

  if (!bizId || !storeId || !categoryId) {
    return notFound();
  }

  return { bizId, storeId, categoryId };
};

const StoreDetails = async ({ searchParams, params }: RouteParams) => {
  const routeParams = (await params) as {
    biz: string;
    store: string;
    category: string;
  };
  const { location: locationId, query = "" } = await searchParams;

  const { bizId, storeId, categoryId } = extractRouteIds(routeParams);
  if (!locationId) return notFound();

  const [storeDetailsAPIData, storeAPIata] = await Promise.all([
    onGetStoreDetails({
      params: {
        bizId,
        catalogueId: storeId,
        categoryId,
      },
    }),
    onGetStore({
      params: {
        locationId: Number(locationId),
      },
    }),
  ]);

  const { success, data: store } = storeDetailsAPIData;
  const { success: storeSuccess, data: storeData } = storeAPIata;

  if (!success || !store) return null;
  if (!storeSuccess || !storeData) return null;

  const bannerImage =
    store.images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR;

  const storeAppointmentType = storeData.catalogueAppointmentType;
  const storeBookingEnabled = storeData.catalogBookingEnabled;
  const country = storeData.parentLocation.country;
  const postalCode = storeData.parentLocation.postalCode;

  return (
    <main className="my-10 flex flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-[1550px] flex-col gap-4 xl:w-11/12">
        <BannerSection
          imgURL={bannerImage}
          alt={store.name}
          locationId={Number(locationId)}
          storeUrl={store.url}
          bizId={bizId}
          catalogueId={store.objid}
          categoryId={categoryId}
          storeName={store.name}
        />
        <StoreItemSection
          businessName={store.name}
          storeItems={store.catalogueItems}
          bizId={bizId}
          categoryId={categoryId}
          locationId={Number(locationId)}
          storeId={store.objid}
          storeUrl={store.url}
          query={query}
          appointmentType={storeAppointmentType}
          bookingEnabled={storeBookingEnabled}
          country={country}
          postalCode={postalCode}
        />
      </div>
      <DefaultDataFiller
        bizId={bizId}
        storeId={storeId}
        locationId={Number(locationId)}
        storeUrl={storeData.catalogue.url}
        bizName={storeData.biz.bizName}
        storeName={storeData.catalogue.name}
        appointmentType={storeData.catalogueAppointmentType}
        country={storeData.parentLocation.country}
        postalCode={storeData.parentLocation.postalCode}
      />
    </main>
  );
};

export default StoreDetails;
