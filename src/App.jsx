import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";


const Home = lazy(() => import("./Pages/Home/Home"));
const Users= lazy(() => import("./Pages/Users/Users"));
const NotFound = lazy(() => import("./Pages/NotFound"));

function App() {
  const routes = createBrowserRouter([
    {path: "/login", element: <Login />},
    {path: "/register", element: <Register />},
    {
      path: "/",
      element:<Layout/>,
      children: [
        { index: true, element: <Home /> },
        {path:'/users-list', element:<Users/>},
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
