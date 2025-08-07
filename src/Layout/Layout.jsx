import { Outlet } from "react-router-dom";
import NavigationSidebar from "../Components/NavigationSidebar";
import MainBanner from "../Components/MainBanner.jsx";
import { UserContextProvider } from "../Context/UserContextProvider.jsx";


const Layout = () => {
  return (
    <>
  <UserContextProvider>
     <MainBanner />
        <div className="flex gap-10">
          <NavigationSidebar />

          <Outlet />
        </div>
  </UserContextProvider>
    </>
  );
};

export default Layout;
