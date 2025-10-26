import { Container } from "react-bootstrap";
import PublicNav from "../components/publicpages/PublicNav";
import LandingCarousel from "../components/publicpages/LandingCarousel";

function Landing() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <PublicNav />
      {/* Main Content */}
      <Container
        fluid
        style={{
          paddingTop: "100px",
          paddingBottom: "24px",
          maxWidth: "1400px",
        }}
      >
        <h1
          className="text-center mb-4 fw-bold"
          style={{ fontSize: "20px", paddingTop: "20px" }}
        >
          STATE OF HAWAII
        </h1>
        <h1 className="text-center mb-4 fw-bold" style={{ fontSize: "50px" }}>
          Office of Enterprise Technology Services
        </h1>
      </Container>
      <LandingCarousel />
      <Container style={{ paddingLeft: "60px", paddingRight: "60px" }}>
        <p style={{ paddingTop: "20px", fontSize: "30px" }}>ABOUT US</p>
        <p>
          The Office of Enterprise Technology Services (ETS) provides governance
          for executive branch IT projects and seeks to identify, prioritize and
          advance innovative initiatives with the greatest potential to increase
          efficiency, reduce waste, and improve transparency and accountability
          in state government.{" "}
        </p>
      </Container>
    </div>
  );
}

export default Landing;
