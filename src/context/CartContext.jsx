import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("online-shop-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("online-shop-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, variant, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.variantId === variant.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.variantId === variant.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  variant.stockQuantity
                ),
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          image: product.images?.[0],
          variantName: variant.name,
          price: variant.discountPrice ?? variant.price,
          originalPrice: variant.price,
          quantity: Math.min(quantity, variant.stockQuantity),
          stockQuantity: variant.stockQuantity,
        },
      ];
    });
  };

  const removeFromCart = (variantId) => {
    setCartItems((items) =>
      items.filter((item) => item.variantId !== variantId)
    );
  };

  const updateQuantity = (variantId, quantity) => {
    setCartItems((items) =>
      items.map((item) =>
        item.variantId === variantId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(Number(quantity) || 1, item.stockQuantity)
              ),
            }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
