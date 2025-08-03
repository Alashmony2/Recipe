import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import logo from "../../assets/image/logo.png";
import { Link, Outlet } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 640);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsOpen(window.innerWidth >= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-full bg-[#F4F2EE] dark:bg-gray-900">
      <div className="fixed top-4 right-4 z-50">
        <div className="p-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg">
          <DarkModeToggle />
        </div>
      </div>
      
      {isOpen && (
        <motion.div
          initial={{ x: isMobile ? -250 : 0 }}
          animate={{ x: isOpen ? 0 : -250 }}
          transition={{ type: "spring", stiffness: 100 }}
          className={`h-screen sticky top-0 left-0 w-64 bg-[#F9FAFB] dark:bg-gray-800 p-4 z-40 ${isMobile ? 'left-0' : 'relative'}`}
        >
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-600"
            >
              ✖
            </button>
          )}
          <div className="text-lg font-bold mb-4">
            <img src={logo} alt="Logo"/>
          </div>
          <ul className="space-y-5 flex-1">
            <li>
              <Link 
                to="/" 
                className="dark:text-white dark:hover:bg-gray-700 text-gray-700 p-2 pl-6 w-full block bg-[#F29724] dark:bg-orange-600 rounded-xl shadow-lg shadow-[#f29524c9] text-lg font-semibold hover:scale-105 transition-all"
              >
                <i className="fa-solid fa-utensils mr-2"></i>Meals
              </Link>
            </li>
            <li>
              <Link 
                to="/" 
                className="dark:text-white dark:hover:bg-gray-700 p-2 pl-6 block w-full border border-gray-300 dark:border-gray-600 rounded-xl hover:scale-105 transition-all"
              >
                <i className="fa-solid fa-carrot mr-2"></i> Ingredients
              </Link>
            </li>
            <li>
              <Link 
                to="/" 
                className="dark:text-white dark:hover:bg-gray-700 p-2 pl-6 block w-full border border-gray-300 dark:border-gray-600 rounded-xl hover:scale-105 transition-all"
              >
                <i className="fa-solid fa-globe-americas mr-2"></i> Areas
              </Link>
            </li>
          </ul>
        </motion.div>
      )}

      <div className="fixed top-4 left-4 z-50 sm:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-lg"
        >
          <Menu className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
      </div>

      <div className={`flex-1 p-6 transition-all duration-300 ${isOpen ? 'mt-10' : 'mt-16'}`}>
        <Outlet/>
        
      </div>
    </div>
  );
}
