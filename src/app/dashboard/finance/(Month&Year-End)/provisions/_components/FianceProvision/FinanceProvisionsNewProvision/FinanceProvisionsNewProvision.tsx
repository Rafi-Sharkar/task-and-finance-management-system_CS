"use client";

import SectionHeader from "@/components/shared/dashboard/sectionHeader/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { IProvision } from "../FianceProvisionsList/FianceProvisionsList";
import FinanceProvisionsNewProvisionFrom from "./FinanceProvisionsNewProvisionFrom/FinanceProvisionsNewProvisionFrom";

interface Props {
  showForm: boolean;
  setShowForm: (val: boolean) => void;
  selectedItem: IProvision | null;
  onClose: () => void;
}

function FinanceProvisionsNewProvision({
  showForm,
  setShowForm,
  selectedItem,
  onClose,
}: Props) {

  // Handle New Provision button click
  const handleNewProvisionClick = () => {
    if (showForm && selectedItem) {
      onClose();
      setShowForm(true);
    } else {
      setShowForm(!showForm);
    }
  };

  return (
    <section className="w-full space-y-6">
      <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
        <SectionHeader
          title="Provisions"
          subTitle="Set aside reserves for expected liabilities"
        />

        <div>
          <Button
            onClick={handleNewProvisionClick}
            className={"btn-primary flex items-center gap-2 py-5!"}
          >
            <Plus size={18} /> New Provision
          </Button>
        </div>
      </div>

      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <FinanceProvisionsNewProvisionFrom
            key={selectedItem?.id || "new"}
            onClose={onClose}
            selectedItem={selectedItem}
          />
        </div>
      )}
    </section>
  );
}

export default FinanceProvisionsNewProvision;
