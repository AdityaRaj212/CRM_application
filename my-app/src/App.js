import {
  createBrowserRouter,
  RouterProvider,
  Route,
 } from "react-router-dom";
import Home from "./Frontend/pages/home/Home"
import Customers from "./Frontend/pages/customers/Customers";
import Product from "./Frontend/pages/product/Product";
import New from "./Frontend/pages/new/New";
import Single from "./Frontend/pages/single/Single";
import Register from "./Frontend//pages/register/Register";
import Login from "./Frontend/pages/login/Login";
import Overview from './Frontend/Overview/Overview';
import Architecture from './Frontend/Architecture/Architecture';
import CandidateList from './Frontend/CandidateList/CandidateList';
import { userInputs, productInputs } from "../../my-app/src/formData";
import "./Frontend/style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../my-app/src/Frontend/context/darkModeContext";
import { DarkModeReducer } from "../../my-app/src/Frontend/context/darkModeReducer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users/:userId",
    element: <Single />,
  },
  {
    path: "/product/:productId",
    element: <Single />,
  },
  {
    path: "/users",
    element: <Customers />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/users/:userId/new",
    element: <New inputs={userInputs} title={"Add New User"} />,
  },
  {
    path: "/product/:productId/new",
    element: <New inputs={productInputs} title={"Add New Product"} />,
  },

  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/candidatelist",
    element: <CandidateList />,
  },
])

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      {/* <Overview /> */}
      {/* <Architecture /> */}
      {/* <CandidateList /> */}
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
