import React from "react";
import { navLinks } from "./utils/NavDB";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { ActiveTapState } from "../../atoms/ActiveTapState";


function NavBar() {
  return (
    <nav className=" col-span-2 border-r border-gray-200 min-h-[90vh] max-h-[90vh] w-[80px] xl:w-[210px] px-1 flex flex-col items-start justify-around">
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
            <NavItem link={link} key={link.id} />
          ))}
          <div className="w-full border-t border-gray-200" />
          {navLinks.slice(4, 6).map((link) => (
            <NavItem link={link} key={link.id} />
          ))}
        </div>
      </div>
      <div className="w-full min-h-fit max-h-fit">

      </div>
    </nav>
  );
}

function NavItem({ link }) {
  const [activeNav, setActiveNav] = useRecoilState(ActiveTapState);
  return (
    <div
      onClick={() => setActiveNav(link.id) + console.log(activeNav === link.id) }
      className={`w-full flex items-center justify-start space-x-8 px-5 cursor-pointer
       group hover:border-gray-900 border-l-4 border-transparent ${
         activeNav === link.id && 'border-gray-900' 
       } `}
    >
      <span>{link.icon}</span>
      <h1
        className={`text-gray-600 group-hover:text-black xl:flex hidden ${
          activeNav === link.id && "text-black "
        } `}
      >
        {link.title}
      </h1>
    </div>
  );
}

export default NavBar;
//
