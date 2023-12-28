import React from "react";
import "./app/app.css";

/* npm install mathjs */
import * as math from "mathjs";

/* Images */
import Zero from "./app/components/zero.png";

/* Components */
import SingleButton from "./app/components/SingleButton";
const ZeroImg = (
 <>
  <img
   src={Zero}
   alt="0"
   style={{
    width: "1.5rem",
    height: "2.5rem",
   }}
  />
 </>
);

export default class Calculator extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   // Output is the main calculation
   output: "",
   // Result is the preview of the output
   result: "",
   // The last shown result
   resultLast: ZeroImg,
   // Hint is the prediction of the bracket
   hint: "",
   // Data is the data of previous calculation
   data: [],
  };
 }

 componentDidMount = () => {
  // Get data from local storage
  let data = JSON.parse(localStorage.getItem("data"));
  if (data) {
   this.setState({ data: data });
  }
 };

 componentDidUpdate = () => {
  // Store data in local storage
  localStorage.setItem("data", JSON.stringify(this.state.data));

  const process = document.querySelector(".process");
  // always scroll to the end
  process.scrollLeft = process.scrollWidth;
 };

 signs = {
  // Signs
  plus: "+",
  minus: "-",
  multiply: "x",
  divide: "÷",
  power: "ⁿ",
  square: "²",
  inverse: "⁻¹",
  root: "√",
  pi: "π",
  dot: ".",
  comma: ",",
  openBracket: "(",
  closeBracket: ")",
  equal: "=",
  // Scientific
  sin: "sin",
  cos: "cos",
  tan: "tan",
  log: "log",
  ln: "ln",
  exp: "E",
  // Others
  ans: "Ans",
  clear: "AC",
  delete: "DEL",
  shift: "SHIFT",
  alpha: "ALPHA",
  mode: "MODE",
  on: "ON",
  replay: "REPLAY",
  calc: "Calc",
  ax: "ax",
  const: "CONST",
  rcl: "RCL",
  eng: "ENG",
  hip: "hip",
  mPlus: "M+",
  degree: "°",
 };

 insert = {
  /* Simply append the number to the output */
  number: (v) => {
   let o = this.state.output;
   this.setState({
    output: o + v,
    result: o + v,
   });
  },
  /* Append the sign to the output */
  sign: (v) => {
   let o = this.state.output;
   let d = this.state.data[this.state.data.length - 1];
   /* Check if the last character is already a sign except for ( sign & previous calculation */
   if (o === "" || (o !== d && this.utils.isLastSign(o, [")", "²", "⁻¹"])))
    return;
   else {
    if (v === "*") v = "x";
    if (v === "/") v = "÷";
    if (v === "^-1") v = "⁻¹";
    if (v === "^2") v = "²";
    if (v === "^") v = "ⁿ";

    this.setState({
     output: o + v,
     result: o + v,
    });
   }
  },
  /* Append two type of brackets to the output */
  bracket: (val) => {
   let o = this.state.output,
    v = val;
   let hintBracket = (num) => ")".repeat(num);
   /* Check if the last character is a sign & if the last character is a closing bracket */
   let signs = this.utils.isLastSign(o, ["(", ")"]);
   if (v === "(" && o === "") {
    this.setState({
     output: v,
     result: v,
    });
   }
   if (o === "") return;
   if (v === ")" && signs) return;
   if (v === "(" && o[o.length - 1] === ".") return;
   /* Check if the value hasn't any opening bracket */
   if (v === ")" && o.search(/\(/g) === -1) return;
   this.setState({
    output: o + v,
    result: o + v,
   });
   /* Insert hint according to the bracket */
   if (v === ")") {
    this.setState({
     hint: this.state.hint.substring(0, this.state.hint.length - 1),
    });
   } else {
    this.setState({
     hint: this.state.hint + hintBracket(1),
    });
   }
  },
  /* Append sin, cos, tan, log, ln, x^, x^2, x^-1, √, a^b/c, a.b/c, a,b,c to the output */
  scientific: (v) => {
   let o = this.state.output;
   this.setState({
    output: o + v + "(",
    result: o + v + "(",
    hint: this.state.hint + ")",
   });
  },
  /* Append E to the output */
  E: () => {
   let o = this.state.output;
   this.setState({
    output: o + "E",
    result: o + "E",
   });
  },
 };

 utils = {
  /* Check if the number is 10 digit or more */
  is10Digit: (v) => {
   if (v.toString().length > 10) {
    return true;
   } else {
    return false;
   }
  },
  /* Check if the last character is a sign */
  isLastSign: (v, accept) => {
   let signs = [
    "+",
    "-",
    "*",
    "x",
    "/",
    "÷",
    ".",
    "(",
    ")",
    "^",
    "²",
    "⁻¹",
    "ⁿ",
   ];
   if (signs.includes(v[v.length - 1])) {
    /* Accept is an array of sign that will be accepted */
    if (accept) {
     if (accept.includes(v[v.length - 1])) {
      return false;
     } else return true;
    } else return true;
   } else return false;
  },
  /* Convert the signs to their respective symbols */
  toScientific: (t) => {
   let text = t;
   text = text.replaceAll(/sin\(/g, "sin(" + Math.PI / 180 + "*");
   text = text.replaceAll(/cos\(/g, "cos(" + Math.PI / 180 + "*");
   text = text.replaceAll(/tan\(/g, "tan(" + Math.PI / 180 + "*");
   text = text.replaceAll(/log/g, "log10");
   text = text.replaceAll(/ln\(/g, "log(");
   text = text.replaceAll(/√/g, "sqrt");
   text = text.replaceAll(/x\^/g, "pow");
   text = text.replaceAll(/x\^2/g, "pow");
   text = text.replaceAll(/x\^-1/g, "pow");
   text = text.replaceAll(/π/g, "PI");
   return text;
  },
  /* Common calculation */
  toCalculate: (k) => {
   /* Find sin and convert radian to degree */
   let final = math.evaluate(
    this.utils
     .toScientific(k)
     .replaceAll("x", "*")
     .replaceAll("÷", "/")
     .replaceAll("⁻¹", "^-1")
     .replaceAll("²", "^2")
     .replaceAll("ⁿ", "^")
   );
   document.querySelectorAll(".__output-box > .result")[0].style.fontFamily =
    '"Digital", sans-serif';
   /* Make decimal limited to 9 */
   if (final.toString().length > 9 && final.toString().includes(".")) {
    final = Number(final.toString().substring(0, 9));
   }
   /* Convert to exponential if the number is 10 digit or more */
   if (this.utils.is10Digit(final)) {
    /* Make it scientific like 1*10^2 */
    final = final.toExponential(2).replace("e", "x10ⁿ").replace("+", "");
    document.querySelectorAll(".__output-box > .result")[0].style.fontFamily =
     "sans-serif";
   }
   return final;
  },
 };

 /* Calculate the output else show error */
 calculate = () => {
  try {
   let final = this.utils.toCalculate(this.state.output),
    err_msg = "Math ERROR";
   if (isNaN(final) && final.includes("x10ⁿ") === false) {
    document.querySelectorAll(".__output-box > .result")[0].style.fontFamily =
     "sans-serif";
    this.setState({
     resultLast: <small>{err_msg}</small>,
    });
   } else {
    this.setState({
     resultLast: final,
     data: [...this.state.data, final],
     hint: "",
    });
   }
  } catch (e) {
   document.querySelectorAll(".__output-box > .result")[0].style.fontFamily =
    "sans-serif";
   this.setState({
    resultLast: <small>Syntax ERROR</small>,
   });
  }
 };

 /* Delete the last character from the output */
 delete = () => {
  let o = this.state.output.toString();
  if (o.length < 1) {
   this.setState({
    result: "",
    hint: "",
   });
  } else {
   // remove NaN at once
   o = o.replaceAll(/NaN/g, "");
   this.setState({
    result: o.substring(0, o.length - 1),
    output: o.substring(0, o.length - 1),
    resultLast: ZeroImg,
   });
   if (o[o.length - 1] === "(") {
    this.setState({
     hint: this.state.hint.substring(0, this.state.hint.length - 1),
    });
   }
  }
 };

 /* Clear the output fully */
 clear = () => {
  this.setState({
   result: "",
   output: "",
   resultLast: ZeroImg,
   hint: "",
  });
 };

 /* Show the previous result */
 ans = () => {
  let d = this.state.data;
  if (d.length === 0) return;
  /* Convert scientific to normal */
  if (d[d.length - 1].toString().includes("x10ⁿ")) {
   d[d.length - 1] = Number(d[d.length - 1].toString().replaceAll("x10ⁿ", "e"));
  }
  this.setState({
   result: this.state.output + Number(d[d.length - 1]),
   output: this.state.output + Number(d[d.length - 1]),
  });
 };

 render() {
  return (
   <>
    <div className="__calculator-main">
     {/* OUTPUT */}
     <div className="__output">
      <div className="row1">
       <p>
        <b>Windoors</b>
       </p>
       <p>
        <small>SCIENTIFIC CALCULATOR</small>
       </p>
       <p>
        <em>Fx-100MS</em>
       </p>
      </div>
      <div className="row2">
       <b>S-A.P.V.M.</b>
      </div>
      <div className="__output-box">
       <div className="process">
        {this.state.result}
        <span className="__cursor"></span>
        <font color="grey">{this.state.hint}</font>
       </div>
       <div
        className="result"
        style={{ textAlign: "right", padding: "0 0.5rem", color: "#173541" }}
       >
        {this.state.resultLast}
       </div>
      </div>
     </div>
     {/* INPUT */}
     <div className="__input">
      <div className="__grid-calculator __6x __no-gap">
       <SingleButton onClick={this.clear} value="" className="__whitish">
        SHIFT
       </SingleButton>
       <SingleButton onClick={this.clear} value="" className="__whitish">
        ALPHA
       </SingleButton>
       <div className="d-flex">
        <div className="__control-top-left"></div>
        <div className="__control-top-right"></div>
       </div>
       <SingleButton onClick={this.clear} value="" className="__whitish">
        MODE
       </SingleButton>
       <SingleButton onClick={this.clear} value="" className="__whitish">
        ON
       </SingleButton>
      </div>
      {/* ----- SCIENTIF CALCULATION -------- */}
      <div className="__grid-calculator __6x __no-gap">
       <SingleButton onClick={this.insert.sign} value="" className="__dark">
        Calc
       </SingleButton>
       <SingleButton onClick={this.insert.sign} value="" className="__dark">
        ax
       </SingleButton>
       <div className="d-flex">
        <div className="__control-bottom-left">
         <p>REPLAY</p>
        </div>
        <div className="__control-bottom-right"></div>
       </div>
       <SingleButton onClick={this.insert.sign} value="^-1" className="__dark">
        x<sup>-1</sup>
       </SingleButton>
       <SingleButton onClick={this.insert.sign} value="" className="__dark">
        CONST
       </SingleButton>
      </div>
      {/*  */}
      <div className="__grid-calculator __6x">
       <SingleButton onClick={this.insert.number} value="" className="__dark">
        a<small>b/c</small>
       </SingleButton>
       <SingleButton
        onClick={this.insert.scientific}
        value="√"
        className="__dark"
       >
        √
       </SingleButton>
       <SingleButton onClick={this.insert.sign} value="^2" className="__dark">
        x<sup>2</sup>
       </SingleButton>
       <SingleButton onClick={this.insert.sign} value="^" className="__dark">
        x<sup>^</sup>
       </SingleButton>
       <SingleButton
        onClick={this.insert.scientific}
        value="log"
        className="__dark"
       >
        Log
       </SingleButton>
       <SingleButton
        onClick={this.insert.scientific}
        value="ln"
        className="__dark"
       >
        ln
       </SingleButton>
       {/*  */}
       <SingleButton onClick={this.insert.number} value="-" className="__dark">
        (-)
       </SingleButton>
       <SingleButton onClick={this.insert.number} value="°" className="__dark">
        °
        <sup>
         <big style={{ fontSize: "1rem", lineHeight: 0 }}>,,,</big>
        </sup>
       </SingleButton>
       <SingleButton onClick={this.insert.number} value="" className="__dark">
        hip
       </SingleButton>
       <SingleButton
        onClick={this.insert.scientific}
        value="sin"
        className="__dark"
       >
        sin
       </SingleButton>
       <SingleButton
        onClick={this.insert.scientific}
        value="cos"
        className="__dark"
       >
        cos
       </SingleButton>
       <SingleButton
        onClick={this.insert.scientific}
        value="tan"
        className="__dark"
       >
        tan
       </SingleButton>
       {/*  */}
       <SingleButton onClick={this.insert.number} value="" className="__dark">
        RCL
       </SingleButton>
       <SingleButton onClick={this.insert.number} value="" className="__dark">
        ENG
       </SingleButton>
       <SingleButton onClick={this.insert.bracket} value="(" className="__dark">
        (
       </SingleButton>
       <SingleButton onClick={this.insert.bracket} value=")" className="__dark">
        )
       </SingleButton>
       <SingleButton onClick={this.insert.sign} value="" className="__dark">
        ,
       </SingleButton>
       <SingleButton onClick={this.insert.number} value="" className="__dark">
        M+
       </SingleButton>
      </div>
      {/* ----- SIMPLE CALCULATION -------- */}

      <div className="__grid-calculator __5x">
       <SingleButton onClick={this.insert.number} value="7" className="__white">
        7
       </SingleButton>
       <SingleButton onClick={this.insert.number} value="8" className="__white">
        8
       </SingleButton>
       <SingleButton onClick={this.insert.number} value="9" className="__white">
        9
       </SingleButton>
       <SingleButton onClick={this.delete} className="__red">
        DEL
       </SingleButton>
       <SingleButton onClick={this.clear} value="/" className="__red">
        AC
       </SingleButton>
       {/*  */}
       <SingleButton onClick={this.insert.number} value="4" className="__white">
        4
       </SingleButton>
       <SingleButton onClick={this.insert.number} value="5" className="__white">
        5
       </SingleButton>
       <SingleButton onClick={this.insert.number} value="6" className="__white">
        6
       </SingleButton>
       <SingleButton onClick={this.insert.sign} value="*" className="__white">
        x
       </SingleButton>
       <SingleButton onClick={this.insert.sign} value="/" className="__white">
        ÷
       </SingleButton>
       {/*  */}
       <SingleButton onClick={this.insert.number} value="1" className="__white">
        1
       </SingleButton>
       <SingleButton onClick={this.insert.number} value="2" className="__white">
        2
       </SingleButton>
       <SingleButton onClick={this.insert.number} value="3" className="__white">
        3
       </SingleButton>
       <SingleButton onClick={this.insert.sign} value="+" className="__white">
        +
       </SingleButton>
       <SingleButton onClick={this.insert.sign} value="-" className="__white">
        -
       </SingleButton>
       {/*  */}
       <SingleButton onClick={this.insert.number} value="0" className="__white">
        0
       </SingleButton>
       <SingleButton onClick={this.insert.number} value="." className="__white">
        .
       </SingleButton>
       <SingleButton onClick={this.insert.E} value="E" className="__white">
        EXP
       </SingleButton>
       <SingleButton onClick={this.ans} value="" className="__white">
        Ans
       </SingleButton>
       <SingleButton onClick={this.calculate} value="" className="__white">
        =
       </SingleButton>
      </div>
     </div>
    </div>
   </>
  );
 }
}
