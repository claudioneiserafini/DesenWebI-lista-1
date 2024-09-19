// Variáveis
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const filterInput = document.getElementById("filter");
const themeToggleButton = document.getElementById("toggle-theme");

// Verificar e carregar tarefas do localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [
  { id: 1, text: "Estudar HTML", completed: false },
  { id: 2, text: "Estudar CSS", completed: true },
  { id: 3, text: "Estudar JavaScript", completed: false }
];

// Tema
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);
themeToggleButton.textContent = currentTheme === "dark" ? "Tema Claro" : "Tema Escuro";

// Atualizar o armazenamento no localStorage
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Adicionar tarefa
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTaskText = document.getElementById("new-task").value.trim();
  if (newTaskText) {
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    tasks.push(newTask);
    document.getElementById("new-task").value = "";
    renderTasks();
    updateLocalStorage();
  }
});

// Renderizar tarefas
function renderTasks(filter = "") {
  taskList.innerHTML = "";
  tasks
    .filter((task) => task.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((task) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
      li.setAttribute("tabindex", "0");

      const taskText = document.createElement("span");
      taskText.textContent = task.text;

      const taskActions = document.createElement("div");
      taskActions.classList.add("task-actions");

      const completeBtn = document.createElement("button");
      completeBtn.textContent = task.completed ? "Incompleto" : "Completo";
      completeBtn.onclick = () => toggleComplete(task.id);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Remover";
      deleteBtn.onclick = () => deleteTask(task.id);

      taskActions.appendChild(completeBtn);
      taskActions.appendChild(deleteBtn);

      li.appendChild(taskText);
      li.appendChild(taskActions);

      taskList.appendChild(li);
    });
}

// Marcar tarefa como completa/incompleta
function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks(filterInput.value);
  updateLocalStorage();
}

// Remover tarefa
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks(filterInput.value);
  updateLocalStorage();
}

// Filtro de tarefas
filterInput.addEventListener("input", (e) => {
  renderTasks(e.target.value);
});

// Alternar tema
themeToggleButton.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  themeToggleButton.textContent = newTheme === "dark" ? "Tema Claro" : "Tema Escuro";
  localStorage.setItem("theme", newTheme);
});

// Renderizar as tarefas na inicialização
renderTasks();
