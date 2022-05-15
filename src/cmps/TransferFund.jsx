import React, { Component } from "react";
import { connect } from "react-redux";
import { getLoggedInUser, addMove } from "../store/actions/userActions";
import { eventBusService } from "../services/eventBusService";

class _TransferFund extends Component {
  state = {
    amount: "",
  };

  async componentDidMount() {
    this.props.getLoggedInUser();
  }

  handleChange = ({ target }) => {
    const value = +target.value;
    this.setState({ amount: value });
  };

  onTransferCoins = async (ev) => {
    ev.preventDefault();
    const { amount } = this.state;
    const { loggedInUser, contact } = this.props;

    if (!amount) {
      eventBusService.emit("show-msg", "Amount is required");
      return;
    }

    if (amount < 0) {
      eventBusService.emit("show-msg", "Please select a positive amount");
      this.setState({ amount: "" });
      return;
    }
    if (amount > loggedInUser.coins) {
      eventBusService.emit(
        "show-msg",
        `Please select up to ${loggedInUser.coins} coins`
      );
      this.setState({ amount: "" });
      return;
    }

    this.setState({ amount: "" });
    this.props.addMove(contact, amount);
    eventBusService.emit("show-msg", `${amount} coins transfered successfully`);
  };

  inputRef = (elInput) => {
    if (elInput) elInput.focus();
  };

  render() {
    const { amount } = this.state;
    const { loggedInUser, contact } = this.props;

    if (!loggedInUser) return <div>Loading...</div>;

    return (
      <section className="transfer-fund">
        <form onSubmit={this.onTransferCoins}>
          <h1>Transfer coins to {contact.name}</h1>
          <h1>Current balance: {loggedInUser.coins}</h1>
          <label htmlFor="amount">Amount:</label>
          <input
            ref={this.inputRef}
            onChange={this.handleChange}
            type="number"
            id="amount"
            name="amount"
            value={amount}
          />
          <button>Transfer coins</button>
        </form>
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
  addMove,
  getLoggedInUser,
};

export const TransferFund = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TransferFund);
