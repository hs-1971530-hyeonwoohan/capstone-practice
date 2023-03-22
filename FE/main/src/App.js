import { Outlet, Route, Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import DashBoard from "./pages/dashboard/DashBoard";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

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
  return (
    <RecoilRoot>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashBoard" element={<DashBoard />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>
          <Route path="loginForm" element={<Login />}/>
        </Routes>
      </div>
    </RecoilRoot>
  );
}

export default App;
