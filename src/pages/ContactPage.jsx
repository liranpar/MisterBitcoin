import { useEffect } from "react";
import { eventBusService } from "../services/eventBusService";
import { ContactFilter } from "../cmps/ContactFilter";
import { ContactList } from "../cmps/ContactList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadContacts,
  removeContact,
  setFilterBy,
} from "../store/actions/contactActions";
import { getLoggedInUser } from "../store/actions/userActions";

const _ContactPage = (props) => {
  // async componentDidMount() {
  //   console.log(props);
  //   props.loadContacts();
  // }

  useEffect(() => {
    props.getLoggedInUser();

    if (!props.loggedInUser) props.history.push("/SignUp");

    props.loadContacts();
  }, []);

  // loadContacts = async () => {
  //   const contacts = await contactService.getContacts(state.filterBy);
  //   setState({ contacts });
  // };

  const onChangeFilter = async (filterBy) => {
    await props.setFilterBy(filterBy);
    props.loadContacts();
  };

  const onRemoveContact = async (contactId) => {
    try {
      await props.removeContact(contactId);
      eventBusService.emit("show-msg", "Contact deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const { contacts } = props;

  if (!contacts) return <div>Loading...</div>;

  return (
    <section className="main-layout">
      <>
        <Link className="link" to="/">
          Home page
        </Link>
        <Link className="link" to="/contact/edit">
          Add contact
        </Link>
        <ContactFilter onChangeFilter={onChangeFilter} />
        <ContactList contacts={contacts} onRemoveContact={onRemoveContact} />
      </>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contactModule.contacts,
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  loadContacts,
  removeContact,
  setFilterBy,
  getLoggedInUser,
};

export const ContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactPage);
