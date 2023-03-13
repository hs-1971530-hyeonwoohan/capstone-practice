import React from 'react'

function BoardBanner() {
    const [selectedBoard, setSelectedBoard] = useState("Board1");
  
    return (
      <div className="flex flex-col lg:w-full">
        <div className="grid grid-cols-3">
          <button
            className={`border-b-4 pt-1 h-11 ${
              selectedBoard === "Board1"
                ? "border-teal-500 text-teal-400 font-bold"
                : "border-gray-300 text-gray-600 cursor-pointer font-normal"
            }`}
            onClick={() => setSelectedBoard("Board1")}
          >
            Board1
          </button>
          <button
            className={`flex h-11 items-center justify-center pt-1 border-b-4 ${
              selectedBoard === "Board2"
                ? "border-teal-500 text-teal-400 font-bold"
                : "border-gray-300 text-gray-600 cursor-pointer font-normal"
            }`}
            onClick={() => setSelectedBoard("Board2")}
          >
            Board2
          </button>
          <button
            className={`flex h-11 items-center justify-center pt-1 border-b-4 ${
              selectedBoard === "Board3"
                ? "border-teal-500 text-teal-400 font-bold"
                : "border-gray-300 text-gray-600 cursor-pointer font-normal"
            }`}
            onClick={() => setSelectedBoard("Board3")}
          >
            Board3
          </button>
        </div>
        {selectedBoard === "Board1" && (
          <div className="flex flex-col items-center justify-between w-full h-44 p-4 bg-white text-center align-middle">
            Board1의 내용
          </div>
        )}
        {selectedBoard === "Board2" && (
          <div className="flex flex-col items-center justify-between w-full h-44 p-4 bg-white text-center align-middle">
            Board2의 내용
          </div>
        )}
        {selectedBoard === "Board3" && (
          <div className="flex flex-col items-center justify-between w-full h-44 p-4 bg-white text-center align-middle">
            Board3의 내용
          </div>
        )}
        <div
          className={`flex flex-col items-center justify-between w-full h-11 min-h-11 p-2 rounded-lg text-white text-center align-middle font-bold cursor-pointer ${
            selectedBoard === "Board1" ? "bg-teal-500" : "bg-black"
          }`}
        >
          Board 바로가기
        </div>
      </div>
    );
  }
  
  export default BoardBanner;