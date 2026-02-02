import { LucideIcon } from "lucide-react";

type DynamicStatsCardProps = {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  color?: string;
};

const DynamicStatsCard: React.FC<DynamicStatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
}) => {
  return (
    <div className="ui-container">
      <div className="flex items-center justify-between">
        <div className="space-y-2.5">
          <p className="text-base font-semibold text-[#414651]">{title}</p>
          <p
            className={`text-3xl font-bold`}
            style={{ color: color ? color : "#181D27" }}
          >
            {value}
          </p>
        </div>

        {Icon && (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-sm p-2 text-white"
            style={{ backgroundColor: color ? color : "#EFF6FF" }}
          >
            <Icon size={24} strokeWidth={1.5} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicStatsCard;
