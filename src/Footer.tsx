const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-8 border-t-4 border-blue-700" role="contentinfo">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Office of Enterprise Technology Services. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-400">
            Independent Verification and Validation Project Management System
          </p>
        </div>
      </footer>
);

export default Footer;