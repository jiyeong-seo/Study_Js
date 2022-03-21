const form = document.getElementById("create-list-from");
const list = document.getElementById("list");
const input = document.getElementById("create-list-from__input");
const button = document.getElementById("create-list-form__button");
let todos = [];
let id = 1;

// 추가 버튼 클릭시 인풋값을 받는 함수
const handelGetValue = (e) => {
  const inputValue = e.target.previousElementSibling.value;
  console.log(inputValue);
};

button.addEventListener("click", handelGetValue);
