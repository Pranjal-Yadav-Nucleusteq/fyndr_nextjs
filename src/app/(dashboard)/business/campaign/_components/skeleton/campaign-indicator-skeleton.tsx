import { Skeleton } from "@/components/ui/skeleton";

const CampaignIndicatorsSkeleton = () => {
  return (
    <div className="flex h-6 flex-wrap gap-4 bg-white p-0">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="flex items-center space-x-2">
          <Skeleton className="size-2 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
};

export { CampaignIndicatorsSkeleton };
