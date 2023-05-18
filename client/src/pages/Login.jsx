import React, { useState, useContext } from "react";
import InputField from "../components/InputField";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import { MyGlobalContext } from "../context/MyGlobalContext";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const { set_id, setName, setMyEmail } = useContext(MyGlobalContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });

      if (response.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });

        const { userCred } = response.data;
        set_id(userCred._id);
        setName(userCred.name);
        setMyEmail(userCred.email);

        // Redirect user to Home
        navigate("Home");
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Invalid email or password",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Please try again later.",
        });
      }
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
