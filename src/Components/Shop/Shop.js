import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, getStoredCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const products = useLoaderData()
  // const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   // console.log("Products load before fetch");
  //   fetch("products.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //       // console.log("Products Loaded")
  //     });
  // }, []);



  useEffect(() => {
    // console.log("Local Storage first LINE", products);

    const storedCart = getStoredCart();
    // console.log(storedCart);
    const savedCart = [];
    for (const id in storedCart) {
      // console.log(id);
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
        // console.log(addedProduct);
      }
    }
    setCart(savedCart);
    // console.log("Local Storage Finished")
  }, [products]);

  const handleClick = (SelectedProduct) => {
    // console.log(product);
    // Not USE: cart.push(product)
    let newCart = [];

    const exists = cart.find((product) => product.id === SelectedProduct.id);
    // console.log(exists);
    if (!exists) {
      SelectedProduct.quantity = 1;
      newCart = [...cart, SelectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== SelectedProduct.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDb(SelectedProduct.id);
  };

  const clearCart = () => {
    setCart([]);
    addToDb();    
    // window.location.reload();

  }

  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.id}
            handleAddToCart={handleClick}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart clearCart={clearCart} cart={cart}>
          <Link to={'/orders'}>
            <button>Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
