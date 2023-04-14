import React from "react";
import InputField from "../components/InputField";

export default function Register() {
  return (
    <>
      <div className="register-container w-full bg-secondary h-screen flex justify-center items-center">
      <div className="box bg-white shadow-xl register w-[24%] max-[24%]: min-w-[360px]  p-8 rounded-xl flex flex-col gap-4">
          <div className="intro-box">
            <p className="intro-box__intro-text text-4xl font-bold text-primary text-center mb-4">
              Register
            </p>
            <p className="intro-box__intro-message text-black2 text-center px-6">
              Enter your name, email and password to sign up
            </p>
          </div>
          <div className="input-box flex flex-col gap-2">
            <label htmlFor="Name">Name</label>
            <InputField
              type="text"
              name="Name"
              id="exampleFormControlInput2"
              placeholder="Your name"
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
              required
            />
          </div>
          <div className="input-box flex flex-col gap-2">
            <label htmlFor="Password">Confirm Password</label>
            <InputField
              type="password"
              name="password"
              id="exampleFormControlInput2"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="text-center">
            <button className="confirm-btn p-2 py-3 rounded-xl w-full  bg-primary text-white text-[12px] font-bold">
              SIGN UP
            </button>
          </div>

          <div className="account text-center text-black2">
            Already have an account?{" "}
            <a href="/" className="sign-in-up text-primary">
              Sign in
            </a>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
