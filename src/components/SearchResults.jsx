import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";

export function SearchResults() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const parsed = location.state?.parsed;

  if (!parsed) {
    return (
      <Container className="py-5 text-white text-center">
        <h2>File not found</h2>
        <p>No data received for file ID: {id}</p>
        <Button variant="warning" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5 text-white">
      <h2 className="mb-4">File Preview</h2>
      <Card bg="dark" text="light" className="mb-3 p-3">
        <Card.Title>{parsed.title || `Parsed #${id}`}</Card.Title>
        <Card.Body>
          <pre className="text-white">{parsed.extracted_text}</pre>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="outline-success"
          onClick={() =>
            navigate(`/export/${parsed.id}`, { state: { parsed } })
          }
        >
          Export File
        </Button>
        <Button variant="outline-danger" onClick={() => navigate("/dashboard")}>
          Cancel
        </Button>
      </div>
    </Container>
  );
}
