import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import {
  fetchTranscripts,
  deleteTranscript,
  renameTranscript,
} from "../services/transcriptService";

export function Dashboard() {
  const [transcripts, setTranscripts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [renameId, setRenameId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTranscripts()
      .then((data) => {
        setTranscripts(data);
      })
      .catch((err) => console.error("Error loading transcripts:", err));
  }, []);

  const handleDelete = (id) => {
    deleteTranscript(id).then(() => {
      setTranscripts((prev) => prev.filter((t) => t.id !== id));
    });
  };

  const handleRename = (id, title) => {
    setRenameId(id);
    setNewTitle(title);
    setShowModal(true);
  };

  const saveRename = async () => {
    try {
      await renameTranscript(renameId, newTitle);
      setTranscripts((prev) =>
        prev.map((t) => (t.id === renameId ? { ...t, title: newTitle } : t))
      );
      setShowModal(false);
    } catch (err) {
      console.error("Rename failed:", err);
    }
  };

  const filtered = transcripts.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="text-white py-5">
      <h2 className="mb-4 text-center">Your Transcripts</h2>

      <Form.Control
        type="text"
        placeholder="Search transcripts..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="text-center mb-4">
        <Button variant="success" onClick={() => navigate("/upload")}>
          Upload Transcript
        </Button>
      </div>

      {filtered.map((t) => (
        <Card
          key={t.id}
          className="bg-dark text-white mb-3 p-3 position-relative"
        >
          <div className="position-absolute top-0 start-0 p-2 d-flex gap-2">
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => navigate(`/details/${t.id}`)}
            >
              View
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDelete(t.id)}
            >
              Delete
            </Button>
          </div>

          <div className="position-absolute top-0 end-0 p-2">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => handleRename(t.id, t.title)}
            >
              Rename
            </Button>
          </div>

          <Card.Title className="text-center mt-4 fw-bold">
            {t.title}
          </Card.Title>
          <Card.Text className="text-truncate">{t.content}</Card.Text>
        </Card>
      ))}

      {/* Rename Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rename Transcript</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveRename}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
