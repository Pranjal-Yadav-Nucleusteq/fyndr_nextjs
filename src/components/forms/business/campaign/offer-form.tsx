import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";
import { useCampaignStore } from "@/zustand/stores/campaign.store";

import OfferActionsButton from "./offer-actions-button";
import OfferBasicDetails from "./offer-basic-detail";
import OfferPricingDetails from "./offer-pricing-detail";
import { OfferSchema } from "./schema";

export type OfferFormValues = z.infer<typeof OfferSchema>;
const defaultValues: OfferFormValues = {
  title: "",
  amount: 0,
  discountType: "%",
  retailPrice: 0,
  offerPrice: 0,
  offersAvailable: null,
  offerLimit: 0,
  currency: "USD",
  currencySymbol: "$",
  status: "active",
  isNew: true,
  offerType: "offers",
  usageLimit: 0,
  validityPeriod: "CMPN",
  stdTax: false,
  taxPercent: 0,
  isBookingEnabled: true,
  displayOrder: 1,
  repurchasePeriod: 0,
  voucherFile: null,
  voucherFileName: null,
  isVoucher: null,
  couponCode: null,
  offerSold: 0,
};

type Props = {
  handleModalClose: () => void;
};

const OfferForm = ({ handleModalClose }: Props) => {
  const { updateCampaignPayload } = useCampaignStore();
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);

  const handleFileUpload = (files: ProcessedFileProps[]) => {
    setUploadedFiles(files);
  };
  const form = useForm<OfferFormValues>({
    resolver: zodResolver(OfferSchema),
    defaultValues,
  });

  const onSubmit = (data: OfferFormValues) => {
    console.log("Submitted Offer:", data);
    const currentOffers =
      useCampaignStore.getState().campaignPayload?.offers || [];
    updateCampaignPayload("offers", [...currentOffers, data]);
    handleModalClose();
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 gap-6 p-2 md:grid-cols-2"
        >
          <OfferBasicDetails form={form} />
          <OfferPricingDetails form={form} />
          <OfferActionsButton
            form={form}
            handleFileUpload={handleFileUpload}
            handleModalClose={handleModalClose}
            uploadedFiles={uploadedFiles}
          />
        </form>
      </FormProvider>
    </>
  );
};

export default OfferForm;
