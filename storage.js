function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => tasks.push(li.textContent));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks"));
  if (saved) {
    saved.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task;
      li.onclick = () => {
        li.remove();
        saveTasks();
      };
      document.getElementById("taskList").appendChild(li);
    });
  }
}
