import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../contexts/Authcontext";

const Auth = () => {
  const [userName, setUserName] = useState("");
  const { Authstate, Authdispatch } = useContext(AuthContext);
  const handelStart = async () => {
    localStorage.setItem("userName", userName);
    Authdispatch({ type: "signUp", payload: { userName } });
  };
  return (
    <section className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md">
      <div className="border flex flex-col items-center p-8 gap-4 rounded-lg shadow-md shadow-white bg-gradient-to-br from-slate-300 via-gray-300 to-neutral-300">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl capitalize font-bold">welcome to </h1>
          <div className="flex items-center gap-2">
            <img src="/songly/logo.png" alt="logo" className="w-12 h-12" />
            <h1 className="text-4xl capitalize font-bold">songLy</h1>
          </div>
        </div>
        <h3 className="text-xl font-medium">
          Lightweight music app. Just upload and play
        </h3>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center bg-transparent border border-neutral-600 rounded-3xl px-6 py-4 text-4xl gap-2">
            <FaUserCircle />
            <input
              type="text"
              name=""
              id=""
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-transparent focus:outline-none placeholder:capitalize placeholder:font-semibold"
              placeholder="enter your username"
            />
          </div>
          <button
            type="button"
            onClick={handelStart}
            className="capitalize px-4 py-2 text-xl font-bold bg-stone-600 text-white rounded-2xl"
          >
            get started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
