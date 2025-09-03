import Image from "next/image";
import React from "react";

import HtmlContent from "@/components/global/html-content";
import { cn } from "@/lib/utils";
import { parseAmount } from "@/lib/utils/parser";

type Props = {
  imgUrl: string;
  name: string;
  desc: string;
  price: number;
  unit: string;
  onlyImage?: boolean;
  className?: string;
};

const ItemInfoSection = ({
  desc,
  imgUrl,
  name,
  price,
  unit,
  onlyImage = false,
  className,
}: Props) => {
  return (
    <div className={cn("flex flex-col gap-2 p-4", className)}>
      <Image
        src={imgUrl}
        alt={name}
        width={350}
        height={300}
        className="aspect-[2/1] w-full rounded-10"
      />
      {!onlyImage && (
        <>
          <div className="body-1-medium md:title-6-medium mt-2 text-black-80">
            Please choose from any available Variation or Add on
          </div>
          <div className="flex flex-col gap-2">
            <div className="body-1 text-black-80">
              {name} - ${parseAmount(price)}/{unit}
            </div>
            <HtmlContent htmlString={desc} className="body-3 text-black-80" />
          </div>
        </>
      )}
    </div>
  );
};

export default ItemInfoSection;
