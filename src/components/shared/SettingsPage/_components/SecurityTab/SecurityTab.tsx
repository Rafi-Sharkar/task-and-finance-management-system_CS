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

export default function SecurityTab() {
  const { data: settingsData, isLoading } = useGetAllSettingsQuery(undefined);
  const [updateSettings] = useUpdateSettingsMutation();

  const handleToggle = async (settingKey: string, value: boolean) => {
    const payload = { [settingKey]: value };
    await catchAsyncMutation(updateSettings(payload).unwrap(), (res) =>
      toast.success(res?.message || "Security setting updated!"),
    );
  };

  // Loading State
  if (isLoading)
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  const securityItems = [
    {
      id: "twoFactor",
      title: "Two-Factor Authentication",
      desc: "Add an extra layer of protection to your account.",
    },
    {
      id: "loginAlert",
      title: "Login Alert Notification",
      desc: "Get notified when your account is accessed from a new device.",
    },
    {
      id: "automaticBackups",
      title: "Automatic Backups",
      desc: "Daily automatic backup of all data.",
    },
  ];

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[#181D27]">Security</h2>
        <p className="mt-1.5 text-sm text-[#444]">
          Keep your account secure with extra authentication and alerts.
        </p>
      </div>

      {securityItems.map((item) => (
        <div key={item.id} className="space-y-3">
          <div className="flex items-center justify-between gap-6">
            <div>
              <Label
                className="cursor-pointer text-base font-semibold text-[#121212]"
                htmlFor={item.id}
              >
                {item.title}
              </Label>
              <p className="mt-1.5 max-w-md text-sm text-[#444]">{item.desc}</p>
            </div>

            <Switch
              id={item.id}
              checked={settingsData?.data?.[item.id] || false}
              onCheckedChange={(checked) => handleToggle(item.id, checked)}
              className="scale-125 cursor-pointer border-2 border-gray-200 transition-all data-[state=checked]:border-[#155DFC] data-[state=checked]:bg-[#155DFC]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
