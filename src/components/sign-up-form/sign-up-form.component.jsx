import React, {useState} from "react";
import {
  createAuthUserWithEmailAndPassword,
  creatUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword} = formFields;

  // console.log(formFields);
  const resetFormfields = () => setFormFields(defaultFormFields);

  const handelChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value});
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const {email, password, confirmPassword} = formFields;
    if (password !== confirmPassword) {
      alert("Password and confirm password doesnot match");
      return;
    }
    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      await creatUserDocumentFromAuth(user, {displayName});
      resetFormfields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log(alert("email already exists"));
      }
      console.log("user not created", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={formSubmitHandler} onChange={handelChange}>
        <FormInput
          lable="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handelChange}
          required
          autoComplete="on"
        />

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

        <FormInput
          lable="Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handelChange}
          required
          autoComplete="on"
        />

        <Button type="submit" children="Sign Up" />
      </form>
    </div>
  );
}
