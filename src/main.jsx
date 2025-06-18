import React from "react";
import ReactDOM from "react-dom/client";
import { AppWrapper } from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppWrapper />);

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
// import App from "./App.jsx";
// import "./index.css";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
