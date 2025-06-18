const API_URL = "http://127.0.0.1:8000/api";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Token ${localStorage.getItem("token")}`,
  };
}

export async function uploadTranscript(data) {
  const res = await fetch(`${API_URL}/upload`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchTranscripts() {
  const res = await fetch(`${API_URL}/transcripts`, {
    headers: authHeaders(),
  });
  return res.json();
}

export async function parseTranscript(data) {
  const res = await fetch(`${API_URL}/parsed`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Parse failed: " + text);
  }

  return res.json();
}

export async function getUserFiles() {
  const res = await fetch(`${API_URL}/files`, {
    headers: authHeaders(),
  });
  return res.json();
}

export async function saveParsedFile(data) {
  const res = await fetch(`${API_URL}/files/save`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Save failed");
  return res.json();
}

export async function deleteTranscript(id) {
  return fetch(`${API_URL}/transcripts/${id}/delete`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

export async function deleteParsedFile(id) {
  return fetch(`${API_URL}/files/${id}/delete`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

export async function renameTranscript(id, newTitle) {
  const res = await fetch(`${API_URL}/transcripts/${id}/rename`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title: newTitle }),
  });

  if (!res.ok) throw new Error("Failed to rename transcript");
  return res.json();
}

export async function getKeywordStats() {
  const res = await fetch(`${API_URL}/keywords`, {
    headers: authHeaders(),
  });
  return res.json();
}

export async function renameParsedFile(fileId, newTitle) {
  const res = await fetch(`${API_URL}/files/${fileId}/rename`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ title: newTitle }),
  });
  if (!res.ok) throw new Error("Rename failed");
  return res.json();
}

export async function getFilesByKeyword(keyword) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/files/by_keyword/${keyword}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch files by keyword");
  }

  return response.json();
}

export async function getParsedFileById(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/files/${id}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load parsed file.");
  }

  return response.json();
}
