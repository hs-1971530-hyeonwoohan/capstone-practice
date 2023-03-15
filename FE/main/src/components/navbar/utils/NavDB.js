import { HiOutlineTemplate, HiOutlineDocumentReport, HiOutlineChartPie, HiOutlineChatAlt, HiOutlineCalendar, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";

export const navLinks = [
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
    title: "Settings",
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