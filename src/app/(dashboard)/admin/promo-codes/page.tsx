import React from "react";

import { getActivePromos, getExpiredPromos } from "@/actions/admin.actions";
import ContainerWrapper from "@/components/global/container-wrapper";
import LocalSearch from "@/components/global/search/local-search";
import { RouteParams } from "@/types/global";

import ActiveBar from "./_components/active-bar";
import Expiredpromos from "./_components/expiredpromos";

const PromoCodes = async ({
  searchParams,
}: Pick<RouteParams, "searchParams">) => {
  const params = await searchParams;
  const search = params?.query || "";

  const { data: activeData } = await getActivePromos({
    search,
  });
  const { data: expiredData } = await getExpiredPromos({
    search,
    pgStart: 1,
    pgSize: 10,
  });

  return (
    <ContainerWrapper title="Promo codes">
      <div className="flex justify-between">
        <span className="py-4 text-lg font-medium">Active Promo Codes</span>
        <div>
          <LocalSearch placeholder="Search" route="/admin/promo-codes" />
        </div>
      </div>

      <div className="relative w-full">
        <ActiveBar data={activeData} />
      </div>

      <div className="mt-4 pl-4">
        <p className="text-lg font-medium">Historyy</p>
        <Expiredpromos data={expiredData?.promocodesList} />
      </div>
    </ContainerWrapper>
  );
};

export default PromoCodes;
