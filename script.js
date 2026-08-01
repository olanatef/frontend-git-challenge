const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const totalEl = document.getElementById("total");
const completedEl = document.getElementById("completed");
const remainingEl = document.getElementById("remaining");

function updateStats() {
    const items = taskList.querySelectorAll("li");
    const total = items.length;
    const completed = taskList.querySelectorAll("li.completed").length;
    const remaining = total - completed;

    totalEl.textContent = total;
    completedEl.textContent = completed;
    remainingEl.textContent = remaining;
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add("task-text");

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("complete-btn");
    completeBtn.addEventListener("click", function () {
        li.classList.toggle("completed");
        completeBtn.textContent = li.classList.contains("completed") ? "Undo" : "Complete";
        updateStats();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        li.remove();
        updateStats();
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();
    updateStats();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

updateStats();

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "light";

if (savedTheme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", function () {
    const isDark = document.body.getAttribute("data-theme") === "dark";

    if (isDark) {
        document.body.removeAttribute("data-theme");
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    } else {
        document.body.setAttribute("data-theme", "dark");
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    }
});
