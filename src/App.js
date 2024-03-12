import "./App.css";
import Wrapper from "./components/Wrapper";
import DisplayResult from "./components/DisplayResult";
import Button from "./components/Button";
import ButtonBox from "./components/ButtonBox";
import CalcProvider from "./context/CalcContext";
const buttonValue = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "x"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

function App() {
  return (
    <CalcProvider>
      <Wrapper>
        <DisplayResult />
        <ButtonBox>
          {buttonValue.flat().map((button, i) => (
            <Button value={button} key={i} />
          ))}
        </ButtonBox>
      </Wrapper>
    </CalcProvider>
  );
}

export default App;
