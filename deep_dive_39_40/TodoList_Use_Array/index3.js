const button = document.getElementById("create-list-form__button");
const input = document.getElementById("create-list-form__input");
const form = document.getElementById("create-list-form");
let todos = localStorage.setItem("savedTodos", JSON.stringify([]));
let savedTodos = JSON.parse(localStorage.getItem("savedTodos"));

// 유니크한 id를 만드는 함수
const createNextId = (savedTodos) => {
  if (!savedTodos.length) {
    return 1;
  }

  const idList = savedTodos.map((todo) => todo.id);

  let maxId = Math.max(...idList);

  return maxId + 1;
};

// input값이 추가될때마다 호출되어
// 호출되기 전 브라우저에 출력되어있던 리스트를 삭제하는 함수
const removeTodos = (todoUlList) => {
  while (todoUlList.hasChildNodes()) {
    todoUlList.removeChild(todoUlList.lastChild);
  }
};

// input값이 추가될때마다 호출되어 브라우저에
// todoList배열의 요소인 객체의 프로퍼티 값을 알맞게 출력하는 함수
const printTodos = (savedTodos, todoUlList) => {
  removeTodos(todoUlList);

  savedTodos.forEach((todo) => {
    createElement(todo, todoUlList, savedTodos);
  });
};

// 인자로 받은 값을 객체의 text 프로퍼티 값으로 받는 함수
const insertInputValue = (value, todoUlList, savedTodos) => {
  let todoId = createNextId(savedTodos);

  const todo = {
    text: value,
    done: false,
    id: todoId,
  };

  savedTodos.push(todo);

  localStorage.setItem("savedTodos", JSON.stringify(savedTodos));

  printTodos(savedTodos, todoUlList);
};

// 추가 버튼 클릭시 인풋값을 받는 함수
const handleGetValue = (inputText, savedTodos) => (e) => {
  const todoUlList = document.getElementById("list");

  const value = e.target.previousElementSibling.value;

  insertInputValue(value, todoUlList, savedTodos);

  inputText.value = "";
  inputText.focus();
};

/* 요소 생성 함수 */
// li요소 생성
const createList = () => {
  const list = document.createElement("li");

  return list;
};

// checkbox가 check될 시 호출되는 핸들러 함수
// checkbox의 checked값을 todoList배열의 요소인 객체의 done프로퍼티 값으로 대입
const handleToggleTodo = (id, savedTodos, todoUlList) => (e) => {
  const { checked } = e.target;

  const nextTodos = savedTodos.map((todo) => {
    if (todo.id === id) {
      todo.done = checked;
    }

    return todo;
  });

  savedTodos = nextTodos;
  localStorage.setItem("savedTodos", JSON.stringify(savedTodos));

  printTodos(savedTodos, todoUlList);
};

// checkbox요소 생성
const createCheckBox = (done, id, savedTodos, todoUlList) => {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = done;

  checkBox.addEventListener(
    "change",
    handleToggleTodo(id, savedTodos, todoUlList)
  );

  return checkBox;
};
// span요소 생성
const createText = (text, done) => {
  const todoText = document.createElement("span");
  todoText.textContent = text;

  const style = done
    ? {
        color: "red",
        "text-decoration": "line-through",
      }
    : {
        color: "black",
        "text-decoration": "none",
      };

  Object.assign(todoText.style, style);

  return todoText;
};

// 삭제 버튼 클릭시 호출되어 해당 todo의 출력 데이터를 가진 todoList의 요소인 객체를
// 삭제 후 화면에 다시 출력하는 이벤트 핸들러
const hadleRemoveTodo = (id, savedTodos, todoUlList) => (e) => {
  const nextTodos = savedTodos.filter((todo) => todo.id !== id);

  savedTodos = nextTodos;
  localStorage.setItem("savedTodos", JSON.stringify(savedTodos));

  printTodos(savedTodos, todoUlList);
};

// 삭제 button요소 생성
const createBtn = (id, savedTodos, todoUlList) => {
  const button = document.createElement("button");
  button.textContent = "삭제";
  button.addEventListener(
    "click",
    hadleRemoveTodo(id, savedTodos, todoUlList)
  );

  return button;
};

/* 생성된 요소를 화면에 ul태그에 대입하는 함수 */
const createElement = (todo, todoUlList, savedTodos) => {
  const { text, done, id } = todo;

  const list = createList();
  const checkBox = createCheckBox(done, id, savedTodos, todoUlList);
  const todoText = createText(text, done);
  const button = createBtn(id, savedTodos, todoUlList);

  list.append(checkBox, todoText, button);
  todoUlList.appendChild(list);
};

// form의 기본 동작을 제어하는 함수
const handlePreventFromAction = (e) => {
  e.preventDefault();
};

// Enter키를 누를 시 추가 버튼을 클릭했을 때와 동일하게 동작하는 이벤트 핸들러
const handleGetKeyPressValue = (savedTodos, inputText) => (e) => {
  if (e.key === "Enter") {
    const todoUlList = document.getElementById("list");

    const value = e.target.value;

    insertInputValue(value, todoUlList, savedTodos);

    inputText.value = "";
    inputText.focus();
  }
};

input.addEventListener(
  "keypress",
  handleGetKeyPressValue(savedTodos, input)
);
button.addEventListener("click", handleGetValue(input, savedTodos));
form.addEventListener("submit", handlePreventFromAction);
