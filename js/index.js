const BACKEND_ROOT_URL = "http://127.0.0.1:3001";
import { Todos } from "./class/Todos.js";
const todos = new Todos(BACKEND_ROOT_URL);
const list = document.querySelector("#todolist");
const input = document.querySelector("#newtodo");
input.disabled = true;
todos
    .getTasks()
    .then((tasks) => {
    tasks.forEach((task) => {
        renderTask(task);
    });
    input.disabled = false;
})
    .catch((error) => alert(error));
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const text = input.value.trim();
        if (text !== "") {
            todos.addTask(text).then((task) => {
                input.value = "";
                input.focus();
                renderTask(task);
            });
        }
        e.preventDefault();
    }
});
const renderTask = (task) => {
    const list_item = document.createElement(`li`);
    list_item.setAttribute(`class`, "list-group-item");
    list_item.setAttribute("data-key", task.id.toString());
    renderSpan(list_item, task.text);
    renderLink(list_item, task.id);
    list.append(list_item);
};
const renderSpan = (list_item, text) => {
    const span = list_item.appendChild(document.createElement("span"));
    span.innerHTML = text;
};
const renderLink = (list_item, id) => {
    const link = list_item.appendChild(document.createElement("a"));
    link.innerHTML = '<i class="bi bi-trash"></i>';
    link.setAttribute("style", "float: right");
    link.addEventListener("click", (e) => {
        todos
            .removeTask(id)
            .then((id) => {
            const elementToRemove = document.querySelector(`[data-key='${id}']`);
            if (elementToRemove) {
                list.removeChild(elementToRemove);
            }
        })
            .catch((error) => alert(error));
    });
};
