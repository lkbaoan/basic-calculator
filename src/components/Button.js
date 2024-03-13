import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = (button) => {
  const className = {
    "=": "equals",
    "x": "opt",
    "-": "opt",
    "+": "plus",
    "/": "opt",
    "0": "zero",
  };
  return className[button];
};

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);

  const commaClick = () => {
    let newNum = !calc.num.toString().includes(".")
      ? calc.num + value
      : calc.num;
    let newExp = calc.expression.replace(/\+|\/|\*|\-.*$/, "")

    setCalc({
      ...calc,
      expression: calc.sign ? calc.expression + newNum : newNum,
      num: newNum,
    });
  };

  const resetClick = () => {
    setCalc({ expression: "", sign: "", num: 0, res: 0 });
  };

  const handleClickButton = () => {
    const numberString = value.toString();

    let numberValue;
    if (numberString === "0" && calc.num === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }

    let newExp = calc.expression + numberString;
    setCalc({
      ...calc,
      expression: newExp,
      num: numberValue,
    });
  };

  const signClick = () => {
    let result = !calc.res && calc.num ? calc.num : calc.res;
    let newExp = calc.expression;
    // console.log("String: " + calc.expression);
    // console.log("Last char: " + calc.expression.slice(-1));
    // console.log("Res: " + calc.res);
    // console.log("Num: " + calc.num);
    // console.log("Sign: " + calc.sign);
    switch (calc.expression.slice(-1)) {
      case "x":
      case "/":
      case "-":
      case "+":
      case ".":
        newExp = calc.expression.substring(0, calc.expression.length - 1);
        break;
      default:
        if (calc.sign) {
          result = calculate(calc.res, calc.num, calc.sign);
          newExp = result;
        }
    }
    newExp = newExp + value;
    // console.log(newExp);
    setCalc({
      sign: value,
      res: result,
      expression: newExp,
      num: 0,
    });
  };

  const equalsClick = () => {
    if (calc.res && calc.num) {
      let result = calculate(calc.res, calc.num, calc.sign);
      setCalc({
        res: result,
        expression: result.toString(),
        sign: "",
        num: 0,
      });
    }
  };
  const calculate = (a, b, sign) => {
    const result = {
      "+": (a, b) => +a + +b,
      "-": (a, b) => a - b,
      "x": (a, b) => a * b,
      "/": (a, b) => a / b,
    };
    if (b === null || sign === null) {
      return result[sign](a);
    }
    return result[sign](a, b);
  };

  const handlebuttonClick = () => {
    const results = {
      ".": commaClick,
      "C": resetClick,
      "/": signClick,
      "x": signClick,
      "-": signClick,
      "+": signClick,
      "=": equalsClick,
    };
    if (results[value]) {
      return results[value]();
    } else {
      return handleClickButton();
    }
  };

  return (
    <button
      onClick={handlebuttonClick}
      className={`${getStyleName(value)} button`}
    >
      {value}
    </button>
  );
};

export default Button;
