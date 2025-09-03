import { Campaign, CreateCampaignPayload } from "../campaign/campaign.types";
import { ActionResponse } from "../global";

export type CreateCampaign = (
  payload: CreateCampaignPayload
) => Promise<ActionResponse<Campaign>>;
