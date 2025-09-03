/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import Input from "@/components/global/input";
import Switch from "@/components/global/input/switch";
import toast from "@/components/global/toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { OfferFormValues } from "./offer-form";

type Props = {
  form: UseFormReturn<OfferFormValues>;
};

const OfferPricingDetails = ({ form }: Props) => {
  const [discountToggle, setDiscountToggle] = useState(
    form.getValues("discountType") === "flat"
  );
  const [offerLimitToggle, setOfferLimitToggle] = useState(true);
  const [perUserLimitToggle, setPerUserLimitToggle] = useState(true);
  const [taxToggle, setTaxToggle] = useState(false);
  const [repurchaseToggle, setRepurchaseToggle] = useState(true);
  const payload = form.watch();
  const calcOfferPrice = (
    rprice: number,
    amt: number | string,
    type: string
  ) => {
    const parsedAmt = parseFloat(amt as string);
    const oPrice =
      type === "%"
        ? Math.round(rprice * (1 - parsedAmt / 100) * 100) / 100
        : Math.round((rprice - parsedAmt) * 100) / 100;

    if (!isNaN(oPrice)) {
      form.setValue("offerPrice", oPrice);
    }
    if (oPrice < 0) {
      toast.error({ message: "Offer Price can't be Negative" });
    }
  };

  useEffect(() => {
    if (payload.retailPrice && payload.retailPrice > 0) {
      calcOfferPrice(
        payload.retailPrice,
        payload.amount,
        payload.discountType || "%"
      );
    } else {
      form.setValue("offerPrice", 0);
    }
  }, [payload.retailPrice, payload.amount, payload.discountType]);

  return (
    <>
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  label="Discount"
                  topRightNode={
                    <Switch
                      checkedTitle="Cash"
                      uncheckedTitle="Percent"
                      checked={discountToggle}
                      onCheckedChange={(checked) => {
                        setDiscountToggle(checked);
                        form.setValue("discountType", checked ? "flat" : "%");
                      }}
                    />
                  }
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="retailPrice"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input {...field} label="Retail Price" showRequired />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="offerLimit"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  label="Offers Limit"
                  showRequired
                  value={field.value ?? ""}
                  disabled={offerLimitToggle}
                  topRightNode={
                    <Switch
                      checkedTitle="Unlimited"
                      uncheckedTitle="limited"
                      checked={offerLimitToggle}
                      onCheckedChange={(checked) => {
                        setOfferLimitToggle(checked);
                        form.setValue(
                          "offerLimit",
                          checked ? null : field.value
                        );
                      }}
                    />
                  }
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="offerPrice"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  label="Offer Price"
                  showRequired
                  disabled
                  className="bg-white"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="usageLimit"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  label="Per User Limit"
                  showRequired
                  disabled={perUserLimitToggle}
                  value={field.value ?? ""}
                  topRightNode={
                    <Switch
                      checkedTitle="Unlimited"
                      uncheckedTitle="limited"
                      checked={perUserLimitToggle}
                      onCheckedChange={(checked) => {
                        setPerUserLimitToggle(checked);
                        form.setValue("usageLimit", checked ? -1 : field.value);
                      }}
                    />
                  }
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="taxPercent"
        render={({ field }) => (
          <FormItem>
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  label="Tax Percentage"
                  info
                  disabled={!taxToggle}
                  topRightNode={
                    <Switch
                      checkedTitle="Custom"
                      uncheckedTitle="Standard"
                      checked={taxToggle}
                      onCheckedChange={(checked) => {
                        setTaxToggle(checked);
                        form.setValue("stdTax", !checked);
                        form.setValue("taxPercent", checked ? field.value : 0);
                      }}
                    />
                  }
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="repurchasePeriod"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  label="Repurchase Period(Days)"
                  disabled={!repurchaseToggle}
                  topRightNode={
                    <Switch
                      checkedTitle="Enabled"
                      uncheckedTitle="Disabled"
                      checked={repurchaseToggle}
                      onCheckedChange={(checked) => {
                        setRepurchaseToggle(checked);
                        form.setValue(
                          "repurchasePeriod",
                          checked ? 0 : field.value
                        );
                      }}
                    />
                  }
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default OfferPricingDetails;
