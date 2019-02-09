import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer>
                <div className="container">
                    <Link to="/" className="logo-font">BB BLOG</Link>
                    <span className="attribution">
                    An interactive learning project from <Link to="https://www.bravebits.co/">Brave Bits</Link>. Co &amp; design licensed under MIT.
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Footer;