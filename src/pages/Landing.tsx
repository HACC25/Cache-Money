import LandingNav from "../components/LandingNav";
function Landing() {
  return (
    <div
      style={{
        margin: 0,
        minHeight: "100vh",
        backgroundColor: "white",
      }}
    >
      <nav>
        <LandingNav />
      </nav>
      {/* Main Content */}
      <main
        style={{
          padding: "100px 24px 24px 24px",
          maxWidth: "1400px",
          margin: "0 auto",
          backgroundColor: "white",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "16px",
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
          }}
        >
          Welcome to the Landing Page
        </h2>
      </main>
    </div>
  );
}

export default Landing;
