
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ShoppingCart,
  UserRound,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const { totalItems, loading } = useCart();

  return (
    <>
      <header className="site-header">
        <div className="container header-content">
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="باز کردن منو"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <Link to="/" className="logo">
            Online<span>Shop</span>
          </Link>

          <div className="header-search">
            <Search size={19} />
            <input
              type="search"
              placeholder="جستجوی محصولات..."
              aria-label="جستجوی محصولات"
            />
          </div>

          <div className="header-actions">
            <Link to="/account" className="header-icon-link">
              <UserRound size={21} />
              <span>حساب کاربری</span>
            </Link>

            <Link to="/cart" className="cart-link">
              <ShoppingCart size={22} />

              {!loading && totalItems > 0 && (
                <span className="cart-count">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav className={`main-nav ${menuOpen ? "mobile-open" : ""}`}>
          <div className="container nav-content">
            <NavLink to="/" onClick={closeMenu}>
              صفحه اصلی
            </NavLink>

            <NavLink to="/products" onClick={closeMenu}>
              همه محصولات
            </NavLink>

            <NavLink to="/categories" onClick={closeMenu}>
              دسته‌بندی‌ها
            </NavLink>

            <Link to="/products" onClick={closeMenu}>
              پیشنهادهای ویژه
            </Link>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <button
          className="mobile-menu-backdrop"
          onClick={closeMenu}
          aria-label="بستن منو"
        />
      )}
    </>
  );
}

export default Header;
