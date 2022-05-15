import React, { Component } from "react";
import { connect } from "react-redux";
import { getLoggedInUser } from "../store/actions/userActions";

class _MovesList extends Component {
  render() {
    const { loggedInUser, contact } = this.props;

    const dateForDisplay = (actTime) => {
      const now = new Date();
      const date = new Date(actTime);
      const dayOfWeek = now.getDay();
      const dayOfAct = date.getDay();
      const timePassed = now - date;
      const hours = date.getHours();
      const minutes = date.getMinutes();

      if (timePassed < 1000 * 60)
        return `${(timePassed / 1000).toFixed(0)} seconds ago `;
      if (timePassed < 1000 * 60 * 60)
        return `${(timePassed / (1000 * 60)).toFixed(0)} minutes ago `;

      if (timePassed < 1000 * 60 * 60 * 24 && dayOfWeek === dayOfAct)
        return `Today, ${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        } `;

      if (
        timePassed < 1000 * 60 * 60 * 24 * 2 &&
        (Math.abs(dayOfWeek - dayOfAct) === 1 ||
          Math.abs(dayOfWeek - dayOfAct) === 6)
      )
        return `Yesterday, ${hours < 10 ? "0" + hours : hours}:${
          minutes < 10 ? "0" + minutes : minutes
        } `;

      return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${
        date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
      },  ${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      } `;
    };

    const moveToDisplay = !contact
      ? loggedInUser.moves
      : loggedInUser.moves
          .filter((move) => move.toId === contact._id)
          .splice(0, 3);

    const toClass = !contact ? "" : "hidden";

    return (
      <section className="move-list">
        <h1>transactions</h1>
        <ul>
          {!moveToDisplay.length ? (
            <div>No transactions yet</div>
          ) : (
            moveToDisplay.map((move) => {
              return (
                <li key={move.at}>
                  <span>{dateForDisplay(move.at)}, </span>
                  <span className={toClass}>To: {move.to}, </span>
                  <span> Amount: {move.amount} coins</span>
                </li>
              );
            })
          )}
        </ul>
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

export const MovesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MovesList);
