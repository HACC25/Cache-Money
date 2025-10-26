import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

function LandingNav() {
  return (
    <Navbar
      bg="white"
      expand="lg"
      fixed="top"
      className="shadow-sm"
      style={{ padding: "16px 48px" }}
    >
      <Container fluid>
        <Navbar.Brand href="#" className="text-dark fw-medium">
          Site name
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center" style={{ gap: "32px" }}>
            <Nav.Link href="#" className="text-dark">
              ABOUT
            </Nav.Link>
            <Nav.Link href="#" className="text-dark">
              VIEW ALL PROJECTS
            </Nav.Link>
            <i
              className="bi bi-search"
              style={{
                fontSize: "20px",
                color: "black",
                cursor: "pointer",
              }}
            ></i>
            <Button
              variant="dark"
              style={{
                padding: "10px 24px",
                borderRadius: "8px",
                fontWeight: 500,
              }}
            >
              LOGIN PORTAL
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LandingNav;
