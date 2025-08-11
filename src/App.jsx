import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { AuthContextProvider } from "./Context/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";

const Home = lazy(() => import("./Pages/Home/Home"));
const Users = lazy(() => import("./Pages/Users/Users"));
const NotFound = lazy(() => import("./Pages/NotFound"));

function App() {
  const routes = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "/users-list", element: <Users /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={routes} />
        <Toaster position="top-right" reverseOrder={false} />
      </AuthContextProvider>
    </>
  );
}

export default App;
