import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

function formatPrice(price) {
    return new Intl.NumberFormat("fa-IR").format(price);
}

function ProductCard({ product }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

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
                    <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
                </button>

            </div>

            <div className="product-info">

                <span className="product-category">
                    {product.category}
                </span>

                {/* <h3>{product.name}</h3> */}
                <h3>
                    <Link to={`/products/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>

                <div className="product-rating">
                    <Star size={15} fill="currentColor" />
                    <span>{product.rating}</span>
                </div>

                <div className="product-prices">

                    {product.discountPrice ? (
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
                    className={`add-to-cart-button ${isAdded ? "added" : ""}`}
                    onClick={() => setIsAdded(!isAdded)}
                >
                    <ShoppingCart size={17} />
                    {isAdded ? "به سبد اضافه شد" : "افزودن به سبد"}
                </button>

            </div>

        </article>
    );
}

export default ProductCard;