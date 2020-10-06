import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser, setCurrentUser } from "./redux";

import { auth, createUserProfileDocument } from "./utils/Firebase";
import * as ROUTES from "./constants/routes";

import { CheckoutPage, HomePage, ShopPage, SignInSignUpPage } from "./pages";
import { Footer, Header } from "./components";

import "./App.css";
class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = createUserProfileDocument(userAuth);

        (await userRef).onSnapshot((snapshot) => {
          setCurrentUser({
            currenUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      setCurrentUser(userAuth);
      // add collection to firebase
      // addCollectionsAndDocuments(
      //   "collections",
      //   collections.map(({ title, items }) => ({ title, items }))
      // );
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.SHOP} component={ShopPage} />
          <Route path={ROUTES.CHECKOUT} component={CheckoutPage} />
          {/* {this.props.currentUser ? (
            <Route to={ROUTES.HOME} component={HomePage} />
          ) : (
            <Route path={ROUTES.SIGNINSIGNUP} component={SignInSignUpPage} />
          )} */}
          <Route
            path={ROUTES.SIGNINSIGNUP}
            render={() =>
              this.props.currentUser ? (
                <Redirect to={ROUTES.HOME} />
              ) : (
                <SignInSignUpPage />
              )
            }
          />
          <Redirect to="/" component={HomePage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// const mapStateToProps = (state) => {
//   return {
//     currentUser: selectCurrentUser(state),
//   };
// };
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
