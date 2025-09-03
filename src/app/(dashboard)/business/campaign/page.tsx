import React, { Suspense } from "react";

import ContainerWrapper from "@/components/global/container-wrapper";

import CampaignSection from "./_components/sections/campaign-section";
import CampaignsSkeleton from "./_components/skeleton/campaign-skeleton";

const CampaignCenter = async () => {
  return (
    <ContainerWrapper title="Campaign Center">
      <Suspense fallback={<CampaignsSkeleton campaignCount={6} />}>
        <CampaignSection />
      </Suspense>
    </ContainerWrapper>
  );
};

export default CampaignCenter;
