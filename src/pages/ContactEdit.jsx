import React, { Component } from "react";
import { contactService } from "../services/contactService";
import { eventBusService } from "../services/eventBusService";
import { connect } from "react-redux";
import { saveContact } from "../store/actions/contactActions";

class _ContactEdit extends Component {
  state = {
    contact: null,
  };

  async componentDidMount() {
    this.setContact();
  }

  setContact = async () => {
    const id = this.props.match.params.id;
    const contact = id
      ? await contactService.getContactById(id)
      : contactService.getEmptyContact();
    this.setState({ contact });
  };

  handleChange = async ({ target }) => {
    const field = target.name;
    const value = target.type === "number" ? +target.value || "" : target.value;
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }));
  };

  onSaveContact = async (ev) => {
    ev.preventDefault();
    const { contact } = this.state;
    if (!contact.name || !contact.phone || !contact.email) {
      eventBusService.emit("show-msg", "All fields are required");
      return;
    }
    const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (!regex.test(contact.email)) {
      eventBusService.emit("show-msg", "Please provied a valid email address");
      return;
    }
    this.props.saveContact({ ...this.state.contact });
    // await contactService.saveContact({ ...this.state.contact });
    eventBusService.emit("show-msg", "Contact saved successfully");
    this.props.history.push("/contact");
  };

  inputRef = (elInput) => {
    if (elInput) elInput.focus();
  };

  onBack = () => {
    this.props.history.push("/contact");
  };

  render() {
    const { contact } = this.state;
    if (!contact) return <div>Loading...</div>;
    return (
      <section className="contact-edit main-layout">
        <button onClick={this.onBack}>Back</button>
        <h2>{contact._id ? "Edit" : "Add"} contact</h2>
        <form onSubmit={this.onSaveContact}>
          <label htmlFor="name">Name: </label>
          <input
            ref={this.inputRef}
            type="text"
            id="name"
            onChange={this.handleChange}
            value={contact.name}
            name="name"
          />
          <label htmlFor="phone">Phone: </label>
          <input
            type="tel"
            id="phone"
            onChange={this.handleChange}
            value={contact.phone}
            name="phone"
          />
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            onChange={this.handleChange}
            value={contact.email}
            name="email"
          />
          <button>Save contact</button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactModule.contacts,
  };
};

const mapDispatchToProps = {
  saveContact,
};

export const ContactEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactEdit);
