import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 p-5 text-white">
      <h3>Github Search</h3>

      <span>
        <Link to={"/"}> Home</Link>
        <Link to={"/favorites"}> Favorites</Link>
      </span>
    </nav>
  );
};

export default Navigation;
