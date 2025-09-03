"use client";

import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { DiscountType } from "@/types/global";
import { TipConfig } from "@/types/zustand/store-cart-store.types";

const TIPS = [
  {
    value: "10",
    label: "10%",
  },
  {
    value: "15",
    label: "15%",
  },
  {
    value: "20",
    label: "20%",
  },
];

type Props = {
  onSelect: (value: number, type: DiscountType) => void;
  tipConfig: TipConfig;
};

const TipSelector = ({ onSelect, tipConfig }: Props) => {
  const [selectedTip, setSelectedTip] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  // Sync with tipConfig from store
  useEffect(() => {
    if (tipConfig) {
      if (tipConfig.type === "%") {
        setSelectedTip(tipConfig.value.toString());
        setInputValue("");
      } else {
        setSelectedTip("");
        setInputValue(tipConfig.value.toString());
      }
    } else {
      setSelectedTip("");
      setInputValue("");
    }
  }, [tipConfig]);

  const handleTipChange = (tip: string, type: "input" | "radio") => {
    if (type === "radio") {
      setSelectedTip(tip);
      setInputValue("");
      onSelect(Number(tip), "%");
    } else {
      const value = Math.max(0, Number(tip)).toString();
      setInputValue(value);
      setSelectedTip("");
      onSelect(Number(value), "flat");
    }
  };

  return (
    <div className="flex rounded-5 border border-secondary-20">
      <RadioGroup
        value={selectedTip}
        onValueChange={(value) => handleTipChange(value, "radio")}
        className="flex gap-px rounded-5 bg-secondary-20"
      >
        {TIPS.map((tip, i) => {
          const isSelected = selectedTip === tip.value;
          return (
            <div key={tip.value} className={`relative`}>
              <Label htmlFor={tip.value} className={cn()}>
                <div
                  className={`flex-center body-1 h-[40px] w-[78px] cursor-pointer ${i === 0 ? "rounded-l-[4px]" : ""} ${isSelected ? "bg-primary text-white" : "bg-white"}`}
                >
                  {tip.label}
                </div>
                <RadioGroupItem
                  value={tip.value}
                  id={tip.value}
                  className="sr-only"
                />
              </Label>
            </div>
          );
        })}
        <div
          className="flex-center body-1 cursor-pointer !rounded-r-[4px] bg-white px-2 text-black-70"
          onClick={() => {
            setSelectedTip("");
          }}
        >
          $
          <Input
            value={inputValue}
            type="number"
            onChange={(e) => handleTipChange(e.target.value, "input")}
            onFocus={() => setSelectedTip("")}
            className="no-focus body-1 hide-input-arrow h-[40px] max-w-16 rounded-[4px] border-none bg-white px-1 py-[10px] font-normal shadow-none outline-none placeholder:border-none disabled:bg-black-0.5"
          />
        </div>
      </RadioGroup>
    </div>
  );
};

export default TipSelector;
