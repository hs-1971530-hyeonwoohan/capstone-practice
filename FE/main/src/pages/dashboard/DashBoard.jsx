import React from "react";
import DashLeft from "../../components/dashLeft/DashLeft";
import DashRight from "../../components/dashRight/DashRight";
import NavBar from "../../components/navbar/NavBar";
import { ActiveTapState } from "../../atoms/ActiveTapState";
import { useRecoilState } from "recoil";

function DashBoard() {
  const [activeNav, setActiveNav] = useRecoilState(ActiveTapState);

  return (
    <div>
      <div className="w-full min-h-[h-screen] grid grid-cols-12">
        <NavBar />
        <div className="grid grid-cols-1 xl:grid-cols-5 w-full col-span-10">
          <DashLeft />
          <DashRight />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
