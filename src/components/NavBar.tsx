import type { FC } from "react";
import { Link } from "react-router";

const NavBar: FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
