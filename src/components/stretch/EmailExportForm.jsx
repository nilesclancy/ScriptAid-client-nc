import React from "react";
import { Form, Button } from "react-bootstrap";

export function EmailExportForm() {
  return (
    <Form className="bg-dark text-white p-3 rounded">
      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter email..." />
      </Form.Group>
      <Button variant="primary">Send Transcript</Button>
    </Form>
  );
}
