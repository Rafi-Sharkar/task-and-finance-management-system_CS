import { Info } from "lucide-react";
import { ClientOverviewNotificationsData } from "./data/clientOverviewNotifications.data";

function ClientOverviewNotifications() {
  return (
    <div className="w-full rounded-md bg-white p-4 sm:p-6">
      {/* Header */}
      <h1 className="mb-4 text-lg font-bold text-[#1E1B39] sm:mb-6 sm:text-xl">
        Notification
      </h1>

      {/* Notifications List */}
      <div className="flex flex-col gap-4">
        {ClientOverviewNotificationsData.map((item) => (
          <div
            key={item?.id}
            className="flex flex-col gap-3 border-b border-[#F2F4F7] pb-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3 sm:items-center">
              {/* Info Icon: shrink-0 ensures it doesn't get squashed */}
              <div className="mt-0.5 shrink-0 sm:mt-0">
                <Info className="h-5 w-5 text-[#B5892F]" strokeWidth={2.5} />
              </div>

              <p className="text-sm leading-snug font-medium text-[#101828] sm:leading-normal">
                {item?.message}{" "}
                <span className="inline-block cursor-pointer text-[#2E90FA] hover:underline">
                  {item?.targetName}
                </span>
              </p>
            </div>

            <div className="ml-8 sm:ml-0">
              <button className="cursor-pointer text-sm font-semibold whitespace-nowrap text-[#2E90FA] transition-colors hover:text-[#1570EF]">
                {item?.actionText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientOverviewNotifications;
