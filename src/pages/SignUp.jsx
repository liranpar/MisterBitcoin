import React, { Component } from "react";
import { connect } from "react-redux";
import { eventBusService } from "../services/eventBusService";
import { logIn } from "../store/actions/userActions";

class _SignUp extends Component {
  state = {
    name: "",
  };

  get BitcoinIcon() {
    const image = require("../assets/images/bitcoin.png");
    return image;
  }

  handleChange = ({ target }) => {
    // const value = target.type === "number" ? +target.value || "" : target.value;
    const field = target.name;
    const value = target.value;
    this.setState({ [field]: value });
  };

  onSignIn = async (ev) => {
    ev.preventDefault();
    const { name } = this.state;
    if (!name) {
      eventBusService.emit("show-msg", "Name is required");
      return;
    }
    const user = {
      name,
      coins: 100,
      moves: [],
    };
    this.props.logIn(user);

    setTimeout(() => {
      this.props.history.push("/");
    }, 100);
  };

  inputRef = (elInput) => {
    if (elInput) elInput.focus();
  };

  render() {
    const { name } = this.state;

    return (
      <section className="sign-up main-layout">
        <h1>Sign In</h1>
        <img className="bitcoin-icon" src={this.BitcoinIcon} alt="" />
        <form onSubmit={this.onSignIn}>
          <label htmlFor="name">Your name:</label>
          <input
            ref={this.inputRef}
            onChange={this.handleChange}
            type="text"
            id="name"
            name="name"
            value={name}
          />
          <button>Sign in</button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  logIn,
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(_SignUp);
