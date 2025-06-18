import { UploadTranscriptForm } from "./components/UploadTranscriptForm";
import { TranscriptDetails } from "./components/TranscriptDetails";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { ExportFilePage } from "./components/ExportFilePage";
import { SearchResults } from "./components/SearchResults";
import { MyFilesPage } from "./components/MyFilesPage";
import { ProfilePage } from "./components/ProfilePage";
import { Dashboard } from "./components/Dashboard";
import { HomePage } from "./components/HomePage";
import { NavBar } from "./components/NavBar";
import { useState } from "react";
import "./App.css";
import "./index.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

export function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      {!hideNav && <NavBar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadTranscriptForm />} />
        <Route path="/details/:id" element={<TranscriptDetails />} />
        <Route path="/results/:id" element={<SearchResults />} />
        <Route path="/export/:id" element={<ExportFilePage />} />
        <Route path="/files" element={<MyFilesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

// export default function App() {
//   const location = useLocation();
//   const hideNav = location.pathname === "/" || location.pathname === "/login";
