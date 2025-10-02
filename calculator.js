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
    case "+":
      return Math.round(add(+number1, +number2) * 100000) / 100000;
    case "-":
      return Math.round(subtract(+number1, +number2) * 100000) / 100000;
    case "x":
      return Math.round(multiply(+number1, +number2) * 100000) / 100000;

    case "/":
      return Math.round(divide(+number1, +number2) * 100000) / 100000;
    case "=":
      return number1;
    default:
      console.error("Unrequnised opreation");
  }
}

function handleBackspace() {
  display_input.value = display_input.value.slice(0, -1);
  cur_number += display_input.value;
}

function handleEqual() {
  Object.keys(opreations).forEach((resetOp) => {
    const btn = document.querySelector("#" + resetOp);
    btn.style.backgroundColor = ""; // or default color
  });
  if (number1 != "" && cur_opreation != "") {
    number2 = display_input.value;
    number1 = operate(cur_opreation, number1, number2);
    display_input.value = number1;
    cur_opreation = "=";
    cur_number = "";
    number1 = "";
    number2 = "";
  }
}

function handleClear() {
  number1 = "";
  number2 = "";
  cur_number = "";
  cur_opreation = "";
  display_input.value = "";
  Object.keys(opreations).forEach((resetOp) => {
    const btn = document.querySelector("#" + resetOp);
    btn.style.backgroundColor = ""; // or default color
  });
}
let backspace_symbol = "&#x232B;";
// function handleInput(key) {
//   if (!isNaN(key)) {
//     numberButtons.find((button) => button.textContent.trim() === key).click();
//   } else if (key === "=") {
//     equal_button.click();
//   } else if (key === "CLR") {
//     clear_button.click();
//   } else if (key === "Backspace") {
//     handleBackspace();
//   } else if (key === ".") {
//     handleDecimal();
//   } else if (Object.values(opreations).includes(key)) {
//     let keyWithKeyStroke = Object.keys(opreations).find(
//       (dict_key) => opreations[dict_key] === key
//     );
//     console.log(keyWithKeyStroke);
//     let button = document.querySelector("#" + keyWithKeyStroke);
//     console.log(button);
//     handleOpreation(button);
//   }
// }

function handleInput(key) {
  if (!isNaN(key)) {
    const button = numberButtons.find(
      (button) => button.textContent.trim() === key
    );
    if (button) handleNumberButtonClick(button); // ✅ call directly
  } else if (key === "=") {
    equal_button.click();
  } else if (key === "CLR") {
    clear_button.click();
  } else if (key === "Backspace") {
    handleBackspace();
  } else if (key === ".") {
    handleDecimal();
  } else if (Object.values(opreations).includes(key)) {
    let keyWithKeyStroke = Object.keys(opreations).find(
      (dict_key) => opreations[dict_key] === key
    );
    let button = document.querySelector("#" + keyWithKeyStroke);
    if (button) handleOpreation(button); // call directly instead of click
  }
}

function handleDecimal() {
  display_input.value += ".";
  cur_number += ".";
  decimal_button.disabled = true;
}

function handleOpreation(button) {
  if (cur_opreation === button.textContent) return;
  Object.keys(opreations).forEach((resetOp) => {
    const btn = document.querySelector("#" + resetOp);
    btn.style.backgroundColor = ""; // or default color
  });

  button.style.backgroundColor = "lightblue";
  if (number1 === "") {
    number1 = display_input.value;
    cur_opreation = button.textContent;
    console.log(button.textContent);
    cur_number = "";
  } else {
    if (number2 === "") {
      number2 = display_input.value;
      number1 = operate(cur_opreation, number1, number2);
      display_input.value = number1;
      cur_opreation = button.textContent;
      cur_number = "";
    } else {
      number2 = cur_number;
      number1 = operate(cur_opreation, number1, number2);
      display_input.value = number1;
      cur_opreation = button.textContent;
      cur_number = "";
    }
  }
}

function handleNumberButtonClick(button) {
  if (cur_number === "") {
    display_input.value = "";
    decimal_button.disabled = false;
  }
  display_input.value += button.textContent;
  cur_number += button.textContent;
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

const decimal_button = document.querySelector("#decimial");
decimal_button.addEventListener("click", () => {
  handleDecimal();
});

const backspace_button = document.querySelector("#backspace");
backspace_button.addEventListener("click", () => {
  handleBackspace();
});
numberButtons.forEach((button) => {
  button.addEventListener("click", () => handleNumberButtonClick(button));
});
let opreations = { multi: "*", minus: "-", add: "+", divide: "/" };

Object.keys(opreations).forEach((opreation) => {
  let button = document.querySelector("#" + opreation);
  button.addEventListener("click", () => handleOpreation(button));
});
clear_button = document.querySelector("#clear");
clear_button.addEventListener("click", () => {
  handleClear();
});
equal_button = document.querySelector("#equal");
equal_button.addEventListener("click", () => {
  handleEqual();
});

document.addEventListener("keydown", (event) => {
  const key = event.key;
  console.log(key);
  // Prevent default behavior to avoid double-triggering
  if (
    key === "Enter" ||
    key === "Backspace" ||
    ["+", "-", "*", "/"].includes(key) ||
    (key >= "0" && key <= "9") || // ✅ Changed this line
    key === "."
  ) {
    event.preventDefault();
  }
  if (key === "Enter") {
    handleInput("=");
  } else if (key === "Backspace") {
    handleInput("Backspace");
  } else if (["+", "-", "*", "/"].includes(key)) {
    handleInput(key);
  } else if (key >= "0" && key <= "9") {
    handleInput(key);
  } else if (key === ".") {
    handleInput(key);
  }
});
