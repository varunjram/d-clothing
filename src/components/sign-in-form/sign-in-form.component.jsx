import React, {useState} from "react";
import {
  creatUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {email, password} = formFields;

  const resetFormfields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await creatUserDocumentFromAuth(user);
  };

  const handelChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const {email, password} = formFields;

    try {
      const result = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(result);
      resetFormfields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password");
          break;
        case "auth/user-not-found":
          alert("Incorrect email-id");
          break;
        default:
          console.log(error);
          break;
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Alresdy have an account?</h2>
      <span>Sign in with your e mail and password</span>
      <form onSubmit={formSubmitHandler} onChange={handelChange}>
        <FormInput
          lable="Email"
          type="email"
          name="email"
          value={email}
          onChange={handelChange}
          required
          autoComplete="on"
        />

        <FormInput
          lable="Password"
          type="password"
          name="password"
          value={password}
          onChange={handelChange}
          required
          autoComplete="on"
        />

        <div className="buttons-container">
          <Button type="submit">Sign Up</Button>
          <Button type="button" children="" onClick={signInWithGoogle} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
