
import { useEffect, useState } from "react";
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
import { getProductById } from "../../services/api/productService";
import { useCart } from "../../context/CartContext";

function formatPrice(price) {
    return new Intl.NumberFormat("fa-IR").format(price ?? 0);
}

function isGuid(value) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

// تبدیل خروجی API به ساختار مورد استفاده کامپوننت‌های فعلی
function mapProductDetails(data) {
    const images = [...(data.images ?? [])]
        .sort((a, b) => {
            if (a.isPrimary !== b.isPrimary) {
                return a.isPrimary ? -1 : 1;
            }

            return a.displayOrder - b.displayOrder;
        })
        .map(image => image.imageUrl)
        .filter(Boolean);

    return {
        ...data,
        category: data.categoryName,
        images,
        variants: (data.variants ?? []).map(variant => ({
            ...variant,
            name: variant.name || variant.sku,
            images: (variant.images ?? [])
                .map(image => image.imageUrl)
                .filter(Boolean)
        })),
        attributes: (data.attributes ?? []).map(attribute => ({
            name: attribute.attributeName,
            value: attribute.value ?? attribute.optionName ?? "-"
        }))
    };
}

function ProductDetailsPage() {
    const { productId } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [selectedVariantId, setSelectedVariantId] = useState("");
    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [addingToCart, setAddingToCart] = useState(false);
    const [cartError, setCartError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadProduct() {
            try {
                setLoading(true);
                setError("");
                setProduct(null);
                setSelectedVariantId("");
                setQuantity(1);

                let loadedProduct;

                if (isGuid(productId)) {
                    // محصولات واقعی دیتابیس
                    const data = await getProductById(productId, {
                        signal: controller.signal
                    });

                    loadedProduct = mapProductDetails(data);
                } else {
                    // حفظ سازگاری با محصولات نمونه صفحه اصلی
                    const normalizedId = productId?.replace(/^product-/, "");

                    loadedProduct = sampleProductDetails.find(
                        item =>
                            item.id.replace(/^product-/, "") === normalizedId
                    );
                }

                if (!loadedProduct) {
                    throw new Error("محصول مورد نظر پیدا نشد.");
                }

                if (!controller.signal.aborted) {
                    setProduct(loadedProduct);

                    const variants = loadedProduct.variants ?? [];

                    const availableDefault = variants.find(
                        variant =>
                            variant.isDefault &&
                            variant.isActive !== false &&
                            variant.stockQuantity > 0
                    );

                    const firstAvailable = variants.find(
                        variant =>
                            variant.isActive !== false &&
                            variant.stockQuantity > 0
                    );

                    const defaultVariant = variants.find(
                        variant =>
                            variant.isDefault &&
                            variant.isActive !== false
                    );

                    const selectedVariant =
                        availableDefault ||
                        firstAvailable ||
                        defaultVariant ||
                        variants[0];

                    setSelectedVariantId(selectedVariant?.id ?? "");
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setError(err.message || "خطا در دریافت اطلاعات محصول.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadProduct();

        return () => controller.abort();
    }, [productId]);

    const selectedVariant = product?.variants?.find(
        variant => variant.id === selectedVariantId
    );

    const currentPrice = selectedVariant
        ? selectedVariant.discountPrice ?? selectedVariant.price
        : 0;

    const handleVariantChange = (variantId) => {
        setSelectedVariantId(variantId);
        setQuantity(1);
        setCartError("");
    };

    const increaseQuantity = () => {
        if (
            selectedVariant &&
            quantity < selectedVariant.stockQuantity
        ) {
            setQuantity(current => current + 1);
        }
    };

    const decreaseQuantity = () => {
        setQuantity(current => Math.max(1, current - 1));
    };

    const handleAddToCart = async () => {
        if (!selectedVariant) {
            setCartError("لطفاً یک تنوع محصول انتخاب کنید.");
            return;
        }

        if (selectedVariant.stockQuantity <= 0) {
            setCartError("این تنوع محصول موجود نیست.");
            return;
        }

        try {
            setAddingToCart(true);
            setCartError("");

            await addToCart(product, selectedVariant, quantity);

            alert("محصول با موفقیت به سبد خرید اضافه شد.");
        } catch (err) {
            setCartError(err.message || "افزودن محصول به سبد خرید ناموفق بود.");
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="container">
                <p>در حال دریافت اطلاعات محصول...</p>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container product-not-found">
                <h2>{error || "محصول مورد نظر پیدا نشد."}</h2>
                <Link to="/products">بازگشت به محصولات</Link>
            </div>
        );
    }

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

                    {product.rating != null && (
                        <div className="details-rating">
                            <Star size={17} fill="currentColor" />
                            <span>{product.rating}</span>
                            <span>امتیاز کاربران</span>
                        </div>
                    )}

                    <p className="product-short-description">
                        {product.shortDescription}
                    </p>

                    {product.variants?.length > 0 && (
                        <ProductVariants
                            variants={product.variants}
                            selectedVariantId={selectedVariantId}
                            onSelect={handleVariantChange}
                        />
                    )}

                    {selectedVariant && (
                        <>
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

                                {selectedVariant.discountPrice != null && (
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
                                            disabled={
                                                quantity >= selectedVariant.stockQuantity
                                            }
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
                                        onClick={handleAddToCart}
                                        disabled={addingToCart}
                                    >
                                        <ShoppingCart size={19} />
                                        {addingToCart
                                            ? "در حال افزودن..."
                                            : "افزودن به سبد خرید"}
                                    </button>

                                </div>
                            )}

                            {cartError && (
                                <p className="error-message">{cartError}</p>
                            )}
                        </>
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
                    {product.attributes?.map((attribute, index) => (
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
