const INITIAL_STATE = {
  loggedInUser: null,
  users: null,
};

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOAD_LOGGED_IN_USER":
      return {
        ...state,
        loggedInUser: action.loggedInUser,
      };
    // case "MOVE_COINS":
    //   return {
    //     ...state,
    //     loggedInUser: {
    //       ...state.loggedInUser,
    //       balance: state.loggedInUser.balance - action.amount,
    //     },
    //   };
    // case "GET_COINS":
    //   return {
    //     ...state,
    //     loggedInUser: {
    //       ...state.loggedInUser,
    //       balance: state.loggedInUser.balance + action.amount,
    //     },
    //   };

    default:
      return state;
  }
}
