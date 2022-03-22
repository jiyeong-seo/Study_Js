const form = document.getElementById("create-list-form");
const list = document.getElementById("list");
const input = document.getElementById("create-list-form__input");
const button = document.getElementById("create-list-form__button");
let todos = [];
let id = 1;

// 추가 버튼 클릭시 인풋값을 받는 함수
const handelGetValue = (e) => {
  const inputValue = input.value;

  insertInputValue(inputValue);

  input.value = "";
  input.focus();
};

//인풋값을 객체의 text프로퍼티 값으로 대입하는 함수
const insertInputValue = (value) => {
  id = getNextId(todos);

  const todo = {
    text: value,
    done: false,
    id
  };

  insertTodoObject(todo);
};

//객체를 todos 배열의 요소로 대입하는 함수
const insertTodoObject = (todo) => {
  todos.push(todo);

  printTodos();
};

// todos 배열의 요소인 객체를 화면에 출력하는 함수
const printTodos = () => {
  deleteTodo();

  todos.forEach((todo) => {
    createElement(todo);
  });
};

/* 화면에 출력될 요소를 만드는 함수들 */
// 리스트 요소를 만드는 함수
const createList = () => {
  const list = document.createElement("li");

  return list;
};
// 체크박스 요소를 만드는 함수
const createCheckbox = (done, id) => {
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.checked = done;
  checkBox.addEventListener("change", handelToggleCheckBox(id));

  return checkBox;
};
// 텍스트 요소를 만드는 함수
const createText = (text, done) => {
  const todoText = document.createElement("span");
  todoText.textContent = text;

  const style = done
    ? {
        color: "red",
        "text-decoration": "line-through"
      }
    : {
        color: "black",
        "text-decoration": "none"
      };

  Object.assign(todoText.style, style);

  return todoText;
};
// 버튼 요소를 만드는 함수
const createButton = (id) => {
  const button = document.createElement("button");
  button.textContent = "삭제";
  button.addEventListener("click", handelDeleteTodo(id));

  return button;
};

// todos 배열의 요소인 객체를 인수로 받아 요소를 생성하는 함수들을 호출시
// 인수로 받은 객체를 사용하여 화면에 요소를 출력하는 함수.
const createElement = (todo) => {
  const { text, done, id } = todo;

  const todoList = createList();
  const todoCheckBox = createCheckbox(done, id);
  const todoText = createText(text, done);
  const todoButton = createButton(id);

  todoList.append(todoCheckBox, todoText, todoButton);
  list.appendChild(todoList);
};

// 화면에 출력된 리스트를 삭제하는 함수
const deleteTodo = () => {
  while (list.hasChildNodes()) {
    list.removeChild(list.lastChild);
  }
};

// 삭제 버튼을 누를시 호출되어 todos의 요소인 객체 중
// 인자로 전달받은 id값과 동일한 프로퍼티 값을 가진 객체를 삭제한 배열을 리턴하여
// todos에 대입 후 다시 요소가 화면에 출력되도록 하는 함수
const handelDeleteTodo = (id) => (e) => {
  const nextTodos = todos.filter((todo) => todo.id !== id);

  id = getNextId();

  todos = nextTodos;
  printTodos();
};

// 유니크한 id값을 생성하는 함수 호출
const getNextId = () => {
  if (!todos.length) {
    return 1;
  }

  const idList = todos.map((todo) => {
    return todo.id;
  });

  const maxId = Math.max(...idList);

  return maxId + 1;
};

// checkbox 체크 상태에 따라 text의 스타일을 변화시키는 함수
const handelToggleCheckBox = (id) => (e) => {
  const { checked } = e.target;
  const nextTodos = todos.map((todo) => {
    if (todo.id === id) {
      todo.done = checked;
    }

    return todo;
  });

  todos = nextTodos;

  printTodos();
};

// form의 기본 동작 제어 함수
const handelPreventFromEvent = (e) => {
  e.preventDefault();
};

// 엔터키를 눌렀을 때 추가 버튼을 누른 것과 동일하게 동작도록 하는 함수
const handelCreateTodos = (e) => {
  const key = e.key;

  if (key === "Enter") {
    handelGetValue();
  }
};

input.addEventListener("keypress", handelCreateTodos);
form.addEventListener("submit", handelPreventFromEvent);
button.addEventListener("click", handelGetValue);
