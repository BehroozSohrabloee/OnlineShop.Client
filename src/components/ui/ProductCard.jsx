
import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function formatPrice(price) {
    return new Intl.NumberFormat("fa-IR").format(price ?? 0);
}

function ProductCard({ product }) {
    const { addToCart } = useCart();

    const [isFavorite, setIsFavorite] = useState(false);
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState("");

    const handleAddToCart = async () => {
        if (!product.variantId) {
            setError("تنوع پیش‌فرض محصول مشخص نیست.");
            return;
        }

        if (product.stockQuantity <= 0) {
            setError("این تنوع محصول موجود نیست.");
            return;
        }

        try {
            setAdding(true);
            setError("");

            const variant = {
                id: product.variantId,
                stockQuantity: product.stockQuantity
            };

            await addToCart(product, variant, 1);

        } catch (err) {
            setError(err.message || "افزودن به سبد خرید ناموفق بود.");
        } finally {
            setAdding(false);
        }
    };

    return (
        <article className="product-card">

            <div className="product-image-wrapper">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                />

                {product.badge && (
                    <span className="product-badge">
                        {product.badge}
                    </span>
                )}

                <button
                    className={`favorite-button ${isFavorite ? "favorite-active" : ""}`}
                    onClick={() => setIsFavorite(!isFavorite)}
                    aria-label="افزودن به علاقه‌مندی‌ها"
                >
                    <Heart
                        size={19}
                        fill={isFavorite ? "currentColor" : "none"}
                    />
                </button>
            </div>

            <div className="product-info">

                <span className="product-category">
                    {product.category}
                </span>

                <h3>
                    <Link to={`/products/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>

                {product.rating != null && (
                    <div className="product-rating">
                        <Star size={15} fill="currentColor" />
                        <span>{product.rating}</span>
                    </div>
                )}

                <div className="product-prices">

                    {product.discountPrice != null ? (
                        <>
                            <span className="old-price">
                                {formatPrice(product.price)} تومان
                            </span>

                            <strong className="current-price">
                                {formatPrice(product.discountPrice)} تومان
                            </strong>
                        </>
                    ) : (
                        <strong className="current-price">
                            {formatPrice(product.price)} تومان
                        </strong>
                    )}

                </div>

                <button
                    className="add-to-cart-button"
                    onClick={handleAddToCart}
                    disabled={adding || !product.variantId || product.stockQuantity <= 0}
                >
                    <ShoppingCart size={17} />

                    {adding
                        ? "در حال افزودن..."
                        : product.stockQuantity <= 0
                            ? "ناموجود"
                            : "افزودن به سبد"}
                </button>

                {error && (
                    <p className="error-message">{error}</p>
                )}

            </div>
        </article>
    );
}

export default ProductCard;
