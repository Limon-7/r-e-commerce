import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FormInput, CustomButton } from "../../components";
import * as ROUTES from "../../constants/routes";
import {
  doSignInWithEmailAndPassword,
  signInWithGoogleAuth,
} from "../../utils/Firebase";

import "./SignIn.scss";

const InitialState = {
  email: "",
  password: "",
  error: null,
};
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { ...InitialState };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await doSignInWithEmailAndPassword(email, password);
      this.setState({
        ...InitialState,
      });
      this.props.history.replace(ROUTES.HOME);
    } catch (error) {
      this.setState({ error });
    }
  };
  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = email === "" || password === "";
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            required
            handleChange={this.handleOnChange}
            label="Email"
          />

          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            required
            handleChange={this.handleOnChange}
            password="Password"
            label="Password"
          />
          {error && <p className="error">{error.message}</p>}
          <div className="signIn__link">
            <CustomButton
              type="submit"
              value="Submit form"
              isInvalid={isInvalid}
            >
              Signin
            </CustomButton>
            <CustomButton onClick={signInWithGoogleAuth} isGoogleSignIn>
              Signin With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(SignIn);
