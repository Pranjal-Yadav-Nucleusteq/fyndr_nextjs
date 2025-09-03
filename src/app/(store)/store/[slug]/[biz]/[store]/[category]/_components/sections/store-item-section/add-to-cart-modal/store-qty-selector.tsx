"use client";

import { Minus, Plus } from "lucide-react";
import React from "react";

import Button from "@/components/global/buttons";
import { Input } from "@/components/ui/input";

type Props = {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  setQty: (newQty: number) => void;
  min?: number;
};

const StoreQtySelector = ({
  qty,
  setQty,
  onDecrement,
  onIncrement,
  min = 1,
}: Props) => {
  const handleQtyChange = (newQty: number) => {
    setQty(Math.max(newQty, min));
  };

  return (
    <div className="relative flex">
      <Button
        variant="primary"
        onClick={onDecrement}
        disabled={qty <= 1}
        className="size-11 !rounded-r-none"
      >
        <div className="rounded-full border-2 border-white p-1">
          <Minus size={18} className="" />
        </div>
      </Button>
      <Input
        type="number"
        min={min}
        value={qty}
        onChange={(e) => handleQtyChange(Number(e.target.value))}
        className="hide-input-arrow no-focus placeholder body-1 h-11 w-[70px] rounded-none border-y border-secondary-20 text-black-70 shadow-none"
      />
      <Button
        variant="primary"
        onClick={onIncrement}
        className="relative size-11 !rounded-l-none"
      >
        <div className="rounded-full border-2 border-white p-1">
          <Plus size={18} />
        </div>
      </Button>
    </div>
  );
};

export default StoreQtySelector;
