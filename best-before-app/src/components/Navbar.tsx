import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/home">Home</Link>
        </li>
        <li className="list-group-item">
          <Link to="/best-before">Best-before</Link>
        </li>
        <li className="list-group-item">
          <Link to="/shopping-list">Shopping list</Link>
        </li>
        <li className="list-group-item">
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
