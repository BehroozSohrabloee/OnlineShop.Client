
export const getProducts = async ({
    pageNumber = 1,
    pageSize = 8,
    searchTerm = "",
    sortBy = "CreatedAt",
    sortDescending = true,
    signal
} = {}) => {
    const API_BASE_URL = "https://localhost:7222/api/Products";

    const params = new URLSearchParams({
        PageNumber: String(pageNumber),
        PageSize: String(pageSize),
        SortBy: sortBy,
        SortDescending: String(sortDescending)
    });

    if (searchTerm.trim()) {
        params.set("SearchTerm", searchTerm.trim());
    }

    const response = await fetch(`${API_BASE_URL}?${params}`, {
        signal
    });

    if (!response.ok) {
        throw new Error(
            `خطا در دریافت محصولات. کد وضعیت: ${response.status}`
        );
    }

    return response.json();
};


export const getProductById = async (productId, { signal } = {}) => {
    if (!productId) {
        throw new Error("شناسه محصول معتبر نیست.");
    }

    const response = await fetch(
      `https://localhost:7222/api/Products/${encodeURIComponent(productId)}`,
        { signal }
    );

    if (!response.ok) {
        throw new Error(
            `خطا در دریافت جزئیات محصول. کد وضعیت: ${response.status}`
        );
    }

    return response.json();
};

