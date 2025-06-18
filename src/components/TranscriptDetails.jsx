import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { parseTranscript } from "../services/transcriptService";
import { fetchTranscripts } from "../services/transcriptService";

export function TranscriptDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [contextLines, setContextLines] = useState(2);
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);
  const [transcriptText, setTranscriptText] = useState("");

  useEffect(() => {
    fetchTranscripts().then((list) => {
      const t = list.find((t) => t.id.toString() === id);
      setTranscriptText(t?.content || "Transcript not found.");
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const parsed = await parseTranscript({
        transcript_id: id,
        keyword,
        context: contextLines,
      });

      if (!parsed?.extracted_text?.trim()) {
        setShowNoResultsModal(true);
        return;
      }

      navigate(`/results/${parsed.id}`, { state: { parsed } });
    } catch (err) {
      console.error("Parse failed:", err);
      alert("An error occurred while parsing the transcript.");
    }
  }

  return (
    <Container className="text-white py-5">
      <h2>Search Your Transcript:</h2>

      <Form onSubmit={handleSubmit} className="py-5">
        <Form.Group className="mb-4 d-flex align-items-center gap-3">
          <div style={{ flex: 1 }}>
            <Form.Label>Enter Search Keyword:</Form.Label>
            <Form.Control
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
          </div>

          <div style={{ maxWidth: "150px" }}>
            <Form.Label>Context Line Count:</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={contextLines}
              onChange={(e) => setContextLines(parseInt(e.target.value))}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Transcript Preview</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={transcriptText}
            readOnly
            className="bg-dark text-white"
          />
        </Form.Group>

        <div className="d-flex justify-content-center gap-4">
          <Button type="submit" variant="outline-success" size="lg">
            Submit
          </Button>
          <Button
            variant="outline-danger"
            size="lg"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
        </div>
      </Form>

      <Modal
        show={showNoResultsModal}
        onHide={() => setShowNoResultsModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>No Results Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your keyword exists, just not in this transcript. Please try a
          different term.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={() => setShowNoResultsModal(false)}>
            Try Again
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

// export function TranscriptDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [keyword, setKeyword] = useState("");
//   const [contextLines, setContextLines] = useState(2);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const parsed = await parseTranscript({
//       transcript_id: id,
//       keyword,
//       context: contextLines,
//       // title: `Search for '${keyword}'`,
//     });
//     navigate(`/results/${parsed.id}`, { state: { parsed } });
//     // navigate("/results", { state: { parsed } });
//   }
