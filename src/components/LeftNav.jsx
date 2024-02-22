import React from "react";
import { AiFillHome } from "react-icons/ai";
import { SiApplemusic } from "react-icons/si";
import { MdLibraryMusic } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <nav className="flex flex-col gap-5 my-4">
      <div className="flex items-center">
        <img src="/logo.png" alt="logo" className="w-12 h-12" />
        <h1 className="text-3xl capitalize font-bold bg-gradient-to-r from-red-500 via-rose-500 to-white bg-clip-text text-transparent">
          songly
        </h1>
      </div>
      <ul className="flex flex-col items-start gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            "flex items-center gap-2 text-xl p-2 " +
            (isActive ? "text-rose-500 font-bold" : "text-inherit font-normal")
          }
        >
          <AiFillHome />
          <p className={`capitalize`}>home</p>
        </NavLink>
        <li className="flex items-center gap-2 text-xl p-2">
          <SiApplemusic />
          <p className="capitalize">made for you</p>
        </li>
        <li className="flex items-center gap-2 text-xl p-2">
          <MdLibraryMusic />
          <p className="capitalize">playlist</p>
        </li>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            "flex items-center gap-2 text-xl p-2 " +
            (isActive ? "text-rose-500 font-bold" : "text-inherit font-normal")
          }
        >
          <IoAddCircleSharp />
          <p className={`capitalize`}>add music</p>
        </NavLink>
      </ul>
    </nav>
  );
};

export default LeftNav;
