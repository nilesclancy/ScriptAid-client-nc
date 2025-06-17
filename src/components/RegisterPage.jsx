import { useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authservice";

export function RegisterPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  }

  return (
    <Container className="py-5 text-white">
      <Button href="/" variant="warning" className="mb-4">
        Return to Homepage
      </Button>

      <Card bg="dark" text="light" className="p-4">
        <Card.Title className="mb-3">Register</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
