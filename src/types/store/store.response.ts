import { StripeAccountType } from "../auth/auth.types";
import { CountryCode, Currency, CurrencySymbol } from "../global";
import {
  BusinessDirectory,
  BusinessWorkingHour,
  StoreItem,
  LocationOffer,
  StoreCategory,
  StoreCategory2,
  StoreImageProps,
  StoreLocation,
} from "./store.types";

// Store --------------------------------------------------------

export type GetStoreResponse = {
  categories: StoreCategory[];
  biz: {
    addonUrl: null | string;
    addressLine1: string;
    addressLine2: string;
    bizid: number;
    bizName: string;
    bizType: string;
    city: string;
    country: string;
    expressMerchantId: string;
    lat: number;
    lng: number;
    mainLogo: string;
    merchantId: string;
    phone: string;
    postalCode: string;
    state: string;
    showBiz: boolean;
    stripeAccountType: StripeAccountType;
    website: string;
  };
  parentLocation: {
    objid: number;
    qrid: number;
    bizid: number;
    locName: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    lat: number;
    lng: number;
    createdDt: null | unknown;
    updatedDt: null | unknown;
    ctryCode: CountryCode;
    status: "active" | string;
    locType: null | unknown;
    parentLocation: null | unknown;
    deliveryWithin: null | unknown;
    deliveryOptions: string | unknown;
    timeZone: null | unknown;
    workingHours: null | string;
    distance: null | number | undefined;
    catalogueId: null | unknown;
    biz: null | unknown;
    workingHoursAndSlots: null | string;
  };
  locId: number;
  locName: string;
  catalogue: {
    objid: number;
    currency: Currency;
    currencySymbol: CurrencySymbol;
    name: string;
    images: [
      {
        img_url: string;
        index: number;
      },
    ];
    description: string;
    catalogueItems: null | unknown;
    locations: null | unknown;
    url: string;
  };
  businessWorkingHours: BusinessWorkingHour;
  catalogueAppointmentType:
    | "APPOINTMENT_PER_ITEM"
    | "APPOINTMENT_PER_CART"
    | null;
  catalogBookingEnabled: boolean;
};

export type GetStoreDetailsResponse = {
  objid: number;
  currency: Currency;
  currencySymbol: CurrencySymbol;
  name: string;
  images: StoreImageProps[];
  description: string;
  catalogueItems: StoreItem[];
  locations: number[];
  url: string;
};

export type GetStoreCategoriesResponse = StoreCategory2[];
export type GetStoreLocationsResponse = {
  biz: {
    addonUrl: null | string;
    addressLine1: string;
    addressLine2: string;
    bizid: number;
    bizName: string;
    bizType: string;
    city: string;
    country: string;
    expressMerchantId: string;
    lat: number;
    lng: number;
    mainLogo: string;
    merchantId: string;
    phone: string;
    postalCode: string;
    state: string;
    showBiz: boolean;
    stripeAccountType: StripeAccountType;
    website: string;
  };
  locations: StoreLocation[];
};

// --------------------------------------------------------

export type GetBusinessDirectoryResponse = {
  bizdir: BusinessDirectory[];
  count: number;
  last: boolean;
  resultFromTextExactMatch: null | unknown;
};

export type GetLocationOffersResponse = LocationOffer[];

export type GetLocationOfferReviewsResponse = {
  bizCount: {
    bizid: number;
    count: number;
  }[];
};

export type LikeBusinessResponse = {
  success: boolean;
};
