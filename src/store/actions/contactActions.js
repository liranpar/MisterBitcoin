import { contactService } from "../../services/contactService";

export function loadContacts() {
  return async (dispatch, setState) => {
    try {
      const { filterBy } = setState().contactModule;
      const contacts = await contactService.getContacts(filterBy);
      dispatch({ type: "SET_CONTACTS", contacts });
    } catch (err) {
      console.log(err);
    }
  };
}

export function removeContact(contactId) {
  return async (dispatch) => {
    try {
      await contactService.deleteContact(contactId);
      dispatch({ type: "REMOVE_CONTACT", contactId });
    } catch (err) {
      console.log(err);
    }
  };
}

export function saveContact(contact) {
  return async (dispatch) => {
    try {
      const isNew = !contact._id;
      const savedContact = await contactService.saveContact(contact);
      // if (isNew) dispatch({ type: "ADD_CONTACT", contact: savedContact });
      // else dispatch({ type: "UPDATE_CONTACT", contact: savedContact });
    } catch (err) {
      console.log(err);
    }
  };
}

export function setFilterBy(filterBy) {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_FILTER_BY", filterBy });
    } catch (err) {
      console.log(err);
    }
  };
}
