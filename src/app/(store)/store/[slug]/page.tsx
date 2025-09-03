import React from "react";

import { onGetStore, onGetStoreLocations } from "@/actions/store.action";
import BusinessRatingsAndReviews from "@/components/global/rating-and-reviews/business/business-ratings-and-reviews";
import RatingAndReviewModal from "@/components/global/rating-and-reviews/business/rating-and-review-modal";
import ASSETS from "@/constants/assets";
import { RouteParams } from "@/types/global";

import DefaultDataFiller from "./[biz]/[store]/[category]/_components/helpers/default-data-filler";
import BannerImageSection from "./_components/sections/banner-image-section";
import CategorySection from "./_components/sections/category-section";
import StoreDetailsSection from "./_components/sections/store-details-section";
import StoreLocationsModal from "./_components/store-locations-modal";

const Store = async ({ searchParams, params }: RouteParams) => {
  const { slug: catalogueUrl } = (await params) as { slug: string };
  const {
    location: locationId,
    query = "",
    sortBy = "RATING",
    orderBy = "DESC",
    page = 1,
  } = await searchParams;

  if (!locationId) {
    const { success, data } = await onGetStoreLocations({
      params: {
        storeUrl: catalogueUrl,
      },
    });

    if (!success || !data) return null;

    return <StoreLocationsModal locations={data.locations} />;
  }

  const { success, data: store } = await onGetStore({
    params: {
      locationId: Number(locationId || -1),
    },
  });

  if (!success || !store) return;

  const parentLocation = store.parentLocation;
  const bannerImage =
    store.catalogue.images?.[0]?.img_url || ASSETS.IMAGES.PLACEHOLDER.FYNDR;

  const { bizid, mainLogo, bizName, website } = store.biz;

  return (
    <>
      <main className="my-10 flex flex-col items-center justify-center p-4">
        <BannerImageSection
          imgURL={bannerImage}
          alt={bizName}
          className="mb-4 w-full sm:hidden"
        />
        <div className="flex w-full max-w-[1550px] flex-col gap-4 sm:flex-row xl:w-11/12">
          <StoreDetailsSection
            bizId={bizid}
            businessLogo={mainLogo}
            businessName={bizName}
            parentLocation={parentLocation}
            website={website}
            locationId={locationId ? Number(locationId) : null}
          />
          <div className="flex w-full flex-col gap-4">
            <BannerImageSection
              imgURL={bannerImage}
              alt={bizName}
              className="hidden sm:flex"
            />
            <CategorySection
              categories={store.categories}
              bizId={bizid}
              storeId={store.catalogue.objid}
              locId={Number(locationId)}
              storeUrl={catalogueUrl}
              query={query}
            />
          </div>
        </div>
      </main>
      <RatingAndReviewModal>
        <BusinessRatingsAndReviews
          business={store.biz}
          qrCode={store.parentLocation.qrid.toString()}
          orderBy={orderBy as "ASC" | "DESC"}
          sortBy={sortBy as "RATING" | "CREATED_DT"}
          page={page !== undefined ? Number(page) : page}
          showSeeAllComments={false}
          className="p-0"
          enableCommentPagination={true}
          showHeading={false}
        />
      </RatingAndReviewModal>
      <DefaultDataFiller
        bizId={store.biz.bizid}
        storeId={store.catalogue.objid}
        locationId={Number(locationId)}
        storeUrl={store.catalogue.url}
        bizName={store.biz.bizName}
        storeName={store.catalogue.name}
        appointmentType={store.catalogueAppointmentType}
        country={store.parentLocation.country}
        postalCode={store.parentLocation.postalCode}
      />
    </>
  );
};

export default Store;
