import React, { useState, useContext } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";
import { MyGlobalContext } from "../context/MyGlobalContext";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { set_id, setname} = useContext(MyGlobalContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register({
        name,
        email,
        password,
        confirmPassword,
      });

      console.log("registration success");

      const { token, userCred } = response.data;
      set_id(userCred._id);
      setname(userCred);

      // Store token in local storage
      sessionStorage.setItem("token", token);

      // Redirect user to the protected route
      navigate("/home");
    } catch (err) {
      console.log("Failed to register user");
    }
  };

  return (
    <>
      <div className="signup-container w-full bg-secondary h-screen flex justify-center items-center">
        <div className="box bg-white shadow-xl signup w-[24%] max-[24%]: min-w-[360px]  p-8 rounded-xl flex flex-col gap-6">
          <form
            className="w-full h-fit flex flex-col gap-6 "
            onSubmit={handleSubmit}
          >
            <div className="intro-box">
              <p className="intro-box__intro-text text-4xl font-bold text-primary text-center mb-4">
                Sign up
              </p>
              <p className="intro-box__intro-message text-black2 whitespace-nowrap text-center">
                Enter your email and password to create an account
              </p>
            </div>
            <div className="input-box flex flex-col gap-2">
              <label htmlFor="Email">Name</label>
              <InputField
                type="text"
                name="name"
                id="exampleFormControlInput2"
                placeholder="Input your name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-box flex flex-col gap-2">
              <label htmlFor="Email">Email</label>
              <InputField
                type="text"
                name="email"
                id="exampleFormControlInput2"
                placeholder="Your email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-box flex flex-col gap-2">
              <label htmlFor="Password">Password</label>
              <InputField
                type="password"
                name="password"
                id="exampleFormControlInput2"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-box flex flex-col gap-2">
              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <InputField
                type="password"
                name="confirmPassword"
                id="exampleFormControlInput2"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="confirm-btn p-3 py-3 rounded-xl w-full  bg-primary text-white text-[12px] font-bold"
              >
                SIGN UP
              </button>
            </div>

            <div className="account text-center text-black2">
              Already have an account?{" "}
              <a href="/login" className="sign-in-up text-primary">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
}
