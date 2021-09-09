//TODO: Create a USER_ADDED action
const USER_ADDED = "user/USER_ADDED";
const USER_REMOVED = "user/USER_REMOVED";

/*
TODO: Create a addUser action creator that takes a user object
*/

export const addUser = (userObj) => {
  return {
    type: USER_ADDED,
    user: userObj,
  };
};

export const removeUser = () => {
  return {
    type: USER_REMOVED,
  };
};

export const postUser = (userInfo) => async (dispatch) => {
  console.log("In the post user thunk ", userInfo);
  const { firstName, lastName, email } = userInfo;
  const response = await fetch("http://localhost:5000/users/add", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) throw response;
  const { user } = await response.json();
  dispatch(addUser(user));
};

//Todo: build a case for USER_ADDED
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case USER_ADDED:
      return { ...state, [action.user.id]: action.user };
    case USER_REMOVED:
      return {};
    default:
      return state;
  }
}
