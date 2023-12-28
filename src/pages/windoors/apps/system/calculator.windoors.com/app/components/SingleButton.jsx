import React from "react";

export default class SingleButton extends React.Component {
 constructor(props) {
  super(props);
 }

 render() {
  return (
   <div>
    <button
     type="button"
     className={this.props.className || ""}
     onClick={(e) => {
      this.props.onClick(this.props.value);
     }}
    >
     {this.props.children}
    </button>
   </div>
  );
 }
}
