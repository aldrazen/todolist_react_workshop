import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-[750px] flex flex-row justify-between items-center border rounded-lg border-neutral-300 max-w-7xl my-5 px-10 py-5 bg-slate-50">
      <h1 className="text-2xl font-semibold">My Notes</h1>
      <div>
        <ul className="flex flex-row gap-x-5">
          <li>
            <Link to={"/"} className="text-2xl font-semibold hover:opacity-70">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/add-to-do"} className="text-2xl font-semibold hover:opacity-70">
              Add To Do's
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
