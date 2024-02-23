import { useState } from "react";
import logo from "../assets/logo.jpg";

export default function Header({ modalFn, cartCnt }) {
  return (
    <div className="flex justify-between pt-10 px-40">
      <div className="flex justify-evenly">
        <img
          src={logo}
          alt="Logo"
          className="w-14 h-14 rounded-full border-2 border-yellow-600"
        />
        <h1 className="text-yellow-600 font-bold ml-5 pt-2 text-3xl">
          MEAL APP
        </h1>
      </div>

      <button className="text-yellow-600" onClick={modalFn}>
        Cart<span> ({cartCnt})</span>
      </button>
    </div>
  );
}
