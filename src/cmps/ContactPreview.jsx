import { Link } from "react-router-dom";

export function ContactPreview({ contact, onRemoveContact }) {
  //   const imageStyle = {
  //     backgroundImage: `url(https://robohash.org/${contact._id})`,
  //   };

  const contactImage = `https://robohash.org/${contact._id}`;

  return (
    <section className="contact-preview">
      <Link className="info" to={`/contact/${contact._id}`}>
        <img src={contactImage} alt="" />
        <h1>{contact.name}</h1>
      </Link>
      <section className="actions">
        <button onClick={() => onRemoveContact(contact._id)}>Delete</button>
        <Link className="link" to={`/contact/edit/${contact._id}`}>
          Edit
        </Link>
      </section>
    </section>
  );
}
