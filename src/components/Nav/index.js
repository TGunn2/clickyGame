import React from "react";
import NavFont from "../NavFont";
import "./style.css";

// Component for the Navbar

function Nav(props) {
  return (
    <nav className="navbar">
      <ul>
        <li className="brand">
          <a href="/">Clicky NBA Game</a>
        </li>
        <NavFont score={props.score} topScore={props.topScore} />
        <li>
          Score: {props.score} | Top Score: {props.topScore}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
