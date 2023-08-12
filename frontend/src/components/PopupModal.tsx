import { ReactNode } from "react";

interface PopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PopupModal = ({ isOpen, onClose, children }: PopupModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopupModal;
