"use client";
import { useState } from "react";
import FianceProvisionsList, { IProvision } from "./FianceProvisionsList/FianceProvisionsList";
import FinanceProvisionsNewProvision from "./FinanceProvisionsNewProvision/FinanceProvisionsNewProvision";


function FianceProvision() {
  const [selectedItem, setSelectedItem] = useState<IProvision | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (item: IProvision) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      <FinanceProvisionsNewProvision
        showForm={showForm}
        setShowForm={setShowForm}
        selectedItem={selectedItem}
        onClose={handleClose}
      />
      <FianceProvisionsList onEdit={handleEdit} />
    </div>
  );
}

export default FianceProvision;
