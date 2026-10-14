import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} maxWidth="sm">
      <div className="text-center space-y-4">
        <div
          className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
            isDestructive ? 'bg-red-50 text-error' : 'bg-amber-50 text-warning'
          }`}
        >
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h4 className="font-serif text-lg font-bold text-espresso">{title}</h4>
          <p className="text-xs text-muted-taupe leading-relaxed">{message}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3">
          <Button variant="outline" size="sm" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-full text-xs font-semibold text-white transition-all cursor-pointer ${
              isDestructive ? 'bg-error hover:bg-red-800' : 'bg-espresso hover:bg-mocha'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

