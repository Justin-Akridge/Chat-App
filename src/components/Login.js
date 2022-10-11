import React, { useState } from "react";
import { useHistory } from "react-route-dom";
import {
  Jumbotron,
  Spinner,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import firebase from "../Firebase";

function Login() {
  const history = useHistory();
  const [creds, setCreds] = useState({ nickname: "" });
  const [showLoading, setShowLoading] = useState(false);
  const ref = firebase.database().red("users/");

  const onChange = (e) => {
    e.persist();
    setCreds({ ...creds, [e.target.name]: e.taget.value });
  };

  const login = (e) => {
    e.preventDefault();
    setShowLoading(true);
    ref
      .orderByChild("nickname")
      .equalTo(creds.nickname)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          localStorage.setItem("nickname", creds.nickname);
          history.push("/roomlist");
          setShowLoading(false);
        } else {
          const newUser = firebase.database().ref("users/").push();
          newUser.set(creds);
          localStorage.setItem("nickname", creds.nickname);
          history.push("/roomlist");
          setShowLoading(false);
        }
      });
  };

  return (
    <div>
      {showLoading && <Spinner color="primary" />}
      <Jumbotron>
        <Form onSubmit={login}>
          <FormGroup>
            <label>Nickname</label>
            <input type="text" name="nickname" id="nickname" placeholder = "Enter your nickname"></input>
          </FormGroup>
          <button variant="primary" type="submit">
            login
          </button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default Login;
