import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Tooltip = () => {
  const [hovering, setHovering] = useState(false);

  const toggleHovering = () => setHovering(!hovering);

  return (
    <div onMouseEnter={toggleHovering} onMouseLeave={toggleHovering}>
      <AiOutlineInfoCircle
        className="text-gray-500 hover:text-gray-700"
        size={24}
      />
      {hovering && (
        <div
          className="bg-white text-gray-500  border-2 border-gray-500 rounded-lg drop-shadow-xl"
          style={{ position: "absolute" }}
        >
          <div
            className="text-start"
            style={{ width: "400px", height: "177px" }}
          >
            <div className="ml-2 mt-2">
              <h3 className="text-sm text-gray-500 mb-4">공부 기록 안내</h3>
              <p className="text-lg font-black text-gray-800">
                공부 기록 집계 시간
              </p>
              <p className="mt-2">
                스터디 방에서 출석체크 후 스탑워치로 측정한 시간을
                표시합니다.출석체크를 누락하고 스탑워치를 사용할 경우 마지막으로
                출석을 체크한 날의 공부기록으로 합산될 수 있습니다.
              </p>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: "0px",
              transform: "translate3d(67px, 0px, 0px)",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
