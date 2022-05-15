import { useState, useEffect } from "react";
import { contactService } from "../services/contactService";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getLoggedInUser } from "../store/actions/userActions";
import { TransferFund } from "../cmps/TransferFund";
import { MovesList } from "../cmps/MovesList";

const _ContactDetails = (props) => {
  const [contact, setcontact] = useState(null);

  useEffect(() => {
    loadContact();
    // eslint-disable-next-line
  }, []);

  const loadContact = async () => {
    const contact = await contactService.getContactById(props.match.params.id);
    setcontact(contact);
  };

  const onBack = () => {
    props.history.push("/contact");
  };

  if (!contact) return <div>Loading...</div>;

  return (
    <section className=" main-layout contact-details">
      <section>
        <button onClick={onBack}>Back</button>
        <Link className="link" to={`/contact/edit/${contact._id}`}>
          Edit
        </Link>
        <h1 className="title">Contact Details</h1>
        <img src={`https://robohash.org/${contact._id}`} alt="" />
        <h1>Name: {contact.name}</h1>
        <h1>Email: {contact.email}</h1>
        <h1>Phone: {contact.phone}</h1>
      </section>
      <section className="transactions-container">
        <TransferFund contact={contact} />
        <MovesList contact={contact} getLoggedInUser={getLoggedInUser} />
      </section>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  getLoggedInUser,
};

export const ContactDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactDetails);
