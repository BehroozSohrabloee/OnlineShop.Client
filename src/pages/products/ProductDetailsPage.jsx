import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
    ShoppingCart,
    ShieldCheck,
    Truck,
    Package,
    Minus,
    Plus,
    Star
} from "lucide-react";

import ProductGallery from "../../components/products/ProductGallery";
import ProductVariants from "../../components/products/ProductVariants";

import { sampleProductDetails } from "../../data/sampleProductDetails";
import { useCart } from "../../context/CartContext";

function formatPrice(price) {
    return new Intl.NumberFormat("fa-IR").format(price);
}

function ProductDetailsPage() {
    const { productId } = useParams();
    const { addToCart } = useCart();

    const normalizedProductId = productId.replace(/^product-/, "");
    const product = sampleProductDetails.find(
        (item) =>
            item.id.replace(/^product-/, "") === normalizedProductId
    );

    const [quantity, setQuantity] = useState(1);

    const [selectedVariantId, setSelectedVariantId] = useState(
        product?.variants.find((variant) => variant.isDefault)?.id ??
        product?.variants[0]?.id
    );

    const handleAddToCart = () => {
        if (!selectedVariant) {
            alert("لطفاً یک تنوع محصول انتخاب کنید.");
            return;
        }

        if (selectedVariant.stockQuantity <= 0) {
            alert("این محصول موجود نیست.");
            return;
        }

        addToCart(product, selectedVariant, quantity);

        alert("محصول به سبد خرید اضافه شد.");
    };

    if (!product) {
        return (
            <div className="container product-not-found">
                <h2>محصول مورد نظر پیدا نشد.</h2>
                <Link to="/products">بازگشت به محصولات</Link>
            </div>
        );
    }

    const selectedVariant = product.variants.find(
        (variant) => variant.id === selectedVariantId
    );

    if (!selectedVariant) {
        return null;
    }

    const currentPrice =
        selectedVariant.discountPrice ?? selectedVariant.price;

    const handleVariantChange = (variantId) => {
        setSelectedVariantId(variantId);
        setQuantity(1);
    };

    const increaseQuantity = () => {
        if (quantity < selectedVariant.stockQuantity) {
            setQuantity((current) => current + 1);
        }
    };

    const decreaseQuantity = () => {
        setQuantity((current) => Math.max(1, current - 1));
    };

    // const handleAddToCart = () => {
    //     alert(
    //         `${product.name} - ${selectedVariant.name} - تعداد ${quantity} عدد`
    //     );
    // };

    return (
        <div className="product-details-page container">

            <div className="breadcrumb">
                <Link to="/">صفحه اصلی</Link>
                <span>/</span>
                <Link to="/products">محصولات</Link>
                <span>/</span>
                <span>{product.name}</span>
            </div>

            <div className="product-details-layout">

                <ProductGallery
                    images={product.images}
                    productName={product.name}
                />

                <div className="product-details-info">

                    <span className="details-category">
                        {product.category}
                    </span>

                    <h1>{product.name}</h1>

                    <div className="details-rating">
                        <Star size={17} fill="currentColor" />
                        <span>{product.rating}</span>
                        <span>امتیاز کاربران</span>
                    </div>

                    <p className="product-short-description">
                        {product.shortDescription}
                    </p>

                    <ProductVariants
                        variants={product.variants}
                        selectedVariantId={selectedVariantId}
                        onSelect={handleVariantChange}
                    />

                    <div className="selected-variant-info">
                        <span>شناسه کالا:</span>
                        <strong>{selectedVariant.sku}</strong>
                    </div>

                    <div className="product-stock">

                        <Package size={19} />

                        {selectedVariant.stockQuantity > 0 ? (
                            <span>
                                موجودی: {selectedVariant.stockQuantity} عدد
                            </span>
                        ) : (
                            <span className="stock-unavailable">
                                این تنوع در حال حاضر موجود نیست.
                            </span>
                        )}

                    </div>

                    <div className="details-price">

                        {selectedVariant.discountPrice && (
                            <span className="details-old-price">
                                {formatPrice(selectedVariant.price)} تومان
                            </span>
                        )}

                        <strong>
                            {formatPrice(currentPrice)} تومان
                        </strong>

                    </div>

                    {selectedVariant.stockQuantity > 0 && (
                        <div className="purchase-actions">

                            <div className="quantity-control">

                                <button
                                    onClick={increaseQuantity}
                                    disabled={quantity >= selectedVariant.stockQuantity}
                                    aria-label="افزایش تعداد"
                                >
                                    <Plus size={17} />
                                </button>

                                <span>{quantity}</span>

                                <button
                                    onClick={decreaseQuantity}
                                    disabled={quantity <= 1}
                                    aria-label="کاهش تعداد"
                                >
                                    <Minus size={17} />
                                </button>

                            </div>

                            <button
                                className="details-add-cart"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart size={19} />
                                افزودن به سبد خرید
                            </button>

                        </div>
                    )}

                    <div className="details-benefits">

                        <div>
                            <Truck size={20} />
                            <span>ارسال سریع سفارش</span>
                        </div>

                        <div>
                            <ShieldCheck size={20} />
                            <span>ضمانت اصالت کالا</span>
                        </div>

                    </div>

                </div>

            </div>

            <section className="product-description-section">

                <h2>توضیحات محصول</h2>

                <p>{product.description}</p>

            </section>

            <section className="product-attributes-section">

                <h2>مشخصات محصول</h2>

                <div className="attributes-list">

                    {product.attributes.map((attribute, index) => (
                        <div className="attribute-row" key={index}>

                            <span>{attribute.name}</span>

                            <strong>{attribute.value}</strong>

                        </div>
                    ))}

                </div>

            </section>

        </div>
    );
}

export default ProductDetailsPage;
