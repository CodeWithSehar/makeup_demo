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
            isDestructive ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
          }`}
        >
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h4 className="font-serif text-lg font-bold text-stone-900">{title}</h4>
          <p className="text-xs text-stone-600 leading-relaxed">{message}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3">
          <Button variant="outline" size="sm" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-full text-xs font-semibold text-white transition-all cursor-pointer ${
              isDestructive ? 'bg-rose-600 hover:bg-rose-700' : 'bg-stone-900 hover:bg-black'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

