import React, { Component } from "react";

export class ContactFilter extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
  };

  handleChange = ({ target }) => {
    // const value = target.type === "number" ? +target.value || "" : target.value;
    const field = target.name;
    const value = target.value;
    this.setState({ [field]: value }, () => {
      this.props.onChangeFilter(this.state);
    });
  };

  render() {
    const { name, phone, email } = this.state;

    return (
      <section className="contact-filter">
        <section>
          <label htmlFor="name">Name</label>
          <input
            onChange={this.handleChange}
            type="text"
            id="name"
            name="name"
            value={name}
          />
        </section>
        <section>
          <label htmlFor="phone">Phone</label>
          <input
            onChange={this.handleChange}
            type="number"
            id="phone"
            name="phone"
            value={phone}
          />
        </section>
        <section>
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleChange}
            type="text"
            id="email"
            name="email"
            value={email}
          />
        </section>
      </section>
    );
  }
}
