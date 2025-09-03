"use client";

import React from "react";

import { Modal } from "@/components/global/modal";
import { AppointmentSlotPayload } from "@/types/invoice/invoice.types";

import AppointmentInfoCard from "../../appointment-info-card";

type Props = {
  trigger: React.ReactNode;
  appointments: AppointmentSlotPayload[];
};

const AllAppointmentsModal = ({ appointments, trigger }: Props) => {
  return (
    <Modal
      trigger={trigger}
      title="Appointment Details"
      // contentClassName="max-w-fit"
      headerClassName=""
      width="550px"
    >
      <div className="flex flex-col gap-4">
        {appointments.length > 0 ? (
          appointments.map((appointment, i) => (
            <AppointmentInfoCard
              key={i}
              appointment={appointment}
              className="grid min-h-fit w-full grid-cols-10 p-0"
              dateClassName="col-span-4"
              timeClassName="col-span-5"
              editClassName="col-span-1 flex justify-end text-secondary"
              onEdit={() => {}}
            />
          ))
        ) : (
          <div className="body-1 text-center text-black-70">
            No appointments available.
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AllAppointmentsModal;
