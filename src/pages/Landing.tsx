import { Container } from "react-bootstrap";
import LandingNav from "../components/LandingNav";

function Landing() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <LandingNav />

      {/* Main Content */}
      <Container
        fluid
        style={{
          paddingTop: "100px",
          paddingBottom: "24px",
          maxWidth: "1400px",
        }}
      >
        <h2 className="text-center mb-4" style={{ fontSize: "32px" }}>
          Welcome to the Landing Page
        </h2>
      </Container>
    </div>
  );
}

export default Landing;
