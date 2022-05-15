import React, { Component } from "react";
import { eventBusService } from "../services/eventBusService";

export default class UserMessage extends Component {
  state = {
    text: "",
    isShown: false,
  };

  componentDidMount() {
    this.unsubscrice = eventBusService.on("show-msg", (text) => {
      this.setState({ text });
      this.setState({ isShown: (this.state.isShown = true) });
      setTimeout(() => {
        this.setState({ isShown: (this.state.isShown = false) });
      }, 3000);
    });
  }

  render() {
    const { text, isShown } = this.state;
    const messageClass = isShown ? "user-msg show-msg" : "user-msg";
    return <p className={messageClass}>{text}</p>;
  }
}
