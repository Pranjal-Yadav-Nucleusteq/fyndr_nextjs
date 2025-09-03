import { CampaignIndicatorsSkeleton } from "./campaign-indicator-skeleton";
import { CampaignListSkeleton } from "./campaign-list-skeleton";

const CampaignsSkeleton = ({
  campaignCount = 5,
}: {
  campaignCount?: number;
}) => {
  return (
    <div className="border border-gray-200 p-4">
      <CampaignIndicatorsSkeleton />
      <div className="mt-1">
        <CampaignListSkeleton count={campaignCount} />
      </div>
    </div>
  );
};

export default CampaignsSkeleton;
