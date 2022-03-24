const idInput = document.getElementById("id");
const pwInput = document.getElementById("pw");
const joinButton = document.getElementById("join__button");

// 아이디 인풋에서 blur 이벤트 발생시 호출되는 이벤트 핸들러
// 영문 소문자, 숫자가 포함되지 않았거나
// 4자 이하 10자 이상의 아이디일 경우 경고 텍스트를 출력
const validateId = (e) => {
  const idReg = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{4,10}$/g;

  const idAlert = e.target.nextElementSibling;

  if (!idReg.test(e.target.value)) {
    idAlert.style.visibility = "visible";
  } else {
    idAlert.style.visibility = "hidden";
  }
};

// 비밀번호 인풋에서 blur 이벤트 발생시 호출되는 이벤트 핸들러
// 영문 대 소문자, 숫자가 포함되지 않았거나
// 6자 이하 10자 이상의 아이디일 경우 경고 텍스트를 출력
const validatePw = (e) => {
  const pwReg = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/g;

  const pwAlert = e.target.nextElementSibling;

  if (!pwReg.test(e.target.value)) {
    pwAlert.style.visibility = "visible";
  } else {
    pwAlert.style.visibility = "hidden";
  }
};

// 가입 버튼에서 클릭 이벤트 발생시 호출되는 이벤트 핸들러
// 비밀번호 인풋 값과 비밀번호 재확인 인풋 값을 비교하여
// 값이 동일하지 않다면 경고 텍스트를 출력
const checkPw = (e) => {
  const nextSiblings = e.target.parentNode.children;
  const checkPwSiblings = [...checkPwSiblings];
  console.log("CheckPwSiblings");
};

idInput.addEventListener("blur", validateId);
pwInput.addEventListener("blur", validatePw);
joinButton.addEventListener("click", checkPw);
