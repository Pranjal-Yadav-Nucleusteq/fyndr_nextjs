"use client";

import { CircleMinus, CirclePlus } from "lucide-react";
import React from "react";

// import { Input } from "@/components/ui/input";

type Props = {
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  setQty: (newQty: number) => void;
  min?: number;
  step?: number;
};

const StoreCartQtySelector = ({
  qty,
  // setQty,
  onDecrement,
  onIncrement,
  // min = 1,
  step = 1,
}: Props) => {
  // const handleQtyChange = (rawValue: string) => {
  //   let newValue = Number(rawValue);

  //   // Prevent decimals if step = 1
  //   if (step === 1) {
  //     newValue = Math.floor(newValue); // force integer
  //   }

  //   if (!isNaN(newValue)) {
  //     setQty(Math.max(newValue, min));
  //   }
  // };

  // Format display value based on step
  const formatDisplayValue = (value: number) => {
    return step === 1 ? value.toString() : value.toFixed(1);
  };

  return (
    <div className="flex-center relative gap-2">
      <CircleMinus
        onClick={onDecrement}
        className="size-5 cursor-pointer text-black-heading"
      />

      {/* <Input
        type="number"
        min={min}
        step={step}
        value={formatDisplayValue(qty)}
        onChange={(e) => handleQtyChange(e.target.value)}
        onKeyDown={(e) => {
          if (step === 1 && e.key === ".") {
            e.preventDefault();
          }
        }}
        className="hide-input-arrow no-focus placeholder body-1 h-[33px] w-[52px] border-y border-secondary-20 bg-white text-black-70 shadow-none"
      /> */}

      <div className="flex-center no-focus placeholder body-1 h-[33px] w-[52px] rounded-5 border border-secondary-20 bg-white text-black-70 shadow-none">
        {formatDisplayValue(qty)}
      </div>

      <CirclePlus
        onClick={onIncrement}
        className="size-5 cursor-pointer text-black-heading"
      />
    </div>
  );
};

export default StoreCartQtySelector;
