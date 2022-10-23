import React from "react";
import {signInWithGooglePopup, creatUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

export default function SignIn() {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await creatUserDocumentFromAuth(user);
  };
  return (
    <div>
      <h1>sign-in.component</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  );
}
