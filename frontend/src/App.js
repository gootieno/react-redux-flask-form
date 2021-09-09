import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUser, removeUser } from "./store/users";

const App = () => {
  const [form, setForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const dispatch = useDispatch();

  const users = useSelector((state) =>
    state.user ? Object.values(state.user) : null
  );

  const handleChange = (e) => {
    console.log("in the handle change ----> ", e.target.value);
    // console.log('in the handle change ----> ', e.target.name)
    console.log("user info ", userInfo);
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleClearUsers = () => {
    setForm(false);
    dispatch(removeUser());
  };

  const handlePostUser = (e) => {
    e.preventDefault();
    setForm((prev) => !prev);
    dispatch(postUser(userInfo));
    setUserInfo({
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  return (
    <>
      <div className="app-container">
        <button
          className="post-user-button"
          onClick={() => setForm((prev) => !prev)}
        >
          TOGGLE POST FORM
        </button>
        <button className="clear-user-button" onClick={handleClearUsers}>
          CLEAR USERS
        </button>
      </div>
      {form && (
        <form className="form-container">
          <input
            id="firstName"
            name="firstName"
            placeholder="enter first name"
            type="text"
            onChange={handleChange}
            value={userInfo.firstName}
          />
          <input
            id="lastName"
            name="lastName"
            placeholder="enter last name"
            type="text"
            onChange={handleChange}
            value={userInfo.lastName}
          />
          <input
            id="email"
            name="email"
            placeholder="enter email"
            type="email"
            onChange={handleChange}
            value={userInfo.email}
          />
          <button onClick={handlePostUser}>SEND IT</button>
        </form>
      )}

      {users ? (
        <>
          {users.map((user) => (
            <h1 key={user.id} className="user-message">
              {form ? "" : user.message || user.title}
            </h1>
          ))}
        </>
      ) : (
        <h1 className="user-message"> {form ? "" : "No User Yet"}</h1>
      )}
    </>
  );
};

export default App;
