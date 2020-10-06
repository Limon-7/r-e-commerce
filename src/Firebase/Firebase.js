const config = {
  apiKey: "AIzaSyCdenfk1_hI2lW5q3Bg0AyK9S_w0B_KLcY",
  authDomain: "r-o-shop-f4e58.firebaseapp.com",
  databaseURL: "https://r-o-shop-f4e58.firebaseio.com",
  projectId: "r-o-shop-f4e58",
  storageBucket: "r-o-shop-f4e58.appspot.com",
  messagingSenderId: "578876294641",
  appId: "1:578876294641:web:1eff196390410dd6b3f050",
};
export class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
}
