const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const noteList = document.getElementById("noteList");
const counter = document.getElementById("counter");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const downloadBtn = document.getElementById("downloadBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

// Load notes & theme
let notes = loadNotesFromStorage();
notes.forEach(obj => createNoteElement(obj.text, obj.completed));
updateCounter();

if(loadThemeFromStorage() === "dark") document.body.classList.add("dark");

// ===== ADD NOTE =====
addBtn.addEventListener("click", () => {
  const noteText = noteInput.value.trim();
  if (!noteText) return alert("Enter a note!");
  const noteObj = {text: noteText, completed: false};
  notes.push(noteObj);
  createNoteElement(noteText);
  saveNotes(notes);
  noteInput.value = "";
  updateCounter();
});

// ===== CREATE NOTE ELEMENT =====
function createNoteElement(noteText, completed=false) {
  const li = document.createElement("li");
  li.textContent = noteText;
  if(completed) li.classList.add("completed");

  // Toggle completed
  li.addEventListener("click", (e) => {
    if(e.target.classList.contains("editBtn")) return;
    li.classList.toggle("completed");
    updateNoteStatus(noteText, li.classList.contains("completed"));
    updateCounter();
  });

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.className = "editBtn";
  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit note:", noteText);
    if(newText){
      li.firstChild.textContent = newText + " ";
      updateNoteText(noteText, newText);
      noteText = newText;
      updateCounter();
    }
  });
  li.appendChild(editBtn);

  noteList.appendChild(li);
}

// ===== DELETE ALL =====
deleteAllBtn.addEventListener("click", () => {
  if(confirm("Delete all notes?")){
    noteList.innerHTML = "";
    notes = [];
    saveNotes(notes);
    updateCounter();
  }
});

// ===== DOWNLOAD NOTES =====
downloadBtn.addEventListener("click", () => {
  const text = notes.map(n => n.text).join("\n");
  const blob = new Blob([text], {type: "text/plain"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "notes.txt";
  a.click();
});

// ===== DARK MODE =====
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  saveTheme(document.body.classList.contains("dark") ? "dark" : "light");
});

// ===== COUNTER =====
function updateCounter() {
  counter.textContent = `Total Notes: ${noteList.querySelectorAll("li").length}`;
}

// ===== HELPER FUNCTIONS =====
function updateNoteStatus(text, completed){
  notes = notes.map(n => n.text === text ? {...n, completed} : n);
  saveNotes(notes);
}

function updateNoteText(oldText, newText){
  notes = notes.map(n => n.text === oldText ? {...n, text: newText} : n);
  saveNotes(notes);
}
