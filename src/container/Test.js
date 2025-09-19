import React, { Component } from "react";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = { passage: "" };
    this.contentRef = React.createRef();
  }

  onHandleInput = () => {
    if (this.contentRef.current) {
      let pass = this.contentRef.current.innerText; // ✅ Read updated text
      this.setState({ passage: pass }); // ✅ Update state
    } else {
    }
  };

  render() {
    return (
      <div>
        <div
          ref={this.contentRef}
          contentEditable={true}
          onInput={this.onHandleInput} // ✅ Captures live input
          style={{
            outline: "none",
            padding: "20px",
            backgroundColor: "#FFF",
            margin: "20px",
            borderRadius: "7px",
            boxShadow: "0px 7px 25px #80008077",
          }}
        >
          Type here...
        </div>
      </div>
    );
  }
}
