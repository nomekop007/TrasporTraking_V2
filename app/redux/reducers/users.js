const initialState = {
  uid: "clave",
  name: "nombre",
  email: "email",
};

export default (state = initialState, action) => {
  console.log(state);

  return state;
};
