import React from "react";
import VideoRoomComponent from "../VideoRoomComponent";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedAtom } from "../../../../atoms/IsAuthenticatedAtom";
import { useNavigate, Navigate } from "react-router-dom";

function RoutingRoom() {
  const location = useLocation();
  const state = location.state || {};
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);
  const navigate = useNavigate();

  return (
    isAuthenticated ? (
        <div>
      {console.log("state:", state)}
      {console.log("state.sessionNaem:", state.sessionName)}
      {console.log("state.sessionNaem:", state.makeSession)}
      <VideoRoomComponent
        sessionName={state.sessionName}
        makeSession={state.makeSession}
      />
    </div>
      ) : (
        <Navigate
          to="/login"
          replace
          state={{ from: location }}
        />
      )
  );
}

export default RoutingRoom;

