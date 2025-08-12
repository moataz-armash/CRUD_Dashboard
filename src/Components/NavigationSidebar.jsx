import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiHome,
  HiOutlineLogout,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";

const SidebarContent = ({ showLabels }) => {
  const { Logout, session } = useAuthContext();
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <Sidebar
      aria-label="Sidebar navigation"
      className={`h-screen fixed top-0 left-0 shadow-md bg-white z-50 p-4 
        ${showLabels ? "w-64" : "w-20"} 
        transition-all duration-300`}>
      {/* العنوان يظهر فقط في الشاشات الكبيرة */}
      {showLabels && (
        <h1 className="my-5 font-bold text-xl whitespace-nowrap text-white">
          CRUD DASHBOARD
        </h1>
      )}

      <div className="flex h-full flex-col justify-between py-2">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem
              href="/"
              icon={HiHome}
              data-active={pathName === "/"}
              className={`${
                showLabels
                  ? "p-2"
                  : "w-15 h-15 flex items-center justify-center"
              } 
             hover:bg-violet-400 focus:bg-violet-500 
             data-[active=true]:bg-violet-700 data-[active=true]:text-white 
              rounded-md mb-2.5`}>
              {showLabels && "Home"}
            </SidebarItem>

            <SidebarItem
              href="/users-list"
              icon={HiUsers}
              data-active={pathName === "/users-list"}
              className={`${
                showLabels
                  ? "p-2"
                  : "w-15 h-15 flex items-center justify-center"
              } 
                 hover:bg-violet-400 focus:bg-violet-500 
                data-[active=true]:bg-violet-700 data-[active=true]:text-white 
                  rounded-md mb-2.5`}>
              {showLabels && "Users"}
            </SidebarItem>

            <SidebarItem
              href=""
              icon={HiShoppingBag}
              className={`${
                showLabels
                  ? "p-2"
                  : "w-15 h-15 flex items-center justify-center"
              } 
             hover:bg-violet-400 focus:bg-violet-500 
             data-[active=true]:bg-violet-700 data-[active=true]:text-white 
              rounded-md mb-2.5`}>
              {showLabels && "Products"}
            </SidebarItem>

            <SidebarItem
              href=""
              icon={HiOutlineLogout}
              onClick={handleLogout}
              className="hover:bg-violet-400 ">
              {showLabels && "Logout"}
            </SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
      </div>
    </Sidebar>
  );
};

const NavigationSidebar = () => {
  const [showLabels, setShowLabels] = useState(true);

  // التحقق من حجم الشاشة عند التحميل والتغيير
  useEffect(() => {
    const handleResize = () => {
      setShowLabels(window.innerWidth >= 1024); // lg breakpoint
    };

    handleResize(); // عند أول تحميل
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      <SidebarContent showLabels={showLabels} />
    </div>
  );
};

export default NavigationSidebar;
