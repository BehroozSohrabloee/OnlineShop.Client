import { Search, SlidersHorizontal } from "lucide-react";

function ProductFilters({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    sortBy,
    onSortChange,
    categories
}) {
    return (
        <div className="product-filters">

            <div className="filter-search">
                <Search size={19} />

                <input
                    type="search"
                    placeholder="نام محصول را جستجو کنید..."
                    value={searchTerm}
                    onChange={(event) => onSearchChange(event.target.value)}
                />
            </div>

            <div className="filter-group">

                <label htmlFor="category-filter">
                    دسته‌بندی:
                </label>

                <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(event) => onCategoryChange(event.target.value)}
                >
                    <option value="all">همه دسته‌بندی‌ها</option>

                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>

            </div>

            <div className="filter-group">

                <label htmlFor="sort-filter">
                    <SlidersHorizontal size={17} />
                    مرتب‌سازی:
                </label>

                <select
                    id="sort-filter"
                    value={sortBy}
                    onChange={(event) => onSortChange(event.target.value)}
                >
                    <option value="default">پیش‌فرض</option>
                    <option value="price-asc">ارزان‌ترین</option>
                    <option value="price-desc">گران‌ترین</option>
                    <option value="name">نام محصول</option>
                    <option value="rating">بالاترین امتیاز</option>
                </select>

            </div>

        </div>
    );
}

export default ProductFilters;