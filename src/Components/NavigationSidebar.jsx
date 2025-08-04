import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiHome,
  HiOutlineLogout,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";
import { useLocation } from "react-router-dom";

const SidebarContent = ({ showLabels }) => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <Sidebar
      aria-label="Sidebar navigation"
      className="h-screen w-20 lg:w-64 fixed top-0 left-0 shadow-md bg-white z-50 p-6"
    >
      <h1 className="hidden md:block  my-5 font-bold text-2xl">
        CRUD DASHBORD
      </h1>
      <div className="flex h-full flex-col justify-between py-2">
        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem
              href="/"
              icon={HiHome}
              data-active={pathName === "/"}
              className="hover:bg-violet-400 focus:bg-violet-500 data-[active=true]:bg-violet-700 data-[active=true]:text-white rounded-md mb-2.5 "
            >
              {showLabels && "Home"}
            </SidebarItem>
            <SidebarItem
              href="/users-list"
              icon={HiUsers}
                data-active={pathName === "/users-list"}
              className="hover:bg-violet-400 focus:bg-violet-500 data-[active=true]:bg-violet-700 data-[active=true]:text-white rounded-md mb-2.5"
            >
              {showLabels && "Users"}
            </SidebarItem>
            <SidebarItem
              href=""
              icon={HiShoppingBag}
              className="hover:bg-violet-400 focus:bg-violet-500 data-[active=true]:bg-violet-700 data-[active=true]:text-white rounded-md mb-2.5"
            >
              {showLabels && "Products"}
            </SidebarItem>
            <SidebarItem href="" icon={HiOutlineLogout}>
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

  // Check screen width on load and resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowLabels(true); // lg and up
      } else {
        setShowLabels(false); // md and below
      }
    };

    handleResize(); // run on load
    window.addEventListener("resize", handleResize); // run on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (always fixed) */}
      <SidebarContent showLabels={showLabels} />
    </div>
  );
};

export default NavigationSidebar;
