export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const loginUser = user => {
  return {
    type: LOGIN,
    payload: user
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT
  };
};
