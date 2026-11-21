import { useState } from "react";
import { ImageOff } from "lucide-react";

function ProductGallery({ images, productName }) {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="product-gallery-empty">
                <ImageOff size={50} />
                <p>تصویری برای این محصول وجود ندارد.</p>
            </div>
        );
    }

    return (
        <div className="product-gallery">

            <div className="product-main-image">
                <img
                    src={images[selectedImage]}
                    alt={productName}
                />
            </div>

            <div className="product-thumbnails">

                {images.map((image, index) => (
                    <button
                        key={image}
                        className={
                            selectedImage === index
                                ? "thumbnail active"
                                : "thumbnail"
                        }
                        onClick={() => setSelectedImage(index)}
                    >
                        <img src={image} alt={`${productName} ${index + 1}`} />
                    </button>
                ))}

            </div>

        </div>
    );
}

export default ProductGallery;