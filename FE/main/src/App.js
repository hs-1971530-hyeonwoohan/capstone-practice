import { Outlet } from 'react-router-dom';
import './App.css';
import DashLeft from './components/dashLeft/DashLeft';
import DashRight from './components/dashRight/DashRight';
import Footer from './components/footer/Footer';
import Header from "./components/header/Header";
import NavBar from "./components/navbar/NavBar";
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';

const Layout = () => {
  return (
    <div>
      <Header/>

      <Outlet/>

      <Footer/>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <div>
      <Header/>
      </div>
      <div className='w-full min-h-[90vh] grid grid-cols-12'>
        <NavBar/>
        <div className='grid grid-cols-1 xl:grid-cols-5 w-full col-span-10'>
          <DashLeft/>
          <DashRight/>
        </div>
      </div>
      <Home/>
      <Profile/>
    </div>
  );
}

export default App;
