
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    loading,
    error,
  } = useCart();

  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  const formatPrice = (price) =>
    new Intl.NumberFormat("fa-IR").format(price) + " تومان";

  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  const totalDiscount = originalTotal - totalPrice;

  // اجرای امن عملیات سبد خرید
  const handleCartAction = async (action) => {
    try {
      setActionLoading(true);
      setActionError("");

      await action();
    } catch (err) {
      setActionError(err.message || "خطا در انجام عملیات سبد خرید");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="cart-page">
        <p>در حال دریافت اطلاعات سبد خرید...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-page">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page cart-empty">
        <ShoppingBag size={64} />

        <h1>سبد خرید شما خالی است</h1>

        <p>هنوز محصولی به سبد خرید خود اضافه نکرده‌اید.</p>

        <Link to="/products" className="continue-shopping">
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>سبد خرید</h1>
        <span>{cartItems.length} محصول</span>
      </div>

      {actionError && (
        <p className="error-message">{actionError}</p>
      )}

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.cartItemId}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <h3>{item.name}</h3>

                <p>تنوع: {item.variantName}</p>

                <div className="cart-item-prices">
                  <strong>{formatPrice(item.price)}</strong>

                  {item.originalPrice > item.price && (
                    <del>{formatPrice(item.originalPrice)}</del>
                  )}
                </div>

                <div className="cart-quantity">
                  <button
                    onClick={() =>
                      handleCartAction(() =>
                        updateQuantity(
                          item.cartItemId,
                          item.quantity - 1
                        )
                      )
                    }
                    disabled={actionLoading || item.quantity <= 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      handleCartAction(() =>
                        updateQuantity(
                          item.cartItemId,
                          item.quantity + 1
                        )
                      )
                    }
                    disabled={
                      actionLoading ||
                      item.quantity >= item.stockQuantity
                    }
                  >
                    +
                  </button>
                </div>

                <p className="cart-stock">
                  موجودی: {item.stockQuantity} عدد
                </p>
              </div>

              <div className="cart-item-actions">
                <strong>
                  {formatPrice(item.price * item.quantity)}
                </strong>

                <button
                  className="remove-cart-item"
                  onClick={() =>
                    handleCartAction(() =>
                      removeFromCart(item.cartItemId)
                    )
                  }
                  disabled={actionLoading}
                  aria-label="حذف محصول"
                >
                  <Trash2 size={18} />
                  حذف
                </button>
              </div>
            </div>
          ))}

          <button
            className="clear-cart-button"
            onClick={() => handleCartAction(clearCart)}
            disabled={actionLoading}
          >
            {actionLoading ? "در حال انجام..." : "خالی کردن سبد خرید"}
          </button>
        </div>

        <aside className="cart-summary">
          <h2>خلاصه سفارش</h2>

          <div className="summary-row">
            <span>مبلغ کالاها</span>
            <span>{formatPrice(originalTotal)}</span>
          </div>

          <div className="summary-row discount">
            <span>تخفیف</span>
            <span>{formatPrice(totalDiscount)}</span>
          </div>

          <div className="summary-total">
            <span>مبلغ قابل پرداخت</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>

          <button className="checkout-button" disabled>
            ادامه فرایند خرید
          </button>

          <Link to="/products" className="continue-shopping">
            ادامه خرید
          </Link>
        </aside>
      </div>
    </div>
  );
}
