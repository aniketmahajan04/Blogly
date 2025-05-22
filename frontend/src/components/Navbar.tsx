import { Link } from "react-router-dom";
import { Search, SquarePen, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { Button } from "./Button";

// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "About", path: "/About" },
// ];

const isActive = (path: string) => {
  return location.pathname === path;
};

export const Navbar = () => {
  // const [isDropdown, setIsDropdown] = useState(false);
  // const navigate = useNavigate();

  // function handleProfileClick() {
  //   navigate("/Profile")
  // }

  return (
    <header className="border-b border-[rgba(128,128,128,0.2)] z-50 right-0 left-0 top-0 relative">
      {/* Logo section */}
      <div className="container flex justify-between items-center px-4 py-2 mx-auto">
        {" "}
        {/* <Link to={"/"}>  className="flex items-center space-x-2" */}
        <span className="text-2xl font-Bold text-custom-ash-900">BlogAI</span>
        {/* </Link> */}
        <nav className="flex items-center space-x-8">
          <ul className="flex space-x-8">
            {/* {navItems.map((item) => ( */}
            <li>
              <div className="flex justify-center items-center bg-gray-100 rounded-xl">
                <Button
                  variant="NavButton"
                  icon={<Search className="mr-2" />}
                ></Button>
                <Input type="text" placeholder="Search..." />
              </div>
            </li>
            <li>
              <Link
                to={"/write"}
                className={
                  "font-medium transition-colors duration-200 text-custom-ash-900"
                }
              >
                {<SquarePen />}
              </Link>
            </li>
          </ul>

          <div className="relative group">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => alert("Click")}
            >
              {/* add logic id user had profile */}
              <div className="rounded-full w-10 h-10 flex items-center justify-center">
                <User />
              </div>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
