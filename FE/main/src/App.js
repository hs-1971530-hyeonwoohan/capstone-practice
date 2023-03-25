// App.js
import { Route, Routes, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import DashBoard from "./pages/dashboard/DashBoard";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { isAuthenticatedAtom } from "./atoms/IsAuthenticatedAtom";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashBoard" element={<PrivateRoute />}>
            <Route index element={<DashBoard />} />
          </Route>
          <Route path="calendar" element={<PrivateRoute />}>
            <Route index element={<Calendar />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
