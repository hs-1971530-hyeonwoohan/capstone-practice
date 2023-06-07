import React from "react";
import { useRecoilState } from "recoil";
import { ActiveTapState } from "../../atoms/ActiveTapState";
import { HiOutlineTemplate, HiOutlineDocumentReport, HiOutlineChartPie, HiOutlineChatAlt, HiOutlineCalendar, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";

const navLinks = [
  {
    id: 0,
    title: "Dashboard",
    icon: <HiOutlineTemplate className="nav-icon" />,
    current:false

  },
  {
    id: 1,
    title: "Products",
    icon: <HiOutlineDocumentReport className="nav-icon" />,
    current:false
  },
  {
    id: 2,
    title: "Reports",
    icon: <HiOutlineChartPie className="nav-icon" />,
    current:false
  },
  {
    id: 3,
    title: "Messages",
    icon: <HiOutlineChatAlt className="nav-icon"/>,
    current:false
  },
  {
    id: 4,
    title: "Calendar",
    icon: <HiOutlineCalendar className="nav-icon" />,
    current:false
  },
  {
    id: 5,
    title: "Profile",
    icon: <HiOutlineCog className="nav-icon" />,
    current:false
  },
  {
    id: 6,
    title: "SignOut",
    icon: <HiOutlineLogout className="nav-icon" />,
    current:false
  },
  

];

function NavBar() {

  return (
    <nav className=" col-span-2 border-r border-gray-200 min-h-[h-auto] max-h-[auto] w-[80px] xl:w-[210px] px-1 flex flex-col items-start justify-around">
      <div className="w-full min-h-fit max-h-fit items-center">
        <div className="pb-10">
          <img
            src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt="Avatar user"
            className="w-10 md:w-16 rounded-full mx-auto cursor-pointer "
          />

          <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
            Unknown
          </h2>
          <p className="text-xs text-gray-500 text-center pb-5">
            Unknown
          </p>
        </div>
        <div className="space-y-10 w-full ">
          {navLinks.slice(0, 4).map((link) => (
            <NavItem data={link} key={`${link.id}`}/>
          ))}
          <div className="w-full border-t border-gray-200" />
          {navLinks.slice(4, 6).map((link) => (
            <NavItem data={link} key={`${link.id}`}/>
          ))}
        </div>  
      </div>
      <div className="w-full min-h-fit max-h-fit">

      </div>
    </nav>
  );
}

function NavItem({data}) {
  const id = data.id;
  const [activeNav, setActiveNav] = useRecoilState(ActiveTapState);
  
  const handleClick = () => {
    setActiveNav(id);
    console.log("현재 activeNav", activeNav);
    console.log("현재 누른 버튼 : ",  data.title);
    console.log("현재 누른 버튼의 id :", id);
  };
 
  return (
    <div
    onClick={handleClick}
    className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer ${activeNav === data.id ? 'border-gray-900 border-l-4' : 'group hover:border-gray-900 border-l-4 border-transparent'}`}
       
  >
    <span>{data.icon}</span>
    <h1
      className={(activeNav === data.id ? `text-black` : `text-gray-600 group-hover:text-black xl:flex hidden`
       )}
    >
      {data.title}
    </h1>
  </div>
  );
}



export default NavBar;
//
