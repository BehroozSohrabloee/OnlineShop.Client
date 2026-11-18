import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/home/HomePage";
import ProductsPage from "../pages/products/ProductsPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import NotFoundPage from "../pages/not-found/NotFoundPage";

function AppRoutes() {
    return (
        <Routes>

            <Route element={<MainLayout />}>

                <Route path="/" element={<HomePage />} />

                <Route path="/products" element={<ProductsPage />} />

                <Route path="/categories" element={<CategoriesPage />} />

            </Route>

            <Route path="*" element={<NotFoundPage />} />

        </Routes>
    );
}

export default AppRoutes;