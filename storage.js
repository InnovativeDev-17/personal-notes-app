// ===== STORAGE.JS =====
// Handles saving/loading notes & theme in localStorage

function saveNotes(notesArray) {
  localStorage.setItem("notes", JSON.stringify(notesArray));
}

function loadNotesFromStorage() {
  const saved = JSON.parse(localStorage.getItem("notes"));
  return saved || [];
}

function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

function loadThemeFromStorage() {
  return localStorage.getItem("theme") || "light";
}
