
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { cartService } from "../services/api/cartService";

const CartContext = createContext(null);

const CART_STORAGE_KEY = "online-shop-cart-id";

// تبدیل خروجی API به ساختار مورد استفاده React
function mapCartResponse(cart) {
  return (cart?.items ?? []).map((item) => ({
    id: item.id,
    cartItemId: item.id,
    productId: item.productId,
    variantId: item.productVariantId,
    name: item.productName,
    variantName: item.variantName,
    image: item.imageUrl,
    price: item.unitPrice,
    originalPrice: item.originalPrice,
    quantity: item.quantity,
    stockQuantity: item.stockQuantity,
  }));
}

export function CartProvider({ children }) {
  const [cartId, setCartId] = useState(
    () => localStorage.getItem(CART_STORAGE_KEY)
  );

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ذخیره شناسه سبد خرید
  const saveCartId = useCallback((id) => {
    localStorage.setItem(CART_STORAGE_KEY, id);
    setCartId(id);
  }, []);

  // دریافت اطلاعات سبد از API
  const applyCart = useCallback((cart) => {
    if (!cart) {
      setCartItems([]);
      return;
    }

    setCartItems(mapCartResponse(cart));
  }, []);

  // ایجاد یا دریافت سبد خرید
  const getOrCreateCart = useCallback(async () => {
    if (cartId) {
      const cart = await cartService.getCart(cartId);
      return cartId;
    }

    const result = await cartService.createCart();
    const newCartId = result.cartId ?? result.id;

    if (!newCartId) {
      throw new Error("شناسه سبد خرید از سرور دریافت نشد.");
    }

    saveCartId(newCartId);
    return newCartId;
  }, [cartId, saveCartId]);

  // بارگذاری اولیه سبد خرید
  useEffect(() => {
    let cancelled = false;

    async function loadCart() {
      if (!cartId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const cart = await cartService.getCart(cartId);

        if (!cancelled) {
          applyCart(cart);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [cartId, applyCart]);

  // افزودن محصول به سبد خرید
  const addToCart = async (product, variant, quantity = 1) => {
    if (!variant?.id) {
      throw new Error("تنوع محصول معتبر نیست.");
    }

    if (quantity <= 0) {
      throw new Error("تعداد محصول باید بیشتر از صفر باشد.");
    }

    const id = await getOrCreateCart();

    const cart = await cartService.addItem(
      id,
      variant.id,
      quantity
    );

    applyCart(cart);
    return cart;
  };

  // تغییر تعداد محصول
  const updateQuantity = async (cartItemId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(cartItemId);
    }

    const cart = await cartService.updateItem(
      cartId,
      cartItemId,
      quantity
    );

    applyCart(cart);
  };

  // حذف محصول
  const removeFromCart = async (cartItemId) => {
    const cart = await cartService.removeItem(
      cartId,
      cartItemId
    );

    applyCart(cart);
  };

  // خالی کردن سبد
  const clearCart = async () => {
    const cart = await cartService.clearCart(cartId);
    applyCart(cart);
  };

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ),
    [cartItems]
  );

  const totalDiscount = useMemo(
    () => cartItems.reduce(
      (sum, item) =>
        sum + (item.originalPrice - item.price) * item.quantity,
      0
    ),
    [cartItems]
  );

  const value = {
    cartId,
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    totalDiscount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart باید داخل CartProvider استفاده شود.");
  }

  return context;
}
