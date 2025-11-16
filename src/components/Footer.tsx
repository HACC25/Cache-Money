import "./Footer.css";

const Footer = () => (
  <footer className="footer-main">
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <a href="https://ets.hawaii.gov/" target="_blank" rel="noopener noreferrer">
            <img
              src="./ets-logo.png"
              alt="ETS logo"
            />
            <span className="footer-brand-title">State of Hawaii</span>
          </a>
          <div className="footer-brand-subtitle">
            Office of Enterprise Technology Services
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-section">
            <h2>About Us</h2>
            <ul>
              <li>
                <a href="https://ets.hawaii.gov/about/">Staff Biographies</a>
              </li>
              <li>
                <a href="https://ets.hawaii.gov/contact/">Contact Us</a>
              </li>
              <li>
                <a href="https://ets.hawaii.gov/site-map/">Site Map</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h2>Policies</h2>
            <ul>
              <li>
                <a href="https://portal.ehawaii.gov/terms-of-use.html">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="https://ets.hawaii.gov/accessibility-statement/">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="https://portal.ehawaii.gov/privacy-policy.html">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h2>Contact</h2>
            <ul>
              <li>
                <a>(808) 586-6000</a>
              </li>
              <li>
                <a href="mailto:ets@hawaii.gov">ets@hawaii.gov</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <span className="footer-copyright">
          Copyright © {new Date().getFullYear()}{", "}
          <a href="http://portal.ehawaii.gov/">State of Hawaii</a>. All Rights
          Reserved.
        </span>

        <div className="footer-social">
          <a
            href="https://www.facebook.com/ETSHawaii"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook page"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-gray-600"
              viewBox="0 0 8 19"
            >
              <path
                fillRule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Facebook page</span>
          </a>
          <a
            href="https://x.com/ETSHIgov/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X page"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-gray-600"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="sr-only">X page</span>
          </a>
          <a
            href="https://www.instagram.com/hawaiiets/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram page"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-gray-600"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0C7.284 0 6.944.012 5.877.06 4.813.11 4.086.278 3.45.525a4.902 4.902 0 0 0-1.772 1.153A4.902 4.902 0 0 0 .525 3.45C.278 4.086.11 4.813.06 5.877.012 6.944 0 7.284 0 10s.012 3.056.06 4.123c.05 1.064.218 1.791.465 2.427a4.902 4.902 0 0 0 1.153 1.772 4.902 4.902 0 0 0 1.772 1.153c.636.247 1.363.415 2.427.465C6.944 19.988 7.284 20 10 20s3.056-.012 4.123-.06c1.064-.05 1.791-.218 2.427-.465a4.902 4.902 0 0 0 1.772-1.153 4.902 4.902 0 0 0 1.153-1.772c.247-.636.415-1.363.465-2.427.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.05-1.064-.218-1.791-.465-2.427a4.902 4.902 0 0 0-1.153-1.772A4.902 4.902 0 0 0 16.55.525C15.914.278 15.187.11 14.123.06 13.056.012 12.716 0 10 0zm0 1.802c2.67 0 2.986.01 4.04.058.975.045 1.504.207 1.857.344.467.181.8.398 1.15.748.35.35.567.683.748 1.15.137.353.299.882.344 1.857.048 1.054.058 1.37.058 4.04s-.01 2.986-.058 4.04c-.045.975-.207 1.504-.344 1.857-.181.467-.398.8-.748 1.15-.35.35-.683.567-1.15.748-.353.137-.882.299-1.857.344-1.054.048-1.37.058-4.04.058s-2.986-.01-4.04-.058c-.975-.045-1.504-.207-1.857-.344a3.097 3.097 0 0 1-1.15-.748 3.097 3.097 0 0 1-.748-1.15c-.137-.353-.299-.882-.344-1.857-.048-1.054-.058-1.37-.058-4.04s.01-2.986.058-4.04c.045-.975.207-1.504.344-1.857.181-.467.398-.8.748-1.15.35-.35.683-.567 1.15-.748.353-.137.882-.299 1.857-.344 1.054-.048 1.37-.058 4.04-.058z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M10 13.333a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666zm0-8.468a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27zm6.538-.203a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Instagram page</span>
          </a>
          <a
            href="https://www.youtube.com/oimthigov"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-gray-600"
              viewBox="0 0 20 14"
            >
              <path
                fillRule="evenodd"
                d="M19.615 3.184c-.23-.86-.905-1.538-1.762-1.769C16.291.998 10 .998 10 .998s-6.291 0-7.853.417c-.857.231-1.533.909-1.762 1.769C.001 4.75.001 8.002.001 8.002s0 3.252.384 4.818c.229.86.905 1.508 1.762 1.739C3.709 15 10 15 10 15s6.291 0 7.853-.441c.857-.231 1.532-.879 1.762-1.739.384-1.566.384-4.818.384-4.818s0-3.252-.384-4.818zM8 11V5l5.196 3L8 11z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">YouTube page</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
