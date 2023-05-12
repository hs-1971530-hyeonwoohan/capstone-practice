import React from "react";
// import { IoClose } from "react-icons/io5";
import {X} from 'react-feather';

function BenefitModal({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-500 bg-white hover:bg-gray-50 hover:text-gray-700"
        >
          <X />
          {/* <IoClose /> */}
        </button>
        {children}
      </div>
    </div>
  );
}

export default BenefitModal;
