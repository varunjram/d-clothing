import Button from "../../components/button/button.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  signInWithGooglePopup,
  creatUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// import {useEffect} from "react";
// import {getRedirectResult} from "firebase/auth";

export default function SignIn() {
  // useEffect(
  //   () => async () => {
  //     const response = await getRedirectResult(auth);
  //     console.log(response);
  //   },
  //   []
  // );
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    await creatUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>sign-in.component</h1>
      <Button
        type="submit"
        children="Signin with Google"
        onClick={logGoogleUser}
        buttonType="google"
      />

      {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
      <SignUpForm />
    </div>
  );
}
