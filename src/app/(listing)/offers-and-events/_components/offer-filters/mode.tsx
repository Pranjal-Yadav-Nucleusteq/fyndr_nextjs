"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/global/buttons";
import { formUrlQuery } from "@/lib/utils/url";

type ModeTypes = "offline" | "online";

const Mode = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeMode: ModeTypes =
    (searchParams.get("mode") as ModeTypes) || "offline";

  const setActiveMode = (mode: ModeTypes) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "mode",
      value: mode,
    });

    router.replace(newUrl);
  };

  return (
    <div className="grid h-fit w-full grid-cols-2 rounded-10 border border-secondary-20 bg-white">
      <Button
        variant={
          activeMode === "offline" ? "primary-dark" : "primary-dark-outlined"
        }
        className={`rounded-[9px] ${activeMode === "offline" ? "" : "border-none"}`}
        stdHeight
        onClick={() => setActiveMode("offline")}
      >
        Local
      </Button>
      <Button
        variant={
          activeMode === "online" ? "primary-dark" : "primary-dark-outlined"
        }
        className={`rounded-[9px] ${activeMode === "online" ? "" : "border-none"}`}
        stdHeight
        onClick={() => setActiveMode("online")}
      >
        Nationwide
      </Button>
    </div>
  );
};

export default Mode;
