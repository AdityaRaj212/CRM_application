import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../../my-app/src/Frontend/pages/home/Home";
import Single from "../../my-app/src/Frontend/pages/single/Single";
import New from "../../my-app/src/Frontend/pages/new/New";
import Register from "../../my-app/src/Frontend/pages/register/Register";
import Login from "../../my-app/src/Frontend/pages/login/Login";
import Product from "../../my-app/src/Frontend/pages/product/Product";
import Customers from "../../my-app/src/Frontend/pages/customers/Customers";
import { userInputs, productInputs } from "../../my-app/src/formData";
import "./style/dark.scss";
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
    path: "/products/:productId",
    element: <Single />,
  },
  {
    path: "/users",
    element: <Customers />,
  },
  {
    path: "/products",
    element: <Product />,
  },
  {
    path: "/users/:userId/new",
    element: <New inputs={userInputs} title={"Add New User"} />,
  },
  {
    path: "/products/:productId/new",
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
]);

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;