import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Logo } from "./Logo";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  function goToHomePage() {
    navigate("/");
  }
  return (
    <Navbar expand="lg" variant="dark" className="bg-grey">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Navbar.Brand href="/">
          <Logo size={48} />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/upload" className="text-white px-5 nav-link-custom">
            Upload Transcript
          </Nav.Link>
          <Nav.Link href="/profile" className="text-white px-5 nav-link-custom">
            Profile
          </Nav.Link>
          <Nav.Link href="/files" className="text-white px-5 nav-link-custom">
            My Files
          </Nav.Link>
          <Nav.Link
            href="/dashboard"
            className="text-white px-5 nav-link-custom"
          >
            Dashboard
          </Nav.Link>
        </Nav>
        <Button variant="dark" className="ms-3" onClick={goToHomePage}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}
