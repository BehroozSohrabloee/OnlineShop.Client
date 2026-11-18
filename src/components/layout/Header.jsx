import { Link, NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="site-header">
            <div className="container header-content">

                <Link to="/" className="logo">
                    OnlineShop
                </Link>

                <nav className="main-nav">
                    <NavLink to="/">صفحه اصلی</NavLink>
                    <NavLink to="/products">محصولات</NavLink>
                    <NavLink to="/categories">دسته‌بندی‌ها</NavLink>
                </nav>

                <div className="header-actions">
                    <Link to="/cart" className="cart-link">
                        سبد خرید
                    </Link>

                    <Link to="/account" className="account-link">
                        ورود / ثبت‌نام
                    </Link>
                </div>

            </div>
        </header>
    );
}

export default Header;