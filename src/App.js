import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import About from "./Components/About/About";
import Inventory from "./Components/Inventory/Inventory";
import Main from "./Components/Layout/Main";
import { ProductsAndCartLoaders } from "./Components/loaders/ProductsAndCartLoaders";
import Login from "./Components/Login/Login";
import Orders from "./Components/Orders/Orders";
import Shipping from "./Components/Shipping/Shipping";
import Shop from "./Components/Shop/Shop";
import SignUp from "./Components/SignUp/SignUp";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: async () => fetch("products.json"),
          element: <Shop></Shop>,
        },
        {
          path: "/orders",
          // loader: async () => {
          //   return ("products.json");
          // },
          loader: ProductsAndCartLoaders,
          element: (
            <PrivateRoute>
              <Orders></Orders>
            </PrivateRoute>
          ),
        },
        {
          path: "/about",
          element: <About></About>,
        },
        {
          path: "/inventory",
          element: (
            <PrivateRoute>
              <Inventory></Inventory>
            </PrivateRoute>
          ),
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/shipping",
          element: <PrivateRoute><Shipping></Shipping></PrivateRoute>,
        },
        {
          path: "/signup",
          element: <SignUp></SignUp>,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
