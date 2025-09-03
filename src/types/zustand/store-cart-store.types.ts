import { DiscountType } from "../global";
import { AppointmentSlotPayload } from "../invoice/invoice.types";
import { GetStoreResponse } from "../store/store.response";
import { StoreItem } from "../store/store.types";

export type StoreCartItem = {
  itemId: number;
  qty: number;
  price: number;
  modifiers: {
    whole: StoreItem["catalogueModifiers"];
    addon: StoreItem["catalogueModifiers"];
  };
  storeItem: StoreItem;
  itemLevelAppointments: AppointmentSlotPayload[];
};

export type TipConfig = {
  value: number;
  type: DiscountType;
} | null;

export type StoreCartState = {
  items: StoreCartItem[];
  bizId: number | null;
  bizName: string | null;
  locationId: number | null;

  storeId: number | null;
  storeUrl: string | null;
  storeName: string | null;

  country: string | null;
  postalCode: string | null;

  tipConfig: TipConfig;
  showCartItemsDeleteButton: boolean;

  appointmentType: GetStoreResponse["catalogueAppointmentType"] | null;
  cartLevelAppointments: AppointmentSlotPayload[];

  appointmentModalState: {
    isOpen: boolean;
    editMode: {
      isEditing: boolean;
      originalAppointment: AppointmentSlotPayload | null;
    };
  };
};

export type StoreCartAction = {
  addCartItem: (item: StoreCartItem) => void;
  removeCartItem: (itemId: number, index: number) => void;
  clearCart: () => void;

  // QUANTITY UPDATE METHODS
  updateItemQuantity: (index: number, newQty: number) => void;
  incrementItemQuantity: (index: number) => void;
  decrementItemQuantity: (index: number) => void;

  getQuantityStep: (index: number) => number;
  getItemQty: (itemId: number) => number;
  getCartItem: (itemId: number) => StoreCartItem | null;
  getLocationId: () => number | null;

  removeLastItemLevelAppointment: (index: number) => void;

  setCartData: ({
    bizId,
    bizName,
    locationId,
    storeId,
    storeName,
    storeUrl,
    appointmentType,
    country,
    postalCode,
  }: {
    bizId: number;
    storeId: number;
    locationId: number;
    storeUrl: string;
    bizName: string;
    storeName: string;
    appointmentType: GetStoreResponse["catalogueAppointmentType"];
    country: string;
    postalCode: string;
  }) => void;

  setCartLevelAppointments: (appointment: AppointmentSlotPayload) => void;
  setShowCartItemsDeleteButton: (value: boolean) => void;

  // Updated tip methods
  setTipConfig: (value: number, type: DiscountType) => void;
  clearTip: () => void;
  getTipAmount: (totalPrice: number) => number;

  openAppointmentModal: () => void;
  closeAppointmentModal: () => void;
};

export type StoreCartStore = StoreCartState & StoreCartAction;
