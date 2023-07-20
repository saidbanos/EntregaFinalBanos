import { useState, useEffect, createContext } from "react";

export const CartContext = createContext({
  cart: [],
  total: 0,
  quantityTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });
  const [total, setTotal] = useState(() => {
    const localData = localStorage.getItem("total");
    return localData ? parseFloat(localData) : 0;
  });
  const [quantityTotal, setQuantityTotal] = useState(() => {
    const localData = localStorage.getItem("quantityTotal");
    return localData ? parseInt(localData) : 0;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total.toString());
    localStorage.setItem("quantityTotal", quantityTotal.toString());
  }, [cart, total, quantityTotal]);

  const addProduct = (item, quantity) => {
    const productExistente = cart.find((prod) => prod.item.id === item.id);

    if (!productExistente) {
      setCart((prev) => [...prev, { item, quantity }]);
      setQuantityTotal((prev) => prev + quantity);
      setTotal(
        (prev) => Math.round((prev + item.price * quantity) * 100) / 100
      );
    } else {
      const cartActualizado = cart.map((prod) => {
        if (prod.item.id === item.id) {
          return { ...prod, quantity: prod.quantity + quantity };
        } else {
          return prod;
        }
      });
      setCart(cartActualizado);
      setQuantityTotal((prev) => prev + quantity);
      setTotal(
        (prev) => Math.round((prev + item.price * quantity) * 100) / 100
      );
    }
  };

  const removeProduct = (id) => {
    const productEliminado = cart.find((prod) => prod.item.id === id);
    const cartActualizado = cart.filter((prod) => prod.item.id !== id);
    setCart(cartActualizado);
    setQuantityTotal((prev) => prev - productEliminado.quantity);
    setTotal(
      (prev) =>
        Math.round(
          (prev - productEliminado.item.price * productEliminado.quantity) * 100
        ) / 100
    );
  };

  const emptyCart = () => {
    setCart([]);
    setQuantityTotal(0);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        quantityTotal,
        addProduct,
        removeProduct,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
