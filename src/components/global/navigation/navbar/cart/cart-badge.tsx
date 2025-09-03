import React from "react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  count?: number;
};

const CartBadge = ({ className, count }: Props) => {
  if (!count || count <= 0) {
    return null;
  }

  return (
    <span
      className={cn(
        "flex size-5 flex-center text-white rounded-full bg-red-500 body-5 border border-white",
        className
      )}
    >
      {count}
    </span>
  );
};

export default CartBadge;
