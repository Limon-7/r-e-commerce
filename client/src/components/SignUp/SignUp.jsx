import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { CustomButton, FormInput } from "../../components";
import {
  createUserProfileDocument,
  doCreateUserWithEmailAndPassword,
} from "../../utils/Firebase";
import "./SignUp.scss";
const InitialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: null,
};
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...InitialState,
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      return;
    }
    try {
      const { user } = await doCreateUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName });

      this.setState({
        ...InitialState,
      });
      this.props.history.push(ROUTES.HOME);
    } catch (error) {
      this.setState({ error });
      console.log(error.message);
    }
  };
  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { displayName, email, password, confirmPassword, error } = this.state;
    const isInvalid =
      password !== confirmPassword || password === "" || email === "";
    return (
      <div className="sign-up">
        <h2 className="title">I haven't an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            handleChange={this.handleOnChange}
            name="displayName"
            value={displayName}
            label="Display Name"
            required
          />

          <FormInput
            type="email"
            handleChange={this.handleOnChange}
            name="email"
            value={email}
            label="Email"
            required
          />
          <FormInput
            type="password"
            handleChange={this.handleOnChange}
            name="password"
            value={password}
            label="Password"
            required
          />
          <FormInput
            type="password"
            handleChange={this.handleOnChange}
            name="confirmPassword"
            value={confirmPassword}
            label="Confirm Password"
            required
          />
          {error && <p className="error">{error.message}</p>}
          <CustomButton type="submit" isInvalid={isInvalid}>
            SIGNUP
          </CustomButton>
        </form>
      </div>
    );
  }
}
export default withRouter(SignUp);
