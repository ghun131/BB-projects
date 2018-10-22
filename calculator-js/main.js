let numKeys = document.getElementsByClassName("num");
let multiply = document.getElementById("multiply");
let subtraction = document.getElementById("subtraction");
let addition = document.getElementById("addition");
let division = document.getElementById("division");
let equalSign = document.getElementById("equal-sign");
let screen = document.getElementById("screen");

let firstNum = "";
let secondNum = "";
let operator = ""
let result;

// Input number
const inputFirstNum = e => {
  if (e.target.innerText) {
    let text = e.target.innerText;
    firstNum = firstNum.concat(text);
  }
  console.log(firstNum);
};

const inputSecondNum = e => {
  for (let i = 0; i < numKeys.length; i++) {
    numKeys[i].onclick = e => {
      if (e.target.innerText) {
        let text = e.target.innerText;
        secondNum = secondNum.concat(text);
      }
      console.log(secondNum);
    };
  }
};

// Convert String into Number
const convertStringToNumber = (num1, num2) => {
    return num1 = Number(num1);
    return num2 = Number(num2);
}

// Record numbers into recordFirstNum
for (let i = 0; i < numKeys.length; i++) {
  numKeys[i].onclick = e => {
    inputFirstNum(e);
  };
}

// Mathematical Operations
let operations = {
  addTwoNums: (first, second) => (result = first + second),
  subtractTwoNums: (first, second) => (result = first - second),
  multiplyTwoNums: (first, second) => (result = first * second),
  divideTwoNums: (first, second) => (result = first / second)
};

// Click events for operators
addition.onclick = (e) => {
  operator = 'addition'
 };
        
        // .onclick = () => { addTwoNums(firstNum, secondNum) };
subtraction.onclick = () => {
  console.log("subtract");
};
multiply.onclick = () => {
  console.log("multiply");
};
division.onclick = () => {
  console.log("divide");
};

// Print on screen
const printResult = () => {
  screen.innerHTML = result;
};

// Click event for equal sign
equalSign.onclick = () => {
  console.log("finish operation and printt result");
};
