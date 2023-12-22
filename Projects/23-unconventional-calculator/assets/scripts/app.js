const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

function createAndWriteOutput(operator, resultBeforeCalc, calcNum) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNum}`;
  outputResult(currentResult, calcDescription);
}

function calcResult(calculationType) {
  initialResult = currentResult;
  let MathOperator;
  if (calculationType === "ADD") {
    currentResult += +userInput.value;
    MathOperator = "+";
  } else if ((calculationType === "SUBTRACT")) {
    currentResult -= +userInput.value;
    MathOperator = "-";
  } else if ((calculationType === "MULTIPLY")) {
    currentResult *= +userInput.value;
    MathOperator = "*";
  } else if (calculationType === "DIVIDE") {
    currentResult /= +userInput.value;
    MathOperator = "/";
  }

  createAndWriteOutput(MathOperator, initialResult, +userInput.value);
  writeToLog(calculationType, initialResult, +userInput.value, currentResult);
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operator: operationIdentifier,
    prevResult,
    number: operationNumber,
    result: newResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function add() {
  calcResult("ADD");
}

function subtract() {
  calcResult("SUBTRACT");
}

function multiply() {
  calcResult("MULTIPLY");
}

const divide = () => {
    calcResult("DIVIDE");

};

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
