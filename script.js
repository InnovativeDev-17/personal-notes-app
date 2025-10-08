const addNoteBtn = document.getElementById("addNoteBtn");
const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");

addNoteBtn.addEventListener("click", () => {
  const text = noteInput.value.trim();
  if (!text) return alert("Empty notes are not allowed!");

  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `<p>${text}</p><button>Delete</button>`;
  note.querySelector("button").addEventListener("click", () => note.remove());
  notesContainer.appendChild(note);
  noteInput.value = "";
});
