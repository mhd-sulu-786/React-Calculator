import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import './App.css';

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  const [calc, setCalc] = useState({
    sign: "",
    num: "0",
    res: "0",
  });

  const numClickHandler = (value) => {
    if (removeSpaces(calc.num).length < 16) {
      setCalc(prevCalc => ({
        ...prevCalc,
        num:
          prevCalc.num === "0" && value === "0"
            ? "0"
            : removeSpaces(prevCalc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(prevCalc.num + value)))
            : toLocaleString(prevCalc.num + value),
        res: !prevCalc.sign ? "" : prevCalc.res,
      }));
    }
  };

  const commaClickHandler = () => {
    if (!calc.num.includes(".")) {
      setCalc(prevCalc => ({
        ...prevCalc,
        num: prevCalc.num + ".",
      }));
    }
  };

  const signClickHandler = (value) => {
    if (!calc.sign) {
      setCalc(prevCalc => ({
        ...prevCalc,
        sign: value,
        res: !prevCalc.res && prevCalc.num ? prevCalc.num : prevCalc.res,
        num: "",
      }));
    }
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
      {
        switch (sign) {
          case '+':
            return a+b;
          case '-':
            return a-b;
           case '/':
            return a/b;
          case 'x':
            return a*b;
          case '%':
            return (a/b)*100;
          default:
            break;
        }
       }

      setCalc(prevCalc => ({
        ...prevCalc,
        res:
          toLocaleString(
            math(
              Number(removeSpaces(prevCalc.res)),
              Number(removeSpaces(prevCalc.num)),
              prevCalc.sign
            )
          ),
        sign: "",
        num: "",
      }));
    }
  };

  const invertClickHandler = () => {
    setCalc({ ...calc, num: calc.num[0]==='-' ? calc.num.slice(1) : `-${calc.num} ` });
    
  };
  
  const percentClickHandler = () => {
    setCalc(prevCalc => ({
      ...prevCalc,
      res:
        toLocaleString(
          
           
            Number(removeSpaces(prevCalc.num))
            
          
        ),
      sign: "%",
      num: "",
    }));
  };

  const resetClickHandler = () => {
    setCalc({
      sign: "",
      num: '',
      res: '',
    });
  };

  const del_click = () => {
    setCalc({ ...calc, num: calc.num.slice(0, -1) });
  };

  return (
    <div className="App">
      <Container className='main'>
        <div className='display'>
          <label className='display-text  px-1 py-1'>{calc.num || calc.res}</label>
        </div>
        <Container className='btns '>
          <div className='d-flex tools '>
            <Button style={{backgroundColor:'red'}} onClick={resetClickHandler}>Clear</Button>
            <Button style={{backgroundColor:'skyblue'}} onClick={percentClickHandler}>%</Button>
            <Button style={{backgroundColor:'skyblue'}} onClick={invertClickHandler}>-/+</Button>
            <Button style={{backgroundColor:'red'}} onClick={del_click}>Del</Button>
          </div>
          <div className='d-flex  numbers'>
            <Button onClick={() => numClickHandler("1")}>1</Button>
            <Button onClick={() => numClickHandler("2")}>2</Button>
            <Button onClick={() => numClickHandler("3")}>3</Button>
            <Button style={{backgroundColor:'skyblue'}} onClick={() => signClickHandler('+')}>+</Button>
          </div>
          <div className='d-flex  numbers'>
            <Button onClick={() => numClickHandler("4")}>4</Button>
            <Button onClick={() => numClickHandler("5")}>5</Button>
            <Button onClick={() => numClickHandler("6")}>6</Button>
            <Button style={{backgroundColor:'skyblue'}} onClick={() => signClickHandler('-')}>-</Button>
          </div>
          <div className='d-flex  numbers'>
            <Button onClick={() => numClickHandler("7")}>7</Button>
            <Button onClick={() => numClickHandler("8")}>8</Button>
            <Button onClick={() => numClickHandler("9")}>9</Button>
            <Button style={{backgroundColor:'skyblue'}} onClick={() => signClickHandler('/')}>/</Button>
          </div>
          <div className=' d-flex tools'>
            <Button onClick={() => numClickHandler("0")}>0</Button>
            <Button onClick={commaClickHandler}>.</Button>
            <Button style={{backgroundColor:'darkblue'}} onClick={equalsClickHandler}>=</Button>
            <Button style={{backgroundColor:'skyblue'}} onClick={() => signClickHandler('x')}>x</Button>
          </div>
        </Container>
      </Container>
    </div>
  );
}

export default App;