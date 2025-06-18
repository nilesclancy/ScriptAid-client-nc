import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <div className="mb-4">
        <Logo size={200} />
        <h1 className="mt-3 text-white">ScriptAid</h1>
      </div>

      <div>
        <Button
          variant="success"
          className="me-2"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button variant="dark" onClick={() => navigate("/register")}>
          Register
        </Button>
      </div>
    </Container>
  );
}
