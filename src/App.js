import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import About from "./Components/About/About";
import Inventory from "./Components/Inventory/Inventory";
import Main from "./Components/Layout/Main";
import { ProductsAndCartLoaders } from "./Components/loaders/ProductsAndCartLoaders";
import Orders from "./Components/Orders/Orders";
import Shop from "./Components/Shop/Shop";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          loader: async() => fetch("products.json"),
          element: <Shop></Shop>
        },
        {
          path: "/orders",
          // loader: async () => {
          //   return ("products.json");
          // },
          loader: ProductsAndCartLoaders,
          element: <Orders></Orders>
        },
        {
          path: "/about",
          element: <About></About>
        },
        {
          path: "/inventory",
          element: <Inventory></Inventory>
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
