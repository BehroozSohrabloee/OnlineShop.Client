
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat("fa-IR").format(price) + " تومان";

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>سبد خرید</h1>
        <p>سبد خرید شما خالی است.</p>
        <Link to="/products">مشاهده محصولات</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>سبد خرید</h1>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.variantId}>
            <img
              src={item.image}
              alt={item.name}
              className="cart-item-image"
            />

            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>{item.variantName}</p>
              <p>{formatPrice(item.price)}</p>

              <div className="cart-quantity">
                <button
                  onClick={() =>
                    updateQuantity(item.variantId, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.variantId, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.stockQuantity}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.variantId)}
              >
                حذف از سبد خرید
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>خلاصه سفارش</h2>
        <p>مبلغ کل: {formatPrice(totalPrice)}</p>

        <button onClick={clearCart}>
          خالی کردن سبد خرید
        </button>

        <button disabled>
          ادامه فرایند خرید
        </button>
      </div>
    </div>
  );
}
