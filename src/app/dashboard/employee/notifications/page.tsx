import { EmployeeNotificationsData } from "./data/employeeNotificationsData";

function EmployeeNotificationsPage() {
  return (
    <div className="w-full overflow-hidden rounded-md bg-white">
      {/* Header Section: Responsive padding and font size */}
      <div className="flex items-center justify-between border-b border-[#D5D7DA] px-4 py-4 sm:px-6 sm:py-5">
        <h1 className="text-lg font-semibold text-[#1E1B39] sm:text-2xl">
          Notifications
        </h1>
        <button className="cursor-pointer text-xs font-medium text-[#155DFC] transition-colors sm:text-sm">
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-[#ebeef1]">
        {EmployeeNotificationsData.map((item) => (
          <div
            key={item.id}
            className="group flex cursor-pointer items-start justify-between px-4 py-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex flex-1 gap-3 sm:gap-4">
              {/* Status Dot */}
              <div className="mt-1.5">
                <div
                  className={`h-2 w-2 rounded-full ${item.unread ? "bg-[#155DFC]" : "bg-[#D5D7DA]"}`}
                />
              </div>

              {/* Text Content: flex-1 ensures it takes available space */}
              <div className="min-w-0 flex-1">
                <h3
                  className={`break-word text-sm leading-tight sm:text-[15px] ${
                    item.unread
                      ? "font-semibold text-[#171717]"
                      : "font-normal text-[#737373]"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="mt-1 text-[11px] font-normal text-gray-400 sm:text-xs">
                  {item.type}
                </p>
              </div>
            </div>

            {/* Time: Hidden on very small screens or made smaller */}
            <div className="ml-3 pt-1 text-[10px] whitespace-nowrap text-gray-400 sm:text-xs">
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeNotificationsPage;
