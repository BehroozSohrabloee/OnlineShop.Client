function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <p>
                    © {new Date().getFullYear()} OnlineShop
                    - تمامی حقوق محفوظ است.
                </p>
            </div>
        </footer>
    );
}

export default Footer;