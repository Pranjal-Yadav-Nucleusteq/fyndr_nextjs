"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { onSaveCampaign } from "@/actions/campaign.action";
import Button from "@/components/global/buttons";
import DefaultCard from "@/components/global/cards/default-card";
import Switch from "@/components/global/input/switch";
import StepperComponent from "@/components/global/stepper-component";
import toast from "@/components/global/toast";
import { CreateCampaignPayload } from "@/types/campaign/campaign.types";
import { useCampaignStore } from "@/zustand/stores/campaign.store";

import { steps } from "../_components/steps";

const StepPage = () => {
  const router = useRouter();
  const { step } = useParams();
  const { campaignPayload, updateCampaignPayload, resetCampaignPayload } =
    useCampaignStore();
  const stepStr = Array.isArray(step) ? step[0] : step;
  if (stepStr === undefined) throw new Error("Step is undefined");
  const currentIndex = steps.findIndex((s) => s.step === stepStr);

  const [checked, setChecked] = useState<boolean>(true);

  useEffect(() => {
    if (!campaignPayload?.status) {
      updateCampaignPayload("status", "ACTIVE");
      updateCampaignPayload("campaignStatus", "ACTIVE");
    }
  }, [campaignPayload?.status, updateCampaignPayload]);

  if (currentIndex === -1 || currentIndex > 7) return <div>Invalid</div>;

  const handleStepChange = (step: string) => {
    router.push(`/business/campaign/add/${step}`);
  };

  const handleNext = async () => {
    if (currentIndex < steps.length - 1) {
      router.push(`/business/campaign/add/${steps[currentIndex + 1].step}`);
    } else if (currentIndex === steps.length - 1) {
      const resp = await onSaveCampaign(
        campaignPayload as CreateCampaignPayload
      );
      console.log("respp", resp);

      if (resp.success) {
        toast.success({
          message: "Campaign Created Successfully",
        });
        router.push("/business/campaign");
      } else {
        toast.error({
          message: "Something went wrong",
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      router.push(`/business/campaign/add/${steps[currentIndex - 1].step}`);
    }
  };
  const handleClose = () => {
    resetCampaignPayload();
    router.push("/business/campaign");
  };

  const handleCheckedChange = (value: boolean) => {
    setChecked(value);
    updateCampaignPayload("status", value ? "ACTIVE" : "INACTIVE");
    updateCampaignPayload("campaignStatus", value ? "ACTIVE" : "INACTIVE");
  };

  return (
    <>
      <div className="flex w-full flex-col gap-6 p-12 pt-6">
        <div className="flex items-center justify-between">
          <div className="size-6 w-full font-roboto text-2xl font-normal leading-9 text-primary">
            {"Create Campaign"}
          </div>
        </div>
        <DefaultCard className="flex min-h-[709px] w-full flex-col justify-between gap-11">
          <div>
            <StepperComponent
              steps={steps}
              currentStep={stepStr}
              onStepClick={handleStepChange}
            >
              <div className="flex-center min-h-40 flex-col text-black-30">
                {steps[currentIndex].component}
              </div>
            </StepperComponent>
          </div>
          <div className="flex-center gap-2">
            {currentIndex === steps.length - 1 && (
              <Switch
                checkedTitle="Active"
                uncheckedTitle="Inactive"
                checked={checked}
                onCheckedChange={handleCheckedChange}
              />
            )}
            {currentIndex !== 0 && (
              <Button
                onClick={handlePrevious}
                stdHeight
                stdWidth
                variant="primary-outlined"
              >
                Back
              </Button>
            )}
            <Button onClick={handleNext} stdHeight stdWidth variant="primary">
              {currentIndex === steps.length - 1 ? "Save" : "Next"}
            </Button>
            {currentIndex !== 0 && (
              <Button
                onClick={handleClose}
                stdHeight
                stdWidth
                variant="primary-outlined"
              >
                Close
              </Button>
            )}
          </div>
        </DefaultCard>
      </div>
    </>
  );
};

export default StepPage;
