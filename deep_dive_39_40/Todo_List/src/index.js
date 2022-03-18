const form = document.getElementById("form");
const input = document.getElementById("input");
const button = document.getElementById("button");
const list = document.getElementById("list");

const handleRemoveTodo = (e) => {
  const targetElement = e.target.parentNode;
  targetElement.remove();
};

const handleToggleTodo = (e) => {
  const textElement = e.target.nextSibling;
  console.log(textElement.style);
  console.log(typeof textElement.style);
  const style = e.target.checked
    ? {
        color: "red",
        "text-decoration": "line-through",
      }
    : {
        color: "black",
        "text-decoration": "none",
      };
  Object.assign(textElement.style, style);
};

const createTodoItem = ({ checkbox, todoText, removeButton }) => {
  const todoItem = document.createElement("li");
  todoItem.appendChild(checkbox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(removeButton);

  return todoItem;
};

const createCheckbox = () => {
  const todoCheckbox = document.createElement("input");
  todoCheckbox.setAttribute("type", "checkbox");
  todoCheckbox.addEventListener("change", handleToggleTodo);

  return todoCheckbox;
};

const createTodoText = () => {
  const todoText = document.createElement("span");
  todoText.textContent = input.value;

  return todoText;
};

const createRemoveTodoButton = () => {
  const todoButton = document.createElement("button");
  todoButton.textContent = "삭제";
  todoButton.addEventListener("click", handleRemoveTodo);

  return todoButton;
};

const handleAddTodo = () => {
  const checkbox = createCheckbox();
  const todoText = createTodoText();
  const removeButton = createRemoveTodoButton();

  const todoItem = createTodoItem({
    checkbox,
    todoText,
    removeButton,
  });

  list.appendChild(todoItem);

  input.value = "";
  input.focus();
};

button.addEventListener("click", handleAddTodo);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleAddTodo();
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
