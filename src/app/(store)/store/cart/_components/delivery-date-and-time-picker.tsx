"use client";

import { CalendarDays } from "lucide-react";
import React, { useState } from "react";

import { onGetGooglePermission } from "@/actions/auth.actions";
import AppointmentConsentModal from "@/components/global/appointment/appointment-consent-modal";
import SlotBooking from "@/components/global/appointment/slot-booking";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";
import { useStoreCartStore } from "@/zustand/stores/business-store/store-cart-store";
import { useCalendarConsentStore } from "@/zustand/stores/calendar-consent.store";

const DeliveryDateAndTimePicker = () => {
  const {
    bizName,
    storeName,
    locationId,
    setCartLevelAppointments,
    appointmentModalState,
    openAppointmentModal,
    closeAppointmentModal,
  } = useStoreCartStore();
  // const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentSlotPayload>();
  const [appointmentConsentModalOpen, setAppointmentConsentModalOpen] =
    useState<boolean>(false);

  const { checkTokenValidity } = useCalendarConsentStore();
  const isTokenValid = checkTokenValidity();

  const handleNext = (appointment: AppointmentSlotPayload) => {
    if (appointment) {
      const isTokenValid = checkTokenValidity();
      setSelectedAppointment(appointment);
      if (!isTokenValid) {
        setAppointmentConsentModalOpen(true);
        return;
      }
      handleCalendarCancel();
      // setModalOpen(false);
      closeAppointmentModal();
    }
  };
  const handleScheduleLater = () => {
    // setModalOpen(false);
    closeAppointmentModal();
  };

  const handleCalendarConfirm = async (googleAccessToken: string) => {
    if (!googleAccessToken) {
      toast.error({
        message: "Token is required",
      });
      return;
    }

    const { success, data, error } = await onGetGooglePermission({
      payload: {
        googleAccessToken,
      },
    });

    if (!success || error) {
      toast.error({
        message: error?.details?.errorMessages?.[0] || "Something went wrong",
      });
      return;
    }

    if (data) {
      toast.success({
        message: data.message,
      });
    }

    if (selectedAppointment) {
      setCartLevelAppointments(selectedAppointment);
      // setModalOpen(false);
      closeAppointmentModal();
    }
    setAppointmentConsentModalOpen(false);
    setSelectedAppointment(undefined);
  };

  const handleCalendarCancel = () => {
    if (selectedAppointment) {
      setCartLevelAppointments(selectedAppointment);
      // setModalOpen(false);
      closeAppointmentModal();
    }
    setAppointmentConsentModalOpen(false);
    setSelectedAppointment(undefined);
  };

  const handleAppointmentModalChange = (open: boolean) => {
    if (open) {
      openAppointmentModal();
    } else {
      closeAppointmentModal();
    }
  };

  return (
    <div className="heading-6 flex">
      <div className="flex gap-4">
        <div>Delivery Date & Time: </div>
        <div
          className="flex-between heading-6 cursor-pointer gap-4"
          // onClick={() => setModalOpen(true)}
          onClick={openAppointmentModal}
        >
          <CalendarDays size={24} className="text-primary" />
        </div>
      </div>
      <Modal
        title={bizName}
        open={appointmentModalState.isOpen}
        onOpenChange={handleAppointmentModalChange}
        closeOnOutsideClick={false}
        contentClassName="!max-w-screen-xl"
      >
        <SlotBooking
          objId={-1}
          title={storeName || ""}
          defaultLocationId={`${locationId}`}
          showHeader={false}
          onNext={handleNext}
          onScheduleLater={handleScheduleLater}
          // slotAvailabilityAdjuster={}
          footer={
            isTokenValid ? (
              <div className="body-3 rounded-b-[9px] border-t border-secondary-20 bg-yellow-300 p-4 py-2">
                The Google Calendar permission to create events has been
                enabled. Now, all selected appointment slots will be
                automatically added to calendar.
              </div>
            ) : (
              <></>
            )
          }
        />
      </Modal>
      <AppointmentConsentModal
        isOpen={appointmentConsentModalOpen}
        onConfirm={handleCalendarConfirm}
        onCancel={handleCalendarCancel}
        onClose={() => setAppointmentConsentModalOpen(false)}
      />
    </div>
  );
};

export default DeliveryDateAndTimePicker;
