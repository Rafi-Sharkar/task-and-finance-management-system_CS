"use client";

import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { IAccrualDeferral } from "../FinanceAccrualsDeferrals";
import FinanceAccrualsNewEntryFrom from "./FinanceAccrualsNewEntryFrom/FinanceAccrualsNewEntryFrom";

interface Props {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  selectedItem: IAccrualDeferral | null;
  onClose: () => void;
}

function FinanceAccrualsNewEntry({
  showForm,
  setShowForm,
  selectedItem,
  onClose,
}: Props) {
  return (
    <section className="w-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
        <SectionHeader
          title="Accruals & Deferrals"
          subTitle="Allocate costs and revenues to the correct period"
        />

        <div>
          <Button
            onClick={() => setShowForm(true)}
            className="btn-primary px-6! py-5!"
          >
            <Plus size={18} /> New Entry
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <FinanceAccrualsNewEntryFrom
            key={selectedItem?.id || "new"}
            onClose={onClose}
            selectedItem={selectedItem}
          />
        </div>
      )}
    </section>
  );
}

export default FinanceAccrualsNewEntry;