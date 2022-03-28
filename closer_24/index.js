// 생성자 함수로 표현한 클로져
const Counter = (function () {
  // 1. 카운트 상태 변수
  let num = 0;

  function Counter() {
    // 만약 num이 생성자 함수 Counter 가 생성할 인스턴스의 프로퍼티라면
    // 인스턴스를 통해 외부에서 접근이 자유로운 public프로퍼티가 된다.
    // 프로퍼티는 public하므로 은닉되지 않는다.
    // this.num = 0;
  }

  Counter.prototype.increase = function () {
    return ++num;
  };

  Counter.prototype.decrease = function () {
    return num > 0 ? --num : 0;
  };

  return Counter;
})();

const counter = new Counter();

console.log(counter.increase()); // 1

console.log(counter.decrease()); // 0
