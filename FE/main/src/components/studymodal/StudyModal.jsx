import React from "react";
// import { IoClose } from "react-icons/io5";
import {X} from 'react-feather';

function StudyModal({ studyopen, studyonClose, children }) {
  return (
    <div
      onClick={studyonClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        studyopen ? "visible bg-black/20" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-fit rounded-xl shadow p-6 transition-all ${
            studyopen ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button
          onClick={studyonClose}
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

export default StudyModal;
