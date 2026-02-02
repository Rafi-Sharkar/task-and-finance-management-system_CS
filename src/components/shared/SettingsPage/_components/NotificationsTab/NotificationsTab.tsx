"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  useGetAllSettingsQuery,
  useUpdateSettingsMutation,
} from "@/redux/features/settings/settings.api";

import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function NotificationsTab() {
  const { data: settingsData, isLoading } = useGetAllSettingsQuery(undefined);
  const [updateSettings] = useUpdateSettingsMutation();

  const handleNotifyToggle = async (id: string, state: boolean) => {
    const payload = { [id]: state };

    await catchAsyncMutation(updateSettings(payload).unwrap(), (res) =>
      toast.success(res?.message || "Security setting updated!"),
    );
  };

  const notifySettings = [
    {
      id: "desktopNotification",
      title: "Enable Desktop Notifications",
      desc: "Receive notification all of updates",
    },
    {
      id: "emailNotification",
      title: "Receive Email Notifications",
      desc: "Important updates and alerts via email",
    },
    {
      id: "smsNotification",
      title: "Receive SMS Notifications",
      desc: "Updates directly to your phone",
    },
    {
      id: "dailySummaries",
      title: "Daily Summaries",
      desc: "Daily overview of project activities",
    },
  ];

  // Loading State
  if (isLoading)
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#181D27]">Notifications</h2>
        <p className="mt-1.5 text-sm text-[#444]">
          Manage how you receive updates.
        </p>
      </div>

      {notifySettings.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-6">
          <div>
            <Label
              className="cursor-pointer text-base font-semibold text-[#121212]"
              htmlFor={item.id}
            >
              {item.title}
            </Label>
            <p className="mt-1.5 text-sm text-[#444]">{item.desc}</p>
          </div>
          <Switch
            id={item.id}
            checked={settingsData?.data?.[item.id] || false}
            onCheckedChange={(checked) => handleNotifyToggle(item.id, checked)}
            className="scale-125 cursor-pointer transition-all data-[state=checked]:bg-[#155DFC]"
          />
        </div>
      ))}
    </div>
  );
}
