"use client";

import Link from "next/link";
import React, { useState } from "react";

import Button from "@/components/global/buttons";
import { Modal } from "@/components/global/modal";
import { requestCalendarConsent } from "@/lib/utils/calendar-consent";
import { useCalendarConsentStore } from "@/zustand/stores/calendar-consent.store";

type Props = {
  isOpen: boolean;
  onConfirm: (googleAccessToken: string) => void;
  onCancel: () => void;
  onClose: () => void;
};

const AppointmentConsentModal = ({
  isOpen,
  onConfirm,
  onCancel,
  onClose,
}: Props) => {
  const [isRequestingConsent, setIsRequestingConsent] =
    useState<boolean>(false);
  const { setCalendarTokens, clearCalendarTokens } = useCalendarConsentStore();

  const handleYesClick = async () => {
    try {
      setIsRequestingConsent(true);

      await requestCalendarConsent({
        onSuccess: (tokens) => {
          const expiresAt = Date.now() + (tokens?.expiresIn || 3600) * 1000;
          setCalendarTokens({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            expiresAt,
            scope: "calendar",
          });

          // Close modal and proceed with calendar integration
          onConfirm(tokens.accessToken);
          setIsRequestingConsent(false);
        },
        onError: (error) => {
          clearCalendarTokens();
          console.error("Calendar consent error:", error);
          setIsRequestingConsent(false);
        },
      });
    } catch (error) {
      console.error("Calendar consent error:", error);
      setIsRequestingConsent(false);
    }
  };

  const handleNoClick = () => {
    onCancel();
  };

  return (
    <Modal
      title={<div>Information</div>}
      closeOnOutsideClick={false}
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      contentClassName="sm:max-w-xl"
    >
      <div className="flex flex-col gap-4">
        <div className="body-3 flex flex-col gap-4 text-black-90">
          <div className="flex flex-col gap-1">
            <div className="body-3-medium">
              Would you prefer to incorporate this appointment into your Google
              Calendar?
            </div>
            <p>
              Please note that this feature is only compatible with Google
              Workspace accounts.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="body-3-medium">Required Disclosure</div>
            <p>
              Fyndr webapp/app uses and transfers of information received from
              Google APIs to any other app will adhere to the{" "}
              <Link
                href={
                  "https://developers.google.com/terms/api-services-user-data-policy"
                }
                target="_blank"
                className="text-primary"
              >
                Google API Services User Data Policy
              </Link>
              , including the Limited Use requirements.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="body-3-medium">
              Justification for Requested Scopes
            </div>
            <p>
              https://www.googleapis.com/auth/calendar: Fyndr webapp/app will
              use this scope to display the user&apos;s Google Calendar data on
              the scheduling screen, allowing users to manage their schedules
              through our app and sync changes with their Google Calendar.
            </p>
            <p>
              https://www.googleapis.com/auth/calendar.events: Fyndr webapp/app
              will use this scope to create, modify, and delete events in the
              user&apos;s Google Calendar, ensuring seamless schedule management
              within our app.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="body-3-medium">Demo Video</div>
            <p>
              You can view the demo video of the OAuth consent screen grant
              process at the following link:{" "}
              <Link
                href={"https://www.youtube.com/watch?v=oJu1gi4Q6Ow"}
                target="_blank"
                className="text-primary"
              >
                OAuth Consent Screen Demo
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="flex-center my-2 gap-4">
          <Button
            variant="primary"
            stdHeight
            stdWidth
            onClick={handleYesClick}
            disabled={isRequestingConsent}
          >
            {isRequestingConsent ? (
              <>
                <div className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Connecting...
              </>
            ) : (
              "Yes"
            )}
          </Button>
          <Button
            variant="primary-outlined"
            stdHeight
            stdWidth
            onClick={handleNoClick}
            disabled={isRequestingConsent}
          >
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentConsentModal;
