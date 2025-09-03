import { Skeleton } from "@/components/ui/skeleton";

const CampaignItemSkeleton = () => {
  return (
    <div className="flex-between h-36 w-full gap-3 rounded-[9px] border border-secondary-20 bg-gradient-to-r from-gray-50 to-white p-2 shadow-md">
      {/* Image skeleton */}
      <div className="shrink-0">
        <Skeleton className="h-[120px] w-[200px] rounded" />
      </div>

      {/* Content skeleton */}
      <div className="flex w-[45%] flex-col justify-between gap-2">
        {/* Title and icons row */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-[18px] w-[33px]" />
          <Skeleton className="h-[30px] w-[70px]" />
        </div>

        {/* Grid info skeleton */}
        <div className="grid grid-cols-2 gap-y-1 text-[14px]">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      {/* Status icon skeleton */}
      <div className="flex w-[8%] items-center justify-center">
        <Skeleton className="h-10 w-16" />
      </div>

      {/* Actions skeleton */}
      <div className="flex-between w-[30%] flex-col gap-2">
        <Skeleton className="h-8 w-32" />

        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-8 w-36" />
        </div>
      </div>
    </div>
  );
};

const CampaignListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <CampaignItemSkeleton key={i} />
      ))}
    </div>
  );
};

export { CampaignListSkeleton, CampaignItemSkeleton };
