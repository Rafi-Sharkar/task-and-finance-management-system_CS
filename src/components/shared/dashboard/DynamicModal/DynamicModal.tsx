import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface DynamicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = "",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md ${className}`}>
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle className="text-xl font-semibold">
                {title}
              </DialogTitle>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DynamicModal;
