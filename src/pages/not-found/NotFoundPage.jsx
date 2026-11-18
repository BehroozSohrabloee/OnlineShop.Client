import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <section className="page-container">
            <h1>صفحه مورد نظر پیدا !</h1>
            <Link to="/">بازگشت به صفحه اصلی</Link>
        </section>
    );
}

export default NotFoundPage;