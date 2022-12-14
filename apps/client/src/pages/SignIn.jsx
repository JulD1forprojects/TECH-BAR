import React, { useState } from "react"; // react with state to hold email password
import { Link } from "react-router-dom"; // link to redirect to other page
import { useAppContext } from "../context/UseAppContext"; // getting app context to use login function
import { useNavigate } from "react-router-dom"; // for navigate mothod
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import { toast } from "react-toastify";

const SignIn = () => {
  const { logIn } = useAppContext(); // get login method from app context
  const navigate = useNavigate(); // navigate mrthod to navigate to other page

  const [email, setEmail] = useState(""); // state for user's email
  const [password, setPassword] = useState(""); // state for user's password

  const loginnow = async () => {
    // validation
    if (!isEmail(email)) {
      toast.error("Email address is not valid")
      return
    } else if (!isLength(password, {min:6})) {
      toast.error("Password should have 6 or more alphanumeric characters")
      return
    } else if (!isAlphanumeric(password)) {
      toast.error("Password should contain only letters and numbers")
      return
    }


    // calling login function
    const result = await logIn(email, password);
    console.log(result);
    // if login success goto home page
    if (result.success && result.success === true) {
      navigate("/");
    }
  };

  // rendering our ui
  return (
    <>
      <div className="loginbody">
        <div className="login-page">
          <div className="loginform">
            <h3>Login Now</h3>
            <br />
            <div className="login-form">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={loginnow}>login</button>
            </div>
            <br />
            <p className="message" style={{ marginTop: "11rem" }}>
              Not registered? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
