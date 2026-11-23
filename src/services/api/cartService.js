
const API_BASE_URL = "https://localhost:7222/api/cart";


async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.message || "خطا در ارتباط با سرور"
    );
  }

  return response.json();
}

export const cartService = {
  async createCart() {
    return request(API_BASE_URL, {
      method: "POST",
    });
  },

  async getCart(cartId) {
    return request(`${API_BASE_URL}/${cartId}`);
  },

  async addItem(cartId, productVariantId, quantity) {
    return request(`${API_BASE_URL}/${cartId}/items`, {
      method: "POST",
      body: JSON.stringify({
        productVariantId,
        quantity,
      }),
    });
  },

  async updateItem(cartId, cartItemId, quantity) {
    return request(
      `${API_BASE_URL}/${cartId}/items/${cartItemId}`,
      {
        method: "PUT",
        body: JSON.stringify({ quantity }),
      }
    );
  },

  async removeItem(cartId, cartItemId) {
    return request(
      `${API_BASE_URL}/${cartId}/items/${cartItemId}`,
      {
        method: "DELETE",
      }
    );
  },

  async clearCart(cartId) {
    return request(`${API_BASE_URL}/${cartId}/items`, {
      method: "DELETE",
    });
  },
};
