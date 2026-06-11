console.log("JS is Running!");

const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");


renderTasks();

// Add Task
addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();

    console.log("Add Button Clicked");
    console.log("Task Entered:", task);

    if (!task) {
        console.log("Task is empty");
        alert("Please enter a task");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    console.log("Tasks Before Add:", tasks);

    tasks.push(task);

    console.log("Tasks After Add:", tasks);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    renderTasks();
});

// Clear All Tasks
clearBtn.addEventListener("click", () => {
    console.log("Clear All Button Clicked");

    localStorage.removeItem("tasks");

    console.log("All Tasks Removed From LocalStorage");

    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    console.log("Rendering Tasks:", tasks);

    tasks.forEach((task, index) => {


        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        // Edit Task
        editBtn.addEventListener("click", () => {
            console.log("Edit Button Clicked For:", task);

            const newTask = prompt("Edit Task", task);

            console.log("New Task Value:", newTask);

            if (newTask === null || newTask.trim() === "") {
                console.log("Edit Cancelled");
                return;
            }

            tasks[index] = newTask.trim();

            console.log("Updated Tasks:", tasks);

            localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTasks();
        });

        // Delete Task
        deleteBtn.addEventListener("click", () => {
            console.log("Delete Button Clicked For:", task);

            tasks.splice(index, 1);

            console.log("Tasks After Delete:", tasks);

            localStorage.setItem("tasks", JSON.stringify(tasks));

            renderTasks();
        });

        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Enter Key Support
taskInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        addBtn.click();
    }
});


// THEME MODE TOGGLE

const themeBtn = document.getElementById("theme-btn");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ ";
}

// Toggle theme
themeBtn.addEventListener("click", () => {
    console.log("Theme Toggle Button Clicked");
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    if (isDark) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀️ ";
        console.log("Dark Theme Enabled");
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "🌙 ";
        console.log("Light Theme Enabled");
    }
});