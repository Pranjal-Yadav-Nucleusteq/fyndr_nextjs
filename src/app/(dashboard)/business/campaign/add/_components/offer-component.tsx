"use client";
import { PencilLine, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import OfferForm, {
  OfferFormValues,
} from "@/components/forms/business/campaign/offer-form";
import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import { Modal } from "@/components/global/modal";
import ASSETS from "@/constants/assets";
import { useCampaignStore } from "@/zustand/stores/campaign.store";

const OfferComponent = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { campaignPayload } = useCampaignStore();
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  console.log("payyyyy", campaignPayload);

  return (
    <>
      <DefaultCard className="m-4 min-h-[400px] w-full max-w-[80%] flex-col  border border-black-20  bg-white p-[16px]">
        <div className="flex flex-1 justify-end">
          <Button variant="primary" onClick={handleModalOpen}>
            Create Offer
            <Plus className="text-white" />
          </Button>
        </div>
        {Array.isArray(campaignPayload?.offers) &&
        campaignPayload.offers.length > 0 ? (
          campaignPayload?.offers.map(
            (item: OfferFormValues, index: number) => (
              <DefaultCard
                className="mt-3 flex h-[130px] w-full max-w-full border border-black-20 bg-white  p-2 py-3"
                key={index}
              >
                <div className="flex-center h-full">
                  <Image
                    src={ASSETS.IMAGES.PLACEHOLDER.FYNDR}
                    alt="Preview"
                    className="size-4/5 rounded-lg object-cover"
                    width={0}
                    height={0}
                  />
                </div>
                <div className="grid flex-1 grid-cols-3 grid-rows-3 gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    {item.title}
                  </span>
                  <span className="text-sm text-black-70">
                    Sold Offer:{item.offerSold || 0}
                  </span>
                  <span className="text-sm text-black-70">
                    Remaining Offer:Unlimted
                  </span>

                  <span className="text-base text-primary">
                    {item.currencySymbol}
                    {item.offerPrice}
                  </span>
                  <span className="text-sm text-black-70">
                    Discount:{item.amount}
                    {item.discountType} OFF
                  </span>
                  <span className="text-sm text-black-70">
                    Per User Limit:
                    {item.usageLimit === -1 || item.usageLimit === null
                      ? "Unlimited"
                      : item.usageLimit}
                  </span>

                  <span className="text-sm text-black-70  line-through">
                    {item.currencySymbol}
                    {item.retailPrice}
                  </span>
                  <span className="text-sm text-black-70">
                    Repurchase Period:{item.repurchasePeriod}
                  </span>
                  <span className="text-sm text-black-70">
                    Offer Limit:{" "}
                    {item.offerLimit === null ? "Unlimited" : item.offerLimit}
                  </span>
                </div>
                <div className="ml-4 flex flex-col justify-between">
                  <Button
                    variant="primary-outlined"
                    className="mb-2 px-2 py-[6px] font-roboto text-xs"
                  >
                    {item.amount}
                    {item.discountType} Off
                  </Button>
                  <Button variant="primary">
                    Edit
                    <PencilLine className="text-white" />
                  </Button>
                </div>
              </DefaultCard>
            )
          )
        ) : (
          <p className="text-sm text-gray-500">No offers available.</p>
        )}
      </DefaultCard>

      <Modal
        title={"Create Offer"}
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) handleModalClose();
        }}
        closeOnOutsideClick={false}
        width="840px"
      >
        <OfferForm handleModalClose={handleModalClose} />
      </Modal>
    </>
  );
};

export default OfferComponent;
