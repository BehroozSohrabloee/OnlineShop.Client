import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ArrowLeftCircle,
    ShieldCheck,
    Truck,
    Headphones,
    CreditCard,
    Search
} from "lucide-react";

import ProductCard from "../../components/ui/ProductCard";
import { sampleProducts } from "../../data/sampleProducts";

const categories = [
    { id: 1, name: "لوازم دیجیتال", icon: "💻" },
    { id: 2, name: "موبایل و تبلت", icon: "📱" },
    { id: 3, name: "پوشاک", icon: "👕" },
    { id: 4, name: "خانه و آشپزخانه", icon: "🏠" },
    { id: 5, name: "ورزش و سفر", icon: "⚽" },
    { id: 6, name: "زیبایی و سلامت", icon: "✨" }
];

function HomePage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = sampleProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home-page">

            <section className="hero-section">

                <div className="container hero-content">

                    <div className="hero-text">

                        <span className="hero-label">
                            تجربه خرید آسان و مطمئن
                        </span>

                        <h1>
                            خرید هوشمندانه،
                            <br />
                            زندگی بهتر
                        </h1>

                        <p>
                            جدیدترین محصولات را با بهترین قیمت و
                            تجربه‌ای متفاوت از خرید آنلاین تهیه کنید.
                        </p>

                        <Link to="/products" className="hero-button">
                            مشاهده محصولات
                            <ArrowLeft size={19} />
                        </Link>

                    </div>

                    <div className="hero-visual">
                        <div className="hero-circle">
                            <img
                                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=900"
                                alt="محصولات دیجیتال"
                            />
                        </div>

                        <div className="hero-floating-card">
                            <span>✨</span>
                            <div>
                                <strong>انتخاب‌های جذاب</strong>
                                <small>برای سبک زندگی شما</small>
                            </div>
                        </div>
                    </div>

                </div>

            </section>

            <section className="features-section container">

                <div className="feature-item">
                    <Truck />
                    <div>
                        <strong>ارسال سریع</strong>
                        <span>تحویل مطمئن سفارش</span>
                    </div>
                </div>

                <div className="feature-item">
                    <ShieldCheck />
                    <div>
                        <strong>ضمانت کیفیت</strong>
                        <span>خرید با اطمینان</span>
                    </div>
                </div>

                <div className="feature-item">
                    <CreditCard />
                    <div>
                        <strong>پرداخت امن</strong>
                        <span>پرداخت آسان و مطمئن</span>
                    </div>
                </div>

                <div className="feature-item">
                    <Headphones />
                    <div>
                        <strong>پشتیبانی مشتریان</strong>
                        <span>همراه شما هستیم</span>
                    </div>
                </div>

            </section>

            <section className="categories-section container">

                <div className="section-heading">
                    <div>
                        <span>دسته‌بندی‌ها</span>
                        <h2>خرید بر اساس دسته‌بندی</h2>
                    </div>

                    <Link to="/categories">
                        مشاهده همه
                        <ArrowLeft size={17} />
                    </Link>
                </div>

                <div className="categories-grid">

                    {categories.map((category) => (
                        <Link
                            to="/categories"
                            className="category-card"
                            key={category.id}
                        >
                            <span className="category-icon">
                                {category.icon}
                            </span>

                            <strong>{category.name}</strong>

                            <ArrowLeftCircle size={19} />
                        </Link>
                    ))}

                </div>

            </section>

            <section className="products-section container">

                <div className="section-heading">
                    <div>
                        <span>منتخب فروشگاه</span>
                        <h2>محصولات پرفروش</h2>
                    </div>

                    <Link to="/products">
                        مشاهده همه محصولات
                        <ArrowLeft size={17} />
                    </Link>
                </div>

                <div className="product-search">
                    <Search size={18} />

                    <input
                        type="search"
                        placeholder="جستجو در محصولات این بخش..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="empty-search">
                        محصولی با این نام پیدا نشد.
                    </p>
                )}

            </section>

            <section className="bottom-banner container">
                <div>
                    <span>پیشنهادهای ویژه</span>
                    <h2>انتخاب‌های جذاب با قیمت‌های بهتر</h2>
                    <p>محصولات منتخب فروشگاه را از دست ندهید.</p>
                </div>

                <Link to="/products">
                    مشاهده پیشنهادها
                    <ArrowLeft size={18} />
                </Link>
            </section>

        </div>
    );
}

export default HomePage;