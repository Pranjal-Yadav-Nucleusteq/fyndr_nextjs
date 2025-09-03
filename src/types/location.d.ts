export type LocationData = {
  country: string;
  parentLocation: null | unknown;
  isCampaignBookingEnabled?: boolean;
  isCatalogueBookingEnabled?: boolean;
  city: string;
  postalCode: string;
  locName: string;
  qrid: number;
  qrCode: string;
  objid: number;
  addressLine1: string;
  addressLine2: string;
  catalogueName: string | null;
  state: string;
  key?: number;
};
