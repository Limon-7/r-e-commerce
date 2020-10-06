import React from "react";
import { SignIn, SignUp } from "../../components";

import "./SignInSignUpPage.scss";
export function SignInSignUpPage() {
  return (
    <div className="signInSignUpPage">
      <SignIn />
      <SignUp />
    </div>
  );
}
