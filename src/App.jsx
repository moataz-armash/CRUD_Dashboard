
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Register from './Components/Register/Register'
import Login from './Components/Login/Login'

import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";

const Home = lazy(() => import("./Pages/Home/Home"));
const Users = lazy(() => import("./Pages/Users/Users"));
const NotFound = lazy(() => import("./Pages/NotFound"));

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/users-list", element: <Users /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>

     <Register/>
     <Login/>

      <RouterProvider router={routes} />

    </>
  );
}

export default App;
