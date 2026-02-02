import StatusBadge from "@/components/shared/dashboard/StatusBadge/StatusBadge";
import { useUpdateProvisionsMutation } from "@/redux/features/finance/provision/provision.api";
import { catchAsyncMutation } from "@/utils/apiReqRes.utils";
import { Check, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { IProvision } from "../FianceProvisionsList";

interface ProvisionCardProps {
  data: IProvision;
  onDelete: () => void;
  onEdit: () => void;
}

export const ProvisionCard = ({
  data,
  onDelete,
  onEdit,
}: ProvisionCardProps) => {
  const [updateProvisions] = useUpdateProvisionsMutation();
  const isDraft = data.provisionStatus === "DRAFT";

  const displayProbability = data.probability || 0;
  const progressWidth = Math.min(displayProbability, 100);

  const handlePostStatus = async () => {
    await catchAsyncMutation(
      updateProvisions({
        id: data?.id,
        params: {
          provisionStatus: "POSTED",
        },
      }).unwrap(),
      () => {
        toast.success("Provision posted successfully!");
      },
    );
  };

  return (
    <div className="ui-container relative mb-4">
      <div className="mb-2 flex items-center justify-between">
        <StatusBadge
          status={data.provisionStatus}
          bgColor={data.provisionStatus === "POSTED" ? "#e7fcef" : "#F2F4F7"}
          textColor={data.provisionStatus === "POSTED" ? "#10B981" : "#414651"}
        />

        {isDraft && (
          <div className="flex gap-2 text-gray-400">
            <Check
              size={18}
              onClick={handlePostStatus}
              className="cursor-pointer text-green-500 transition-transform hover:scale-110"
            />
            <Edit
              size={18}
              onClick={onEdit}
              className="cursor-pointer text-blue-500 transition-transform hover:scale-110"
            />
            <Trash2
              size={18}
              onClick={onDelete}
              className="cursor-pointer text-red-500 transition-transform hover:scale-110"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-4">
        <div className="col-span-1">
          <h4 className="truncate text-sm font-semibold text-[#101828]">
            {data?.name || "No Name"}
          </h4>
          <p className="mt-1 line-clamp-1 text-xs text-[#667085]">
            {data?.description || "No Description"}
          </p>
          <div className="mt-3">
            <span className="block text-[10px] font-semibold text-gray-500 uppercase">
              Amount
            </span>
            <span className="text-sm font-semibold text-[#101828]">
              ${data.amount?.toLocaleString() || 0}
            </span>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <span className="mb-4 block text-[10px] font-semibold text-gray-500 uppercase">
                Probability
              </span>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-[#447DFD] transition-all duration-500"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>
            </div>
            <span className="mt-4 text-sm font-medium text-[#344054]">
              {displayProbability}%
            </span>
          </div>
        </div>

        <div className="col-span-1 text-right">
          <span className="block text-[10px] font-semibold text-gray-500 uppercase">
            Expected Value
          </span>
          <span className="mt-1 font-semibold text-[#101828]">
            ${data?.expectedValue?.toLocaleString() || 0}
          </span>
        </div>
      </div>
    </div>
  );
};
