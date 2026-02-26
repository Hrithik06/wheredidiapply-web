import type { FC } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
const NavBar: FC = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Button className="bg-violet-600">
              <Link to={"/"}>Home</Link>
            </Button>
          </li>
          <li>
            <Button>
              <Link to={"/dashboard"}>Dashboard</Link>
            </Button>
          </li>
          <li>
            <Button>
              <Link to={"/login"}>Login</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
