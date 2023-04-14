import React from "react";
import InputField from "../components/InputField";

export default function Login() {
  return (
    <>
      <div className="login-container w-full bg-secondary h-screen flex justify-center items-center">
        <div className="box bg-white shadow-xl login w-[24%] max-[24%]: min-w-[360px]  p-8 rounded-xl flex flex-col gap-6">
          <div className="intro-box">
            <p className="intro-box__intro-text text-4xl font-bold text-primary text-center mb-4">
              Login
            </p>
            <p className="intro-box__intro-message text-black2 whitespace-nowrap text-center">
              Enter your email and password to sign in
            </p>
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

          <div className="text-center">
            <button className="confirm-btn p-2 py-3 rounded-md w-full  bg-primary text-white text-[12px] font-bold">
              SIGN IN
            </button>
          </div>

          <div className="account text-center text-black2">
            Don't have an account?{" "}
            <a href="/register" className="sign-in-up text-primary">
              Sign up
            </a>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
