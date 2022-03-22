const button = document.getElementById("create-list-form__button");
const input = document.getElementById("create-list-form__input");
const form = document.getElementById("create-list-form");
let todoList = [];

// 유니크한 id를 만드는 함수
const createNextId = (todoList) => {
  if (!todoList.length) {
    return 1;
  }

  const idList = todoList.map((todo) => todo.id);

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
const printTodos = (todoList, todoUlList) => {
  removeTodos(todoUlList);

  todoList.forEach((todo) => {
    createElement(todo, todoUlList, todoList);
  });

  console.log(todoList);
};

// 인자로 받은 값을 객체의 text 프로퍼티 값으로 받는 함수
const insertInputValue = (value, todoList, todoUlList) => {
  let todoId = createNextId(todoList);

  const todo = {
    text: value,
    done: false,
    id: todoId,
  };

  todoList.push(todo);

  printTodos(todoList, todoUlList);
};

// 추가 버튼 클릭시 인풋값을 받는 함수
const handleGetValue = (todoList, inputText) => (e) => {
  const todoUlList = document.getElementById("list");

  const value = e.target.previousElementSibling.value;

  insertInputValue(value, todoList, todoUlList);

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
const handleToggleTodo = (id, todoList, todoUlList) => (e) => {
  const { checked } = e.target;

  const nextTodos = todoList.map((todo) => {
    if (todo.id === id) {
      todo.done = checked;
    }

    return todo;
  });

  todoList = nextTodos;

  printTodos(todoList, todoUlList);
};

// checkbox요소 생성
const createCheckBox = (done, id, todoList, todoUlList) => {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = done;

  checkBox.addEventListener(
    "change",
    handleToggleTodo(id, todoList, todoUlList)
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
const hadleRemoveTodo = (id, todoList, todoUlList) => (e) => {
  const nextTodos = todoList.filter((todo) => todo.id !== id);

  todoList = nextTodos;

  printTodos(todoList, todoUlList);
};

// 삭제 button요소 생성
const createBtn = (id, todoList, todoUlList) => {
  const button = document.createElement("button");
  button.textContent = "삭제";
  button.addEventListener("click", hadleRemoveTodo(id, todoList, todoUlList));

  return button;
};

/* 생성된 요소를 화면에 ul태그에 대입하는 함수 */
const createElement = (todo, todoUlList, todoList) => {
  const { text, done, id } = todo;

  const list = createList();
  const checkBox = createCheckBox(done, id, todoList, todoUlList);
  const todoText = createText(text, done);
  const button = createBtn(id, todoList, todoUlList);

  list.append(checkBox, todoText, button);
  todoUlList.appendChild(list);
};

// form의 기본 동작을 제어하는 함수
const handlePreventFromAction = (e) => {
  e.preventDefault();
};

// Enter키를 누를 시 추가 버튼을 클릭했을 때와 동일하게 동작하는 이벤트 핸들러
const handleGetKeyPressValue = (todoList, inputText) => (e) => {
  if (e.key === "Enter") {
    const todoUlList = document.getElementById("list");

    const value = e.target.value;

    insertInputValue(value, todoList, todoUlList);

    inputText.value = "";
    inputText.focus();
  }
};

input.addEventListener("keypress", handleGetKeyPressValue(todoList, input));
button.addEventListener("click", handleGetValue(todoList, input));
form.addEventListener("submit", handlePreventFromAction);
