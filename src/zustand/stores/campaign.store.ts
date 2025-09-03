import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { CreateCampaignPayload } from "@/types/campaign/campaign.types";

interface CampaignStore {
  campaignPayload: Partial<CreateCampaignPayload>;
  loading: boolean;
  error: string | null;

  setCampaignPayload: (data: Partial<CreateCampaignPayload>) => void;
  updateCampaignPayload: (
    key: keyof CreateCampaignPayload,
    value: unknown
  ) => void;
  resetCampaignPayload: () => void;
}

export const useCampaignStore = create<CampaignStore>()(
  devtools(
    persist(
      (set) => ({
        campaignPayload: {},
        loading: false,
        error: null,

        setCampaignPayload: (data) => set({ campaignPayload: data }),

        updateCampaignPayload: (key, value) =>
          set((state) => ({
            campaignPayload: {
              ...state.campaignPayload,
              [key]: value,
            },
          })),

        resetCampaignPayload: () => set({ campaignPayload: {} }),
      }),
      { name: "campaign-store" }
    ),
    { name: "CampaignStore" }
  )
);
