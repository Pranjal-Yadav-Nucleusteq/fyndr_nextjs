import React, { Suspense } from "react";

import { onGetBusinessCampaigns } from "@/actions/campaign.action";
import { auth } from "@/auth";

import Campaigns from "..";
import CampaignsSkeleton from "../skeleton/campaign-skeleton";

const CampaignSection = async () => {
  const session = await auth();
  const bizid = session?.user?.bizid;
  if (!bizid) return null;

  const { success, data } = await onGetBusinessCampaigns({ params: { bizid } });
  if (!success || !data) return null;

  return (
    <>
      <Suspense fallback={<CampaignsSkeleton />}>
        <Campaigns campaigns={data.campaigns} />
      </Suspense>
    </>
  );
};

export default CampaignSection;
