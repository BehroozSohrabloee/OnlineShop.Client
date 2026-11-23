
import { useEffect, useState } from "react";
import { PackageSearch } from "lucide-react";

import ProductCard from "../../components/ui/ProductCard";
import ProductFilters from "../../components/ui/ProductFilters";
import { getProducts } from "../../services/api/productService";

const PAGE_SIZE = 8;

function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);

    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const sortOptions = {
                    default: {
                        sortBy: "CreatedAt",
                        sortDescending: true
                    },
                    "price-asc": {
                        sortBy: "Price",
                        sortDescending: false
                    },
                    "price-desc": {
                        sortBy: "Price",
                        sortDescending: true
                    },
                    name: {
                        sortBy: "Name",
                        sortDescending: false
                    }
                };

                const sorting = sortOptions[sortBy] ?? sortOptions.default;

                const response = await getProducts({
                    pageNumber: currentPage, pageSize: PAGE_SIZE, searchTerm, ...sorting, signal: controller.signal
                });

                // // پشتیبانی از ساختار Result و PagedResult
                // const result = response.value ?? response.data ?? response;
                // const pageData = result.value ?? result.data ?? result;

                // if (response.isSuccess === false || result.isSuccess === false) {
                //     throw new Error(
                //         response.error?.message ??
                //         result.error?.message ??
                //         "دریافت محصولات ناموفق بود."
                //     );
                // }

                // const items = pageData.items ?? pageData.Items ?? [];

                // دریافت مستقیم اطلاعات صفحه‌بندی‌شده از API
                const items = response.items ?? [];

                const mappedProducts = items.map((product) => ({
                    ...product,
                    category: product.categoryName,
                    image: product.primaryImageUrl,
                    variantId: product.defaultVariantId
                }));

                setProducts(mappedProducts);

                setTotalCount(response.totalCount ?? items.length);

                setTotalPages(
                    response.totalPages ??
                    Math.ceil((response.totalCount ?? items.length) / PAGE_SIZE)
                );

                // const mappedProducts = items.map((product) => ({
                //     ...product,
                //     id: product.id,
                //     name: product.name,
                //     category: product.categoryName,
                //     image: product.primaryImageUrl,
                //     price: product.price ?? 0,
                //     discountPrice: product.discountPrice,
                //     stockQuantity: product.stockQuantity,
                //     variantId: product.defaultVariantId
                // }));

                // setProducts(mappedProducts);
                // setTotalCount(
                //     pageData.totalCount ??
                //     pageData.TotalCount ??
                //     items.length
                // );
                // setTotalPages(
                //     pageData.totalPages ??
                //     pageData.TotalPages ??
                //     Math.ceil(
                //         (pageData.totalCount ?? pageData.TotalCount ?? items.length)
                //         / PAGE_SIZE
                //     )
                // );
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "خطا در دریافت محصولات");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        return () => controller.abort();
    }, [searchTerm, currentPage, sortBy]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
        setCurrentPage(1);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("all");
        setSortBy("default");
        setCurrentPage(1);
    };

    return (
        <div className="products-page container">

            <div className="products-page-heading">
                <div>
                    <span>فروشگاه OnlineShop</span>
                    <h1>همه محصولات</h1>
                    <p>
                        محصولات مورد نظر خود را جستجو و انتخاب کنید.
                    </p>
                </div>

                <div className="products-heading-icon">
                    <PackageSearch size={42} />
                </div>
            </div>

            <ProductFilters
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                categories={[]}
            />

            <div className="products-result-info">
                <span>
                    تعداد محصولات: {totalCount}
                </span>
            </div>

            {loading ? (
                <div className="products-empty-state">
                    <p>در حال دریافت محصولات...</p>
                </div>
            ) : error ? (
                <div className="products-empty-state">
                    <PackageSearch size={55} />
                    <h2>دریافت محصولات با خطا مواجه شد</h2>
                    <p>{error}</p>
                    <button onClick={() => setCurrentPage(1)}>
                        تلاش مجدد
                    </button>
                </div>
            ) : products.length > 0 ? (
                <div className="products-grid">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ) : (
                <div className="products-empty-state">
                    <PackageSearch size={55} />
                    <h2>محصولی پیدا نشد!</h2>
                    <p>
                        عبارت جستجو یا فیلترهای انتخابی را تغییر دهید.
                    </p>
                    <button onClick={clearFilters}>
                        پاک کردن فیلترها
                    </button>
                </div>
            )}

            {!loading && !error && totalPages > 1 && (
                <div className="pagination">

                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((page) => page - 1)}
                    >
                        قبلی
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (
                        <button
                            key={page}
                            className={currentPage === page ? "active" : ""}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((page) => page + 1)}
                    >
                        بعدی
                    </button>

                </div>
            )}

        </div>
    );
}

export default ProductsPage;
