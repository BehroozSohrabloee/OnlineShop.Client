import { Check } from "lucide-react";

function ProductVariants({ variants, selectedVariantId, onSelect }) {
    return (
        <div className="product-variants">

            <h3>انتخاب تنوع محصول</h3>

            <div className="variant-options">

                {variants.map((variant) => {

                    const selected = variant.id === selectedVariantId;
                    const outOfStock = variant.stockQuantity <= 0;

                    return (
                        <button
                            key={variant.id}
                            className={[
                                "variant-option",
                                selected ? "selected" : "",
                                outOfStock ? "out-of-stock" : ""
                            ].join(" ")}
                            disabled={outOfStock}
                            onClick={() => onSelect(variant.id)}
                        >
                            <span>{variant.name}</span>

                            {selected && <Check size={17} />}

                            {outOfStock && (
                                <small>ناموجود</small>
                            )}
                        </button>
                    );
                })}

            </div>

        </div>
    );
}

export default ProductVariants;