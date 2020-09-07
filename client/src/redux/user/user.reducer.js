import { LOGIN, LOGOUT } from "./user.actions";

const reducer = (
  state = {
    isAuthUser: !!localStorage.getItem("user"),
    user: JSON.parse(localStorage.getItem("user")) || {}
  },
  action
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthUser: true,
        user: action.payload
      };
    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, isAuthUser: false, user: {} };
    default:
      return state;
  }
};

export default reducer;
