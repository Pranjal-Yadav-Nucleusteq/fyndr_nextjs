import { Currency, CurrencySymbol, DiscountType, OfferStatus } from "../global";

export type CampaignTypeProps = "offers" | "events" | "coupons" | "brochure";
export type CampaignStatusProps = "ACTIVE";
export type CampaignStatusProps2 = "active" | "inactive";

export type CampaignImage = {
  img_url: string;
  thumbnail_url: string;
  order: number;
};

export type CampaignCategory = {
  categoryId: number;
  isActive: boolean;
  name: string;
};

export type CampaignIndv = {
  indvId: number;
  objid: number;
  cmpnId: number;
  bizId: number;
  isDeleted: boolean;
  likedCount: null | number;
};

export type CampaignBiz = {
  addonUrl: unknown | null;
  addressLine1: string;
  addressLine2: string;
  bizEmail: string; //
  bizName: string;
  bizType: string;
  bizid: number;
  city: string;
  country: string;
  lat: string;
  lng: string;
  mainLogo: string;
  merchantId: string | null;
  phone: string;
  postalCode: string;
  showBiz: boolean;
  state: string;
  website: string | null;
};

export type CampaignOffer = {
  objid: number;
  amount: number;
  isBookingEnabled: boolean;
  isVoucher: boolean;
  stdTax: boolean;
  isNew?: boolean;
  isUpdated?: boolean;

  offerLimit: number | null;
  offerPrice: number;
  offerSold: number;
  offerType: "offers" | "coupons" | "events";
  repurchasePeriod: number;
  retailPrice: number;
  usageLimit: number;
  taxPercent: number | null;

  title: string;
  status: OfferStatus;
  voucherFileName: string | null;
  validityPeriod: string;
  campaignOfferStatus?: string;
  couponCode: string | null;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  discountType: DiscountType;
  displayOrder: number;
  imageFilePath?: string | null;
  thumbnailFilePath?: string | null;
};

export type CampaignLocation = {
  addressLine1: string;
  addressLine2: string;
  campaignBookingEnabled: boolean;
  catalogueId: number;
  city: string;
  country: string;
  distance: number;
  lat: number;
  lng: number;
  locName: string;
  locType: string;
  locationId: number;
  objid: number;
  phone: string;
  postalCode: string;
  state: string;
  status: string;
  storeUrl: null | string;
};

export type PaymentSubscriptionProps = {
  id: number;
  defaultPaymentId: string;
  createdDt: string;
  updatedDt: string;
  status: "ACTIVE" | "INACTIVE" | string;
  lastInvoiceId: number;
  updatedDuration: number;
};

export type Campaign = {
  qrCode: string;
  startDt: string;
  endDt: string;
  createdDt: string;
  lastUpdatedDt: string;
  lastUpdatedBy: number;

  objid: number;
  title: string;
  description: string;
  cmpnUrl: string;
  finePrint: string;
  brochureFile: null | unknown;
  goal: string;
  deliveryChannel: string;
  tags: string;

  isFeatured: boolean;
  featuredStartDt: null | string;
  featuredEndDt: null | string;

  stdTax: null | unknown;
  taxPercent: null | number;

  images: CampaignImage[] | null;
  cmpnLocs: CampaignLocation[];
  cmpnOffers: CampaignOffer[];
  category: CampaignCategory;
  indvCmpn: CampaignIndv;
  cmpnType: CampaignTypeProps;
  campaignStatus: CampaignStatusProps;
  status: CampaignStatusProps2;
  biz: CampaignBiz;

  videos: null | unknown;
  campaignLocationCount: null | number;
  paymentSubscription: PaymentSubscriptionProps | null;

  likedCount: number;
  campaignLiked: boolean;
};

export type CreateCampaignImage = {
  index: number;
  img: string;
  thumbnail: string;
};

export type CreateCampaignPayload = {
  bizid: number;
  brochureFile: null | unknown;
  campaignStatus: CampaignStatusProps;
  campaignVideo: null | unknown;
  categoryId: number;
  cmpnImgs: CreateCampaignImage[];
  cmpnLocs: number[];
  cmpnType: CampaignTypeProps;
  cmpnUrl: string | null;
  country: string;
  dc: string;
  descr: string;
  startDt: string;
  endDt: string;
  createdDt: string;
  lastUpdatedBy: number;
  status: CampaignStatusProps2;
  tags: string | null;
  title: string;
  offers: CampaignOffer[];
  objid?: number;
  goal: string;
  finePrint: string;
};
