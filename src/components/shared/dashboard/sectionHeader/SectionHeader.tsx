import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

type SectionHeaderType =
  | {
      title: string;
      subTitle: string;
      showBtn?: false;
      btnText?: undefined;
      btnLink?: undefined;
    }
  | {
      title: string;
      subTitle: string;
      showBtn: true;
      btnText: string;
      btnLink: string;
    };

function SectionHeader({
  title,
  subTitle,
  showBtn,
  btnText,
  btnLink,
}: SectionHeaderType) {
  return (
    <header className="flex flex-wrap justify-between gap-3 sm:gap-4">
      <div>
        {title && (
          <h2 className="text-xl font-bold text-[#171717] capitalize sm:text-2xl">
            {title}
          </h2>
        )}
        {subTitle && (
          <p className="mt-1 text-sm text-[#525252] sm:text-base">{subTitle}</p>
        )}
      </div>

      {showBtn && (
        <Link href={btnLink}>
          <Button className="bg-[#155DFC] hover:bg-[#0351f8]">
            <Plus size={20} strokeWidth={1.5} />
            {btnText}
          </Button>
        </Link>
      )}
    </header>
  );
}

export default SectionHeader;
