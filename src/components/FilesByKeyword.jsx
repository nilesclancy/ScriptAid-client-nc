import { useEffect, useState } from "react";
import { Spinner, Card } from "react-bootstrap";
import { getFilesByKeyword } from "../services/transcriptService";
import { Link } from "react-router-dom";

export function FilesByKeyword({ keyword }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword) return;

    setLoading(true);
    getFilesByKeyword(keyword)
      .then((data) => {
        setFiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed fetching files by keyword", err);
        setFiles([]);
        setLoading(false);
      });
  }, [keyword]);

  if (!keyword) return null;

  return (
    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : files.length === 0 ? (
        <p className="text-muted">No files found.</p>
      ) : (
        files.map((f) => (
          <Card
            key={f.id}
            bg="secondary"
            text="light"
            className="mb-2 p-2 text-center"
          >
            <Card.Title
              as={Link}
              to={`/export/${f.id}`}
              className="text-white text-decoration-none"
            >
              {f.transcript_title || `Parsed File #${f.id}`}
            </Card.Title>
            <small className="text-muted">{f.keyword}</small>
          </Card>
        ))
      )}
    </div>
  );
}
