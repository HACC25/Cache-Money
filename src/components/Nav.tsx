import { Link } from "react-router-dom";
import "./Navbar.css";
import React from "react";

const Header = () => {
  return (
    <header>
      <nav className="header-nav">
        <div className="header-container">
          <a href="/" className="header-logo">
            <img
              src="https://ets.hawaii.gov/wp-content/uploads/2020/08/ETS-Logo-B-w-ETS-process4-border-71x71-1.png"
              alt="ETS logo"
            />
            <span>State of Hawaii</span>
          </a>

          <div className="header-login-container">
            <Link to="/login">
              <button type="button" className="header-login-btn">
                Log In
              </button>
            </Link>
          </div>

          <div className="header-nav-menu">
            <ul className="header-nav-list">
              <li>
                <a href="#" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
