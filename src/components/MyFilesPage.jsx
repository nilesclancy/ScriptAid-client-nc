import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteParsedFile,
  renameParsedFile,
  getUserFiles,
} from "../services/transcriptService";

export function MyFilesPage() {
  const [files, setFiles] = useState([]);
  const [renameId, setRenameId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserFiles()
      .then(setFiles)
      .catch((err) => console.error("Error loading files:", err));
  }, []);

  const filteredFiles = files.filter((f) =>
    f.transcript_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRename = async () => {
    await renameParsedFile(renameId, newTitle);
    setFiles((prev) =>
      prev.map((f) =>
        f.id === renameId ? { ...f, transcript_title: newTitle } : f
      )
    );
    setShowModal(false);
  };

  return (
    <Container className="text-white py-5">
      <h2 className="mb-4 text-center">My Saved Files</h2>

      <Form.Control
        type="text"
        placeholder="Search files..."
        className="mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredFiles.map((file) => (
        <Card
          key={file.id}
          bg="dark"
          text="light"
          className="mb-3 p-3 position-relative"
          style={{ minHeight: 150 }}
        >
          <div className="position-absolute top-0 start-0 p-2 d-flex gap-2">
            <Button
              variant="outline-light"
              size="sm"
              onClick={() =>
                navigate(`/export/${file.id}`, { state: { parsed: file } })
              }
            >
              View File
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                deleteParsedFile(file.id).then(() =>
                  setFiles((prev) => prev.filter((f) => f.id !== file.id))
                );
              }}
            >
              Delete
            </Button>
          </div>

          <div className="position-absolute top-0 end-0 p-2">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => {
                setRenameId(file.id);
                setNewTitle(file.transcript_title);
                setShowModal(true);
              }}
            >
              Rename
            </Button>
          </div>

          <Card.Title className="text-center mt-4 fw-bold">
            {file.transcript_title || `Parsed File #${file.id}`}
          </Card.Title>

          <Card.Text
            className="bg-secondary p-2 mt-2 rounded"
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
              fontSize: "0.9rem",
            }}
          >
            {file.extracted_text}
          </Card.Text>
        </Card>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rename File</Modal.Title>
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
          <Button variant="primary" onClick={handleRename}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
