/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import DynamicModal from "../../../DynamicModal/DynamicModal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShareDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentName: string;
  clients: any[];
  shareData: {
    clientId: string;
    shareType: string;
  };
  setShareData: (data: any) => void;
  onShare: () => void;
  isLoading: boolean;
}

const ShareDocumentModal: React.FC<ShareDocumentModalProps> = ({
  isOpen,
  onClose,
  documentName,
  clients,
  shareData,
  setShareData,
  onShare,
  isLoading,
}) => {
  return (
    <DynamicModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Share Document: ${documentName}`}
    >
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Select Client
          </label>
          <Select
            value={shareData.clientId}
            onValueChange={(val: string) =>
              setShareData({ ...shareData, clientId: val })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a client" />
            </SelectTrigger>
            <SelectContent>
              {clients?.map((client: any) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.fullName || client.username} ({client.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">
            Action required
          </label>
          <Select
            value={shareData.shareType}
            onValueChange={(val: string) =>
              setShareData({ ...shareData, shareType: val })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a share type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="VIEW">View Only</SelectItem>
              <SelectItem value="SIGN">Need Sign</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="w-full"
          onClick={onShare}
          disabled={!shareData.clientId || isLoading}
        >
          {isLoading ? "Sharing..." : "Share"}
        </Button>
      </div>
    </DynamicModal>
  );
};

export default ShareDocumentModal;
