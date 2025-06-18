import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";

export function UploadTranscriptForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const response = await fetch("http://127.0.0.1:8000/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      navigate("/dashboard");
    } else {
      console.error("Upload failed.");
    }
  };

  return (
    <Container className="py-5 text-white">
      <Card bg="dark" text="light" className="p-4">
        <Card.Title className="mb-3">Upload Transcript</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Transcript Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={8}
              placeholder="Transcript Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-danger"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="outline-success">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
