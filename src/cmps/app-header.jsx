import { NavLink } from "react-router-dom";
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

function _AppHeader() {
  return (
    <section className="app-header ">
      <div className="header-container main-layout">
        <section className="logo">
          <h1> Mister-BITCoin</h1>
        </section>
        <nav>
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/contact">Contacts</NavLink>
          <NavLink to="/statistics">Statistics</NavLink>
        </nav>
      </div>
    </section>
  );
}

// export const AppHeader = withRouter(_AppHeader);

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
};

export const AppHeader = connect(mapStateToProps)(withRouter(_AppHeader));
