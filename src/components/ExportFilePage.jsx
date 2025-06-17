import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  getParsedFileById,
  saveParsedFile,
} from "../services/transcriptService";
import { Container, Button, Form, Modal, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

export function ExportFilePage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  // const parsed = location.state?.parsed;

  const [parsed, setParsed] = useState(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function handleSave() {
    if (!parsed) return;

    const payload = {
      extracted_text: parsed.extracted_text,
      keyword: parsed.keyword,
      context_lines: parsed.context_lines,
      transcript_id:
        parsed.transcript?.id || parsed.transcript || parsed.transcript_id,
    };
    console.log("Payload for save:", payload);

    saveParsedFile(payload)
      .then(() => setShowSaveModal(true))
      .catch((err) => {
        console.error("Save failed:", err);
        setShowErrorModal(true);
      });
  }

  useEffect(() => {
    if (location.state?.parsed) {
      setParsed(location.state.parsed);
      setLoading(false);
    } else {
      getParsedFileById(id)
        .then((res) => {
          setParsed(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id, location.state]);

  function handleDownload(parsed) {
    const blob = new Blob([parsed.extracted_text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${parsed.title || "transcript"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (loading) {
    return (
      <Container className="py-5 text-white text-center">
        <h2>Loading...</h2>
      </Container>
    );
  }

  if (!parsed) {
    return (
      <Container className="py-5 text-white text-center">
        <h2>Error</h2>
        <p>Unable to load export content for ID: {id}</p>
        <Button variant="warning" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5 text-white">
      <h2 className="mb-4">Export File:</h2>
      <h5 className="mb-3">{parsed.title || `Parsed File #${id}`}</h5>

      <Form.Group className="mb-4">
        <Form.Label>Extracted Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={15}
          value={parsed.extracted_text}
          readOnly
          className="bg-dark text-white"
        />
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button
          variant="outline-primary"
          onClick={() => handleDownload(parsed)}
        >
          Download (.txt)
        </Button>
        <Button variant="outline-success" onClick={handleSave}>
          Save to My Files
        </Button>
        <Button
          variant="outline-warning"
          onClick={() => navigate("/dashboard")}
        >
          Return to Dashboard
        </Button>{" "}
        <Button variant="outline-light" onClick={() => navigate("/profile")}>
          Return to Profile
        </Button>
      </div>

      <Card className="mt-4 bg-dark text-white">
        <Card.Body>
          <Card.Title>File Metadata:</Card.Title>
          <ul className="list-unstyled">
            <li>
              <strong>Transcript Title:</strong>{" "}
              {parsed.transcript_title || "Unknown"}
            </li>
            <li>
              <strong>Keyword:</strong> {parsed.keyword}
            </li>
            <li>
              <strong>Context Lines:</strong> {parsed.context_lines}
            </li>
            {/* <li>
              <strong>Parsed File ID:</strong> {parsed.id}
            </li> */}
            <li>
              <strong>Parsed At:</strong>{" "}
              {parsed.created_at
                ? new Date(parsed.created_at).toLocaleString()
                : "N/A"}
            </li>
          </ul>
        </Card.Body>
      </Card>

      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>File Saved</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your file was successfully saved to My Files.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            Stay Here
          </Button>
          <Button variant="success" onClick={() => navigate("/files")}>
            Go to My Files
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Save Failed</Modal.Title>
        </Modal.Header>
        <Modal.Body>Something went wrong while saving the file.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

// function handleSave() {
//   const parsed = location.state?.parsed;
//   if (!parsed) return alert("No parsed file found.");

//   const payload = {
//     ...parsed,
//     transcript_id: parsed.transcript,
//   };

//   saveparsed(payload)
//     .then(() => alert("Saved to My Files"))
//     .catch(() => alert("Save failed"));
// }

// function handleSave(parsed) {
//   alert("Save to My Files: not yet wired to backend");
// }
