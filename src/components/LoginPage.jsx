import { useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import { login } from "../services/authservice";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  }

  return (
    <Container className="py-5 text-white">
      <Button href="/" variant="warning" className="mb-4">
        Return to Homepage
      </Button>

      <Card bg="dark" text="light" className="p-4">
        <Card.Title className="mb-3">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
