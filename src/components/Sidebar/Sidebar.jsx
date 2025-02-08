import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import  logo from "../../assets/image/logo.png"
import { Link, Outlet } from "react-router-dom";

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
    <div className="flex h-full bg-[#F4F2EE]">
      {/* Sidebar */}
      {isOpen && (
        <motion.div
          initial={{ x: isMobile ? -250 : 0 }}
          animate={{ x: isOpen ? 0 : -250 }}
          transition={{ type: "spring", stiffness: 100 }}
          className={`h-screen sticky top-0 left-0     w-64 bg-[#F9FAFB]  p-4 z-50  ${isMobile ? 'left-0' : 'relative'}`}
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
          <ul className="space-y-5">
            <Link color="warning" className=" text-white p-2 pl-6 w-full block bg-[#F29724] rounded-xl shadow-lg shadow-[#f29524c9] text-lg font-semibold hover:scale-105 transition-all"><i className="fa-solid fa-utensils mr-2"></i>Meals</Link>
            <Link className="p-2 pl-6 block w-full border border-gray-300 rounded-xl hover:scale-105 transition-all"><i className="fa-solid fa-utensils mr-2 "></i> Ingrediant</Link>
            <Link className="p-2 pl-6 block w-full border border-gray-300 rounded-xl hover:scale-105 transition-all"><i className="fa-solid fa-utensils mr-2"></i> Area</Link>
          </ul>
        </motion.div>
      )}

      {/* Open Button (Visible only on small screens) */}
      {isMobile && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md fixed top-4 left-4 z-50"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all duration-300 ${isOpen ? 'mt-10' : 'mt-16'}`}>
        <Outlet/>
        
      </div>
    </div>
  );
}
