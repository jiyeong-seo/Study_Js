const form = document.getElementById("form");
const list = document.getElementById("list");
const input = document.getElementById("input");
const button = document.getElementById("button");
let todos = [];
let id = 1;

// 요소를 만드는 함수
const createList = () => {
  const list = document.createElement("li");

  return list;
};

const createCheckbox = (isCheked, id) => {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = isCheked;
  checkbox.addEventListener("change", handelToggleTodo(id));

  return checkbox;
};

// todo의 checkbox를 체크시 text(span)의 스타일을 변경하는 함수
// checkbox를 체크한 todo의 id와 todos의 요소인 객체의 id프로퍼티 값이 일치하면
// todos의 요소인 객체의 done 프로퍼티 값에 e.target 의 checked 값을 대입한다.
const handelToggleTodo = (id) => (e) => {
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

const createText = (isCheked, text) => {
  const todoText = document.createElement("span");
  todoText.textContent = text;

  // isCheked 값에 따라 todoText(span)에 스타일 적용
  const style = isCheked
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

const createBtn = (id) => {
  const btn = document.createElement("button");
  btn.textContent = "삭제";
  btn.addEventListener("click", handleDeleteTodo(id));

  return btn;
};

// 삭제button에 click 이벤트가 발생시 리스트가 삭제되는 함수
// 클릭한 todo를 id값으로 찾아 해당 todo를 todos에서 삭제
const handleDeleteTodo = (id) => () => {
  const nextTodos = todos.filter((todo) => todo.id !== id);

  // 유니크한 id값을 구하는 함수 호출
  id = getNextId(todos);

  todos = nextTodos;
  printTodos();
};

// 요소를 만들어 화면에 출력하는 함수
// -> 인자로 todo 객체를 전달받아 프로퍼티를 빼내어 사용한다.
const createElement = (todo) => {
  const { text, done, id } = todo;

  const todoList = createList();
  const todoCheckbox = createCheckbox(done, id);
  const todoText = createText(done, text);
  const todoButton = createBtn(id);

  todoList.appendChild(todoCheckbox);
  todoList.appendChild(todoText);
  todoList.appendChild(todoButton);

  list.appendChild(todoList);

  input.value = "";
  input.focus();
};

// 기존 list 의 todo(li)를 지우는 함수
const removeTodos = () => {
  while (list.hasChildNodes()) {
    list.removeChild(list.lastChild);
  }
};

// todos 배열을 순회하며 forEach 문으로 todo객체를 순회하는 함수
// -> 순회하며 차례대로 todo 객체를 인자로 전달받는 요소를 만드는 함수를 호출한다.
const printTodos = () => {
  removeTodos(todos);

  todos.forEach((todo) => {
    createElement(todo);
  });
};

// todos 배열에 todo객체를 만들어 추가하는 함수
// 이 때 todo객체의 text 프로퍼티의 값으로
// -> 사용자가 input에 입력한 value가 전달되도록 함수 호출시 인자로 value 를 전달한다.

const insertTodo = (value) => {
  // 유니크한 id값을 구하는 함수 호출
  id = getNextId(todos);

  const todo = {
    text: value,
    done: false,
    id
  };

  todos.push(todo);

  printTodos();
};

// input의 value를 추출하는 이벤트 핸들러
const handleGetValue = () => {
  const value = input.value;
  insertTodo(value);
  input.value = "";
};

// form 태그의 기본 이벤트 속성을 제거하는 이벤트 핸들러
const handlePreventEvent = (e) => {
  e.preventDefault();
};

// input요소에서 enter 키 입력시 handleGetValue 이벤트 핸들러가 호출되어
// 추가 버튼을 누르는 것과 동일하게 작동하는 함수
const handleKeyEvent = (e) => {
  if (e.key === "Enter") {
    handleGetValue();
  }
};

// todos 의 요소중 id값이 가장 큰 값보다 큰 값이면 Id값이 겹칠 일이 없다.
// 최대값을 구하는 메서드를 사용해서 +1 해주면 유니크한 값으로 관리할 수 있다!
const getNextId = (todos) => {
  console.log(todos);
  if (!todos.length) {
    return 1;
  }

  const idList = todos.map((todo) => {
    return todo.id;
  });
  // console.log(idList);

  const maxId = Math.max(...idList);

  return maxId + 1;
};

// input의 value를 추출하는 이벤트 핸들러 호출
button.addEventListener("click", handleGetValue);
// form 의 기본 이벤트 속성을 제거하는 이벤트 핸들러 호출
form.addEventListener("submit", handlePreventEvent);
// input요소에서 enter 키 입력시 handleGetValue 이벤트 핸들러가 호출되어
// 추가 버튼을 누르는 것과 동일하게 작동하는 함수 호출
input.addEventListener("keypress", handleKeyEvent);
