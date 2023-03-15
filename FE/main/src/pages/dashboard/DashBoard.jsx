import React from "react";

function DashBoard() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="w-full min-h-[90vh] grid grid-cols-12">
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
