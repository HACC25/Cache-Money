function Nav() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: "white",
      }}
    >
      {/* Sticky Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#3B82F6", // Blue color
          padding: "16px 24px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        <h1
          style={{
            color: "white",
            margin: 0,
            fontSize: "24px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Create Landing Navbar
        </h1>
      </nav>
    </div>
  );
}

export default Nav;
