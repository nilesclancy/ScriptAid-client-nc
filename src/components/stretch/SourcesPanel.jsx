import React from "react";
import { Card } from "react-bootstrap";

export function SourcesPanel() {
  return (
    <Card className="p-3 bg-dark text-white">
      <h5>Sources Matched</h5>
      <p>“Source #1 supports this line...”</p>
      <p>“Source #2 backs up the evidence...”</p>
    </Card>
  );
}
