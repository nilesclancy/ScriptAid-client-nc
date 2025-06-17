import { useEffect, useState } from "react";
import { Container, Card, Button, Spinner, Row, Col } from "react-bootstrap";
import { getKeywordStats } from "../services/transcriptService";
import { FilesByKeyword } from "./FilesByKeyword";

export function ProfilePage() {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  useEffect(() => {
    getKeywordStats().then((data) => {
      const keywordArray = data.keywords || [];
      setKeywords(keywordArray);
      if (keywordArray.length > 0) {
        setSelectedKeyword(keywordArray[0][0]);
      }
      setLoading(false);
    });
  }, []);

  return (
    <Container className="py-5 text-white">
      <h2 className="mb-4">My Profile</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card className="p-3 bg-dark text-white">
            <h5>Top Keywords</h5>
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              <ul>
                {keywords.map(([word, count]) => (
                  <li key={word}>
                    <span
                      className="text-info"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedKeyword(word)}
                    >
                      {word}
                    </span>{" "}
                    <small>(used {count}x)</small>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </Col>
        <Col md={6}>
          <h5 className="text-center text-white mb-3">Files by Keyword</h5>
          <FilesByKeyword keyword={selectedKeyword} />
        </Col>
      </Row>
    </Container>
  );
}
