"use client";

import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ASSETS from "@/constants/assets";
import { CatalogueModifier } from "@/types/store/store.types";

import ItemCard from "./item-card";

type Props = {
  modifiers: CatalogueModifier[];
  selectedWholeModifierId: string;
  selectedAddonModifierIds: string[];
  onWholeModifierChange: (value: string) => void;
  onAddonModifierChange: (modifierId: string, checked: boolean) => void;
  onRemoveWholeModifier: () => void;
};

const ModifierSection = ({
  modifiers,
  selectedWholeModifierId,
  selectedAddonModifierIds,
  onWholeModifierChange,
  onAddonModifierChange,
  onRemoveWholeModifier,
}: Props) => {
  const wholeModifiers = modifiers.filter(
    (item) => item.modifier.modType === "whole"
  );
  const addonModifiers = modifiers.filter(
    (item) => item.modifier.modType === "addon"
  );

  return (
    <div className="flex flex-col gap-6">
      {wholeModifiers.length > 0 && (
        <div className="border-t border-secondary-20 px-4">
          <div className="flex-between text-secondary">
            <div className="body-1-medium py-5">Whole</div>
            {selectedWholeModifierId && (
              <div
                className="body-1 cursor-pointer underline"
                onClick={onRemoveWholeModifier}
              >
                Remove
              </div>
            )}
          </div>
          <RadioGroup
            className="flex flex-col gap-2"
            value={selectedWholeModifierId}
            onValueChange={onWholeModifierChange}
          >
            {wholeModifiers.map((item) => {
              const modifierImgUrl =
                item.modifier?.images?.[0]?.img_url ||
                ASSETS.IMAGES.PLACEHOLDER.FYNDR;

              const isSelected =
                selectedWholeModifierId === item.modifier.objid.toString();
              return (
                <div
                  key={item.objid}
                  className="relative flex w-full items-center"
                >
                  <ItemCard
                    currencySymbol="$"
                    imgUrl={modifierImgUrl}
                    name={item.modifier.modName}
                    price={item.price}
                  />
                  <RadioGroupItem
                    value={item.modifier.objid.toString()}
                    className={`absolute right-5 shadow-none ${isSelected ? "border-primary" : "border-black-80"}`}
                  />
                </div>
              );
            })}
          </RadioGroup>
        </div>
      )}
      {addonModifiers.length > 0 && (
        <div className="border-t border-secondary-20 px-4">
          <div className="body-1-medium py-5 text-secondary">Add-ons</div>
          <div className="flex flex-col gap-2">
            {addonModifiers.map((item) => {
              const modifierImgUrl =
                item.modifier?.images?.[0]?.img_url ||
                ASSETS.IMAGES.PLACEHOLDER.FYNDR;

              const isSelected = selectedAddonModifierIds.includes(
                item.modifier.objid.toString()
              );
              return (
                <div
                  key={item.objid}
                  className="relative flex w-full items-center"
                >
                  <ItemCard
                    currencySymbol="$"
                    imgUrl={modifierImgUrl}
                    name={item.modifier.modName}
                    price={item.price}
                  />
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      onAddonModifierChange(
                        item.modifier.objid.toString(),
                        checked as boolean
                      )
                    }
                    className="absolute right-5 border-black-80 shadow-none data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifierSection;
