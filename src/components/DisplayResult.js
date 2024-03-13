import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";
import { Textfit } from "react-textfit";
const Screen = () => {
  const { calc } = useContext(CalcContext);

  return (
    <dir className="display">
      <div className="expression">{calc.expression}</div>
      <Textfit className="result" max={50} mode="single">
        <div className="calculation">{calc.num ? calc.num : calc.res}</div>
        {/* <div className="operator">{calc.num ? calc.num : calc.res}</div> */}
      </Textfit>
    </dir>
  );
};

export default Screen;
