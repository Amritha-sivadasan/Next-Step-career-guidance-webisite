import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ImagePreviewModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-4 rounded-lg">
        <img src={imageUrl} alt="Preview" className="max-w-md max-h-[80vh] rounded-lg" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <AiOutlineClose size={24} />
        </button>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
