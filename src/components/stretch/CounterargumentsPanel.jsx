import React from "react";
import { Card } from "react-bootstrap";

export function CounterargumentsPanel() {
  return (
    <Card className="p-3 bg-dark text-white">
      <h5>Counterarguments</h5>
      <p>“A critic might argue...”</p>
      <p>“An alternative interpretation could be...”</p>
    </Card>
  );
}
