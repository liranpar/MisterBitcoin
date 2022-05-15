import { HashRouter as Router, Route, Switch } from "react-router-dom";

import React, { Component } from "react";
import { connect } from "react-redux";
import "./style/styles.scss";
import { AppHeader } from "./cmps/app-header";
import AppFooter from "./cmps/app-footer";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { SignUp } from "./pages/SignUp";
import StatisticPage from "./pages/StatisticPage";
import { ContactDetails } from "./pages/ContactDetails";
import { ContactEdit } from "./pages/ContactEdit";
import UserMessage from "./cmps/user-msg";

// import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";

export default class App extends Component {
  render() {
    return (
      <Router>
        <UserMessage />
        <div className="main-app-container">
          <AppHeader />
          <section className="main-layout-height">
            <Switch>
              <Route exact component={ContactEdit} path="/contact/edit/:id?" />
              <Route exact component={ContactDetails} path="/contact/:id" />
              <Route exact component={SignUp} path="/signup" />
              <Route exact component={StatisticPage} path="/statistics" />
              <Route exact component={ContactPage} path="/contact" />
              <Route exact component={HomePage} path="/" />
              {/* {this.Page} */}
            </Switch>
          </section>
          <AppFooter />
        </div>
      </Router>
    );
  }
}
