import React, { useState, useContext } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import { MyIdContext } from "../context/MyIdContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { set_id } = useContext(MyIdContext);
  // const [data, setData] = useState("");

  const navigate = useNavigate();

  // Should use POST method for secure authentication and authorization
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });

      console.log("login success");

      const { token, _id } = response.data;
      set_id(_id);

      // Store token in local storage
      localStorage.setItem("token", token);

      // Redirect user to the protected route
      navigate("Home");
    } catch (err) {
      console.log("Invalid email or password");
    }
  };

  return (
    <>
      <div className="login-container w-full bg-secondary h-screen flex justify-center items-center">
        <div className="box bg-white shadow-xl login w-[24%] max-[24%]: min-w-[360px]  p-8 rounded-xl flex flex-col gap-6">
          <form
            className="w-full h-fit flex flex-col gap-6 "
            onSubmit={handleSubmit}
          >
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

            <div className="text-center">
              <button
                type="submit"
                className="confirm-btn p-3 py-3 rounded-xl w-full  bg-primary text-white text-[12px] font-bold"
              >
                SIGN IN
              </button>
            </div>

            <div className="account text-center text-black2">
              Don't have an account?{" "}
              <a href="/register" className="sign-in-up text-primary">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
}
