import { useMemo, useState } from "react";
import { PackageSearch } from "lucide-react";

import ProductCard from "../../components/ui/ProductCard";
import ProductFilters from "../../components/ui/ProductFilters";
import { sampleProducts } from "../../data/sampleProducts";

const categories = [
    { id: 1, name: "صوتی و تصویری" },
    { id: 2, name: "لوازم دیجیتال" },
    { id: 3, name: "پوشاک" }
];

const PAGE_SIZE = 8;

function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = useMemo(() => {
        let result = [...sampleProducts];

        // Search
        if (searchTerm.trim()) {
            result = result.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(searchTerm.trim().toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== "all") {
            result = result.filter(
                (product) => product.category === selectedCategory
            );
        }

        // Sorting
        switch (sortBy) {
            case "price-asc":
                result.sort(
                    (a, b) =>
                        (a.discountPrice ?? a.price) -
                        (b.discountPrice ?? b.price)
                );
                break;

            case "price-desc":
                result.sort(
                    (a, b) =>
                        (b.discountPrice ?? b.price) -
                        (a.discountPrice ?? a.price)
                );
                break;

            case "name":
                result.sort((a, b) =>
                    a.name.localeCompare(b.name, "fa")
                );
                break;

            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;

            default:
                break;
        }

        return result;
    }, [searchTerm, selectedCategory, sortBy]);

    const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

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
                categories={categories}
            />

            <div className="products-result-info">
                <span>
                    تعداد محصولات: {filteredProducts.length}
                </span>
            </div>

            {paginatedProducts.length > 0 ? (
                <div className="products-grid">

                    {paginatedProducts.map((product) => (
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

                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("all");
                            setSortBy("default");
                            setCurrentPage(1);
                        }}
                    >
                        پاک کردن فیلترها
                    </button>
                </div>
            )}

            {totalPages > 1 && (
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