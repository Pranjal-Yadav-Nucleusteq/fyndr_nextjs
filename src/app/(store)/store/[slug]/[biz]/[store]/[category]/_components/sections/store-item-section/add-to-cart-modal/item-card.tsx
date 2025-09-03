import Image from "next/image";

import { cn } from "@/lib/utils";
import { parseAmount } from "@/lib/utils/parser";
import { CurrencySymbol } from "@/types/global";

type ItemCardProps = {
  imgUrl: string;
  name: string;
  price: number;
  currencySymbol: CurrencySymbol;
  className?: string;
};

const ItemCard = ({
  imgUrl,
  name,
  currencySymbol,
  price,
  className,
}: ItemCardProps) => {
  return (
    <div
      className={cn(
        "flex-between w-full flex-row gap-4 rounded-10 border border-secondary-20 bg-primary-10 px-5 py-4 text-black-80",
        className
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <Image
          src={imgUrl}
          alt={name}
          height={60}
          width={60}
          className="size-[60px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <div className="body-2">{name}</div>
          <div className="body-2-bold">
            {currencySymbol}
            {parseAmount(price)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemCard;
