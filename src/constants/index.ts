import { Coordinates, ValueLabelProps } from "@/types/global";

import ASSETS from "./assets";

export const DEFAULT_LOCATION: Coordinates = {
  lat: 33.6629442, // Default to Phenix, AZ
  lng: -112.0182329,
};

export const TYPES_OF_DEALS: ValueLabelProps[] = [
  {
    label: "All",
    value: "ALL",
  },
  // {
  //   label: "Coupons",
  //   value: "COUPONS",
  // },
  {
    label: "Offers",
    value: "OFFERS",
  },
  {
    label: "Events",
    value: "EVENTS",
  },
];

export const CAT_LIST_HOME = [
  { keyword: "Entertainment", title: "Explore Exciting Activities Nearby" },
  {
    keyword: "Food & Beverages",
    title: "Discover Dining Experiences Near You",
  },
  { keyword: "Beauty & Wellness", title: "Nearby Beauty Finds" },
];

export const CATEGORY_ICON_MAP = new Map<string, string>([
  ["auto", ASSETS.ICONS.CATEGORIES.AUTO],
  ["baby & kids", ASSETS.ICONS.CATEGORIES.BABY_AND_KIDS],
  ["beauty & wellness", ASSETS.ICONS.CATEGORIES.BEAUTY_AND_WELLNESS],
  ["cleaning services", ASSETS.ICONS.CATEGORIES.CLEANING_SERVICES],
  ["education & learning", ASSETS.ICONS.CATEGORIES.EDUCATION_AND_LEARNING],
  ["electronics", ASSETS.ICONS.CATEGORIES.ELECTRONICS],
  ["entertainment", ASSETS.ICONS.CATEGORIES.ENTERTAINMENT],
  ["fashion", ASSETS.ICONS.CATEGORIES.FASHION],
  ["food & beverages", ASSETS.ICONS.CATEGORIES.FOOD_AND_BEVERAGES],
  ["fyndr exclusives", ASSETS.ICONS.CATEGORIES.FYNDR_EXCLUSIVES],
  ["health & fitness", ASSETS.ICONS.CATEGORIES.HEALTH_AND_FITNESS],
  ["home services", ASSETS.ICONS.CATEGORIES.HOME_SERVICES],
  ["photography", ASSETS.ICONS.CATEGORIES.PHOTOGRAPHY],
  ["pets", ASSETS.ICONS.CATEGORIES.PETS],
  ["personal care", ASSETS.ICONS.CATEGORIES.PERSONAL_CARE],
  ["professional services", ASSETS.ICONS.CATEGORIES.PROFESSIONAL_SERVICES],
  ["sports & outdoors", ASSETS.ICONS.CATEGORIES.SPORTS_AND_OUTDOORS],
  ["travel", ASSETS.ICONS.CATEGORIES.TRAVEL],
  ["other", ASSETS.ICONS.CATEGORIES.OTHER],
]);

export const WHOLE_UNITS = ["each", "set", "box", "pair"];
