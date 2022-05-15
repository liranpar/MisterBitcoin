import { userService } from "../../services/userService";

export function addMove(contact, amount) {
  return async (dispatch) => {
    try {
      const user = userService.getLoggedInUser();
      user.coins -= amount;
      user.moves.unshift({
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount,
      });
      const loggedInUser = await userService.saveUser(user);
      userService.logIn(user);
      dispatch({ type: "LOAD_LOGGED_IN_USER", loggedInUser });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getLoggedInUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getLoggedInUser();
      dispatch({ type: "LOAD_LOGGED_IN_USER", loggedInUser: user });
    } catch (err) {
      console.log(err);
    }
  };
}

export function logIn(user) {
  return async (dispatch) => {
    try {
      const loggedInUser = await userService.logIn(user);
      dispatch({ type: "LOAD_LOGGED_IN_USER", loggedInUser });
    } catch (err) {
      console.log(err);
    }
  };
}
