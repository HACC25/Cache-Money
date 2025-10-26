import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.css";

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

          {/* Nav menu and login grouped together */}
          <div className="header-right">
            <div className="header-nav-menu">
              <ul className="header-nav-list">
                <li>
                  <Link to="/">Our ETS Project</Link>
                </li>
                <li>
                  <a href="/overview">Site Overview</a>
                </li>
                <li>
                  <Link to="/projects">View All Projects</Link>
                </li>
              </ul>
            </div>

            <div className="header-login-container">
              <Link to="/login">
                <button type="button" className="header-login-btn">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
