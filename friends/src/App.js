import React, { useState, useEffect } from "react";
import { Route, NavLink, useHistory, Redirect } from "react-router-dom";
import axios from "./axiosWithAuth";
import FriendsList from "./Components/FriendsList";
import "./App.css";

function App() {
  const history = useHistory();
  const [friends, setFriends] = useState([]);
  const [formValues, setFormValues] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    axios()
      .get("http://localhost:5000/api/friends")
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const loginHandler = formValues => {
    axios()
      .post("http://localhost:5000/api/login", formValues)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        history.push("/friends");
      })
      .catch(err => {
        debugger;
      });
  };

  const changeHandler = type => e => {
    const inputValue = e.target.value;
    setFormValues({
      ...formValues,
      [type]: inputValue
    });
  };

  const deleteFriend = id => {
    axios()
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink exact to="/friends">
          Friends
        </NavLink>
      </nav>

      <Route exact path="/">
        <form>
          <label htmlFor="name">name</label>
          <input id="name" onChange={changeHandler("username")} />
          <label htmlFor="password">password</label>
          <input id="password" onChange={changeHandler("password")} />
          <button type="button" onClick={evt => loginHandler(formValues)}>
            Login
          </button>
        </form>
      </Route>

      <PrivateRoute path="/friends">
        <FriendsList friends={friends} deleteFriend={deleteFriend} />
      </PrivateRoute>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  const tokenExists = !!localStorage.getItem("token");
  return (
    <Route {...rest}>{tokenExists ? children : <Redirect to="/" />}</Route>
  );
}

export default App;
