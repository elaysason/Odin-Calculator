function add(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function sum(number1, number2) {
  return number1 + number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  if (number2 === 0) {
    alert("Can't divide by zero :(");
    return 0;
  }

  return number1 / number2;
}

function operate(opreator, number1, number2) {
  console.log(opreator, number1, number2);
  switch (opreator) {
    case "add":
      return Math.round(add(+number1, +number2) * 100000) / 100000;
    case "minus":
      return Math.round(subtract(+number1, +number2) * 100000) / 100000;
    case "multi":
      return Math.round(multiply(+number1, +number2) * 100000) / 100000;

    case "divide":
      return Math.round(divide(+number1, +number2) * 100000) / 100000;
    case "equal":
      return number1;
    default:
      console.error("Unrequnised opreation");
  }
}
const all_buttons = Array.from(document.querySelectorAll("button"));
const numberButtons = all_buttons.filter(
  (button) => !isNaN(button.textContent)
);
const display_input = document.querySelector("input");
let number1 = "";
let number2 = "";
let cur_opreation = "";
let cur_number = "";
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (cur_number === "") {
      display_input.value = "";
    }
    display_input.value += button.textContent;
    cur_number += button.textContent;
  });
});
let opreations = ["multi", "minus", "add", "divide"];
opreations.forEach((opreation) => {
  let button = document.querySelector("#" + opreation);

  button.addEventListener("click", () => {
    if (cur_opreation === opreation) return;
    opreations.forEach((resetOp) => {
      const btn = document.querySelector("#" + resetOp);
      btn.style.backgroundColor = ""; // or default color
    });

    button.style.backgroundColor = "lightblue";
    if (number1 === "") {
      number1 = display_input.value;
      cur_opreation = opreation;
      console.log(opreation);
      cur_number = "";
    } else {
      if (number2 === "") {
        number2 = display_input.value;
        number1 = operate(cur_opreation, number1, number2);
        display_input.value = number1;
        cur_opreation = opreation;
        cur_number = "";
      } else {
        number2 = cur_number;
        number1 = operate(cur_opreation, number1, number2);
        display_input.value = number1;
        cur_opreation = opreation;
        cur_number = "";
      }
    }
  });
});
clear_button = document.querySelector("#clear");
clear_button.addEventListener("click", () => {
  number1 = "";
  number2 = "";
  cur_number = "";
  cur_opreation = "";
  display_input.value = "";
  opreations.forEach((resetOp) => {
    const btn = document.querySelector("#" + resetOp);
    btn.style.backgroundColor = ""; // or default color
  });
});
equal_button = document.querySelector("#equal");
equal_button.addEventListener("click", () => {
  opreations.forEach((resetOp) => {
    const btn = document.querySelector("#" + resetOp);
    btn.style.backgroundColor = ""; // or default color
  });
  if (number1 != "" && cur_opreation != "") {
    number2 = display_input.value;
    number1 = operate(cur_opreation, number1, number2);
    display_input.value = number1;
    cur_opreation = "equal";
    cur_number = "";
  }
});
