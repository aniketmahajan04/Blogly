import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const navItems = [
  { name: 'Home', path: '/' },
  { name: "Categories", path: "/categories" },
  { name: "About", path: "/About" }
]

const isActive = (path: string) => {
  return location.pathname === path;
}

export const Navbar = () => {
  // const [isDropdown, setIsDropdown] = useState(false);
  const navigate = useNavigate();

  function handleProfileClick() {
    navigate("/Profile")
  }

  return (
    <header className="border-b z-50 right-0 left-0 top-0 fixed">
      
      {/* Logo section */}
      <div className="container flex justify-between items-center px-4 py-4 mx-auto">
        {/* <Link to={"/"}>  className="flex items-center space-x-2" */}
          <span className="text-2xl font-Bold text-custom-ash-900">BlogAI</span>
        {/* </Link> */}

            <nav className="flex items-center space-x-8">
              <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  {/* <Link */}
                  {/*   to={item.path} */}
                  {/*   className={`font-medium transition-colors duration-200 ${ */}
                  {/*    isActive(item.path)  */}
                  {/*        ? "text-red-400 font-semibold" */}
                  {/*         : "text-custom-ash-900" */}
                  {/*    }`} */}
                {/* > */}
                    {item.name}
                  {/* </Link> */}
                </li>
              ))}
              </ul>

              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none"
                  onClick={handleProfileClick}
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
  )
}
