import React from "react";
import { LuSearch } from "react-icons/lu";

const HeaderSearch = () => {
  return (
    <header className="flex items-center bg-[#1b1d20] px-4 py-2 rounded-3xl gap-4">
      <LuSearch />
      <input
        type="search"
        name=""
        id=""
        placeholder="type song name"
        className="bg-[#1b1d20] focus:outline-none"
      />
    </header>
  );
};

export default HeaderSearch;
