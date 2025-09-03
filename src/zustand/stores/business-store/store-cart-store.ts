import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { WHOLE_UNITS } from "@/constants";
import { StoreItem } from "@/types/store/store.types";
import { StoreCartStore } from "@/types/zustand/store-cart-store.types";

export const useStoreCartStore = create<StoreCartStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        items: [],
        bizId: null,
        bizName: null,
        locationId: null,
        storeId: null,
        storeName: null,
        storeUrl: null,

        appointmentType: null,
        cartLevelAppointments: [],

        country: null,
        postalCode: null,

        // Store tip configuration instead of amount
        tipConfig: null,

        appointmentModalState: {
          isOpen: false,
          editMode: {
            isEditing: false,
            originalAppointment: null,
          },
        },

        showCartItemsDeleteButton: false,

        addCartItem(item) {
          set((state) => {
            const sameIds = (
              arrA: StoreItem["catalogueModifiers"],
              arrB: StoreItem["catalogueModifiers"]
            ) => {
              if (arrA.length !== arrB.length) return false;
              const idsA = arrA.map((m) => m.modifier.objid).sort();
              const idsB = arrB.map((m) => m.modifier.objid).sort();
              return idsA.every((id, idx) => id === idsB[idx]);
            };

            const existingItemIndex = state.items.findIndex(
              (cartItem) =>
                cartItem.itemId === item.itemId &&
                sameIds(cartItem.modifiers.addon, item.modifiers.addon) &&
                sameIds(cartItem.modifiers.whole, item.modifiers.whole)
            );

            if (existingItemIndex >= 0) {
              state.items[existingItemIndex].qty += item.qty ?? 1;
              const existingAppointments =
                state.items[existingItemIndex].itemLevelAppointments;
              state.items[existingItemIndex].itemLevelAppointments = [
                ...existingAppointments,
                ...item.itemLevelAppointments,
              ];
            } else {
              state.items.push({
                ...item,
                itemLevelAppointments: item.itemLevelAppointments || [],
              });
            }
          });
        },
        removeCartItem(itemId, index) {
          set((state) => {
            state.items = state.items.filter(
              (item, i) => !(item.itemId === itemId && i === index)
            );
          });

          if (get().items.length === 0) {
            get().clearCart();
          }
        },
        clearCart() {
          set((state) => {
            state.items = [];
            state.tipConfig = null; // Clear tip when cart is cleared
            state.cartLevelAppointments = [];
            state.appointmentModalState = {
              isOpen: false,
              editMode: {
                isEditing: false,
                originalAppointment: null,
              },
            };
            state.showCartItemsDeleteButton = false;
          });
        },

        getQuantityStep(index) {
          const item = get().items[index];
          if (!item) return 1;

          const wholeUnits = ["each", "set", "box", "pair"];
          const unit = item.storeItem.item.unit.toLowerCase();

          return wholeUnits.includes(unit) ? 1 : 0.1;
        },

        // QUANTITY UPDATE METHODS
        updateItemQuantity(index, newQty) {
          set((state) => {
            if (state.items[index] && newQty >= 1) {
              state.items[index].qty = newQty;
            }
          });
        },
        incrementItemQuantity(index) {
          set((state) => {
            if (state.items[index]) {
              const isWholeUnit: boolean = WHOLE_UNITS.includes(
                state.items[index].storeItem.item.unit.toLowerCase()
              );
              if (isWholeUnit) {
                state.items[index].qty += 1;
              } else {
                state.items[index].qty =
                  Math.round((state.items[index].qty + 0.1) * 100) / 100; // To avoid floating point issues
              }
            }
          });
        },
        decrementItemQuantity(index) {
          set((state) => {
            if (state.items[index] && state.items[index].qty > 1) {
              const isWholeUnit: boolean = WHOLE_UNITS.includes(
                state.items[index].storeItem.item.unit.toLowerCase()
              );

              if (isWholeUnit) {
                state.items[index].qty -= 1;
              } else {
                state.items[index].qty =
                  Math.round((state.items[index].qty - 0.1) * 100) / 100; // To avoid floating point issues
              }

              if (state.appointmentType === "APPOINTMENT_PER_ITEM") {
                state.removeLastItemLevelAppointment(index);
              }
            }
          });
        },

        getItemQty(itemId) {
          const item = get().items.find((item) => item.itemId === itemId);
          return item?.qty || 0;
        },
        getCartItem(itemId) {
          return get().items.find((item) => item.itemId === itemId) || null;
        },
        getLocationId() {
          return get().locationId;
        },
        setCartData({
          bizId,
          bizName,
          locationId,
          storeId,
          storeName,
          storeUrl,
          appointmentType,
          country,
          postalCode,
        }) {
          set((state) => {
            state.bizId = bizId;
            state.bizName = bizName;
            state.locationId = locationId;
            state.storeId = storeId;
            state.storeName = storeName;
            state.storeUrl = storeUrl;
            state.appointmentType = appointmentType;
            state.country = country;
            state.postalCode = postalCode;
          });
        },

        setCartLevelAppointments(appointment) {
          set((state) => {
            state.cartLevelAppointments = [appointment];
          });
        },

        // Updated tip methods
        setTipConfig(value, type) {
          set((state) => {
            state.tipConfig = { value, type };
          });
        },

        setShowCartItemsDeleteButton(value) {
          set((state) => {
            state.showCartItemsDeleteButton = value;
          });
        },

        clearTip() {
          set((state) => {
            state.tipConfig = null;
          });
        },
        getTipAmount(totalPrice) {
          const { tipConfig } = get();
          if (!tipConfig) return 0;

          if (tipConfig.type === "flat") {
            return tipConfig.value;
          } else {
            return (totalPrice * tipConfig.value) / 100;
          }
        },

        closeAppointmentModal() {
          set((state) => {
            state.appointmentModalState.isOpen = false;
          });
        },
        openAppointmentModal() {
          set((state) => {
            state.appointmentModalState.isOpen = true;
          });
        },

        removeLastItemLevelAppointment(index) {
          set((state) => {
            if (
              index >= 0 &&
              state.items[index].itemLevelAppointments.length > 0
            ) {
              state.items[index].itemLevelAppointments.pop();
            }
          });
        },
      })),
      {
        name: "store-cart",
      }
    ),
    {
      name: "store-cart",
    }
  )
);
