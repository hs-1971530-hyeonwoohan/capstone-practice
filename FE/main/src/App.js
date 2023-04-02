// App.js
import { Route, Routes, Outlet } from "react-router-dom";
import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Footer from "./components/footer/Footer";
import FreeBoard from "./components/freeboard/FreeBoard";
import TestBoard from "./components/freeboard/TestBoard";
import Header from "./components/header/Header";
import Post from "./components/post/Post";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import DashBoard from "./pages/dashboard/DashBoard";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import JobfinderBoard from "./pages/board/JobfinderBoard";


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
          <Route path="freeBoard" element={<FreeBoard/>}/>
          <Route path="test" element={<TestBoard/>}/>
          <Route path="post" element={<Post/>}/>

        </Route>
        <Route path="board" element={<JobfinderBoard />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
