import React from "react";
import ReactDOM from "react-dom";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (messageId: string) => void;
  messageId: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  messageId,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-end  bg-black bg-opacity-50 z-50  ">
      <div className="bg-white p-4 rounded-lg shadow-lg w-72 mr-44 ">
        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
        <p className="mb-4">Do you want to delete this message?</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              onConfirm(messageId);
              onClose();
            }}
          >
            Yes, delete it!
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
