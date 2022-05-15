import { Link } from "react-router-dom";
import React, { Component } from "react";
import { userService } from "../services/userService";
import { bitcoinService } from "../services/bitcoinService";
import { connect } from "react-redux";
import { getLoggedInUser } from "../store/actions/userActions";
import { MovesList } from "../cmps/MovesList";

class _HomePage extends Component {
  state = {
    user: null,
    btcRate: 0,
  };

  async componentDidMount() {
    await this.props.getLoggedInUser();
    setTimeout(() => {
      if (!this.props.loggedInUser) this.props.history.push("/SignUp");
    }, 5);

    this.loadBitcoinRate();
  }

  async loadUser() {
    const user = await userService.getUser();

    this.setState({ user });
  }

  async loadBitcoinRate() {
    const btcRate = await bitcoinService.getBitcionRate();
    this.setState({ btcRate });
  }

  get FirstName() {
    // const firstName = this.state.user.name.split(" ")[0];
    // return firstName;
    return "lirannnn";
  }

  get BitcoinIcon() {
    const image = require("../assets/images/bitcoin.png");
    return image;
  }

  render() {
    const { btcRate } = this.state;
    const { loggedInUser } = this.props;
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const firstName = loggedInUser?.name.split(" ")[0];

    if (!loggedInUser && !btcRate) return <div>Loading...</div>;

    return (
      <section className="main-layout home-page">
        <h1> Hello {firstName}</h1>
        <h2>💰 Coins: {loggedInUser.coins}</h2>
        <h2>
          <img className="bitcoin-icon" src={this.BitcoinIcon} alt="" />
          <span>Rate: {formatter.format(1 / btcRate)}</span>
        </h2>
        <Link className="link" to="/contact">
          Contacts
        </Link>
        <Link className="link" to="/statistics">
          Statistics
        </Link>
        <Link className="link" to="/signup">
          Switch user
        </Link>
        <MovesList loggedInUser={loggedInUser} />
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  getLoggedInUser,
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage);
