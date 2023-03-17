import { getStoredCart } from "../../utilities/fakedb";

export const ProductsAndCartLoaders = async () => {
  const productsData = await fetch("products.json");
  const products = await productsData.json();

  // Get Cart
  const savedCart = getStoredCart();
  const previousCart = [];
  console.log(savedCart);
  for (const id in savedCart) {
    console.log(id);
    const addedProduct = products.find(product => product.id === id);
    if(addedProduct){
        const quantity = savedCart[id];
        addedProduct.quantity = quantity;
        previousCart.push(addedProduct);
    }
  }
  return {products, previousCart};
};
