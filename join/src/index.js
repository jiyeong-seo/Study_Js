// 유효성검사 정규 표현식
const ID_REG = /^(?=.*\d)(?=.*[a-z])[0-9a-z]{4,10}$/g;
const PW_REG = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/g;

// 가입한 회원 아이디 리스트
const idList = ["hello1", "world2"];

// 요소 노드
const id = document.getElementById("singup-id");
const pw = document.getElementById("singup-pw");
const pwCheck = document.getElementById("singup-pwcheck");
const idInput = document.getElementById("singup-id__input");
const pwInput = document.getElementById("singup-pw__input");
const pwCheckInput = document.getElementById("singup-pwcheck__input");
const singupButton = document.getElementById("singup-submit__button");
const singupForm = document.getElementById("singup__form");

// 유효성검사 함수(정규식 사용)
const validateCheck = (inputValue) => {
  console.log(inputValue);
};

// input요소의 blur 이벤트 감지 핸들러
const handleCheckInput = ({ target: { value } }) => {
  validateCheck(value);
};

idInput.addEventListener("blur", handleCheckInput);
pwInput.addEventListener("blur", handleCheckInput);

// 유효성 검사 결과에 따라 에러 메세지를 관리하는 함수

// // 유효성 검사 실패시 처리 함수
// const validateError = (errorText, singupBlock, isError) => {
//   if (isError) {
//     if (singupBlock.querySelector(".singup-errorText__p")) {
//       singupBlock.querySelector(".singup-errorText__p").textContent = errorText;
//     } else {
//       const errorTextElement = document.createElement("p");
//       errorTextElement.classList.add("singup-errorText__p");
//       errorTextElement.textContent = errorText;
//       singupBlock.appendChild(errorTextElement);
//     }
//   } else {
//     if (singupBlock.querySelector(".singup-errorText__p")) {
//       singupBlock.querySelector(".singup-errorText__p").remove();
//     }
//   }
// };

// // 아이디 유효성 검사 핸들러
// const handleValidateId = (input, idBlock, ID_REG) => (e) => {
//   const idValue = input.value;
//   // 입력값이 없다면 경고 텍스트를 출력시키는 코드
//   if (!idValue) {
//     validateError("아이디를 입력해주세요", idBlock, true);
//   } else if (!idValue.match(ID_REG)) {
//     validateError(
//       "4~10자의 영문 소문자, 숫자만 사용 가능합니다",
//       idBlock,
//       true
//     );
//   } else {
//     validateError(null, idBlock, false);
//     return true;
//   }
// };
// // 비밀번호 유효성 검사 핸들러
// const handleValidatePw = (input, pwBlock, PW_REG) => (e) => {
//   const pwValue = input.value;
//   if (!pwValue) {
//     validateError("비밀번호를 입력해주세요", pwBlock, true);
//   } else if (!pwValue.match(PW_REG)) {
//     validateError("8~16자 영문 대 소문자, 숫자를 사용하세요", pwBlock, true);
//   } else {
//     validateError(null, pwBlock, false);
//     return true;
//   }
// };
// // 비밀번호 재확인 핸들러
// const handleCheckPw = (pwInput, pwCheckBlock, pwCheckInput) => (e) => {
//   const pwValue = pwInput.value;
//   const pwCheckValue = pwCheckInput.value;
//   // 만약 pwInput이랑 e.target의 input이 동일하지 않으면
//   // 비밀번호가 일치하지 않는다는 텍스트 출력
//   if (pwValue !== pwCheckValue) {
//     validateError("비밀번호가 일치하지 않습니다.", pwCheckBlock, true);
//   } else {
//     validateError(null, pwCheckBlock, false);
//     return true;
//   }
// };

// // 동일 아이디 존재시 처리 핸들러
// const handleCheckSameId = (input, idBlock, idList) => (e) => {
//   const idValue = input.value;
//   // 이미 존재하는 아이디인지 확인하여 불리언으로 리턴
//   const idCheckResult = idList.includes(idValue);

//   if (idCheckResult) {
//     validateError("이미 존재하는 아이디입니다", idBlock, true);
//     return false;
//   } else {
//     return true;
//   }
// };

// // 회원 가입 검사 핸들러
// const handleSingup = (validateId, validatePw, checkPw, checkSameId) => (e) => {
//   if (validateId() && validatePw() && checkPw() && checkSameId()) {
//     alert("회원가입이 완료되었습니다");
//   }
// };

// idInput.addEventListener("blur", handleValidateId(idInput, id, ID_REG));
// pwInput.addEventListener("blur", handleValidatePw(pwInput, pw, PW_REG));
// pwCheckInput.addEventListener(
//   "blur",
//   handleCheckPw(pwInput, pwCheck, pwCheckInput)
// );
// singupButton.addEventListener("click", handleCheckSameId(idInput, id, idList));
// singupButton.addEventListener(
//   "click",
//   handleSingup(
//     handleValidateId(idInput, id, ID_REG),
//     handleValidatePw(pwInput, pw, PW_REG),
//     handleCheckPw(pwInput, pwCheck, pwCheckInput),
//     handleCheckSameId(idInput, id, idList)
//   )
// );
// singupForm.addEventListener("submit", (e) => {
//   e.preventDefault();
// });
