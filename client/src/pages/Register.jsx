import React, { useState, useContext } from "react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";
import { MyGlobalContext } from "../context/MyGlobalContext";
import Swal from "sweetalert2";
import { login } from "../api/api";

export default function Signup() {
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { set_id, setName, setMyEmail } = useContext(MyGlobalContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password does not match!",
      });
      return;
    }

    try {
      const response = await register({
        name: newName,
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
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
          title: "Account Successfully",
        });

        const { userCred } = response.data;
        set_id(userCred._id);
        setName(userCred.name);
        setNewName(userCred.name);
        setEmail(userCred.email);
        setMyEmail(userCred.email);

        //login
        const res = await login({
          email,
          password,
        });

        if (res.status === 200) {
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

          // Redirect user to Home
          navigate("/home");
        }
      }
    } catch (error) {
      // error.response is undefined when the request never reached the server
      // (offline, server down), so it must be read defensively.
      const status = error?.response?.status;

      if (status === 400) {
        Swal.fire({
          icon: "error",
          title: "Email is not valid!",
        });
      } else if (status === 500) {
        Swal.fire({
          icon: "error",
          text: "Please use a different email",
          title: "Email is already registered!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Unable to sign up",
          text: "Something went wrong. Please check your connection and try again.",
        });
      }
    }
  };

  return (
    <>
      <div className="signup-container w-full bg-secondary h-screen flex justify-center items-center dark:bg-gray-800">
        <div className="box bg-white shadow-xl signup w-[24%] min-w-[360px]  p-8 rounded-xl flex flex-col gap-6 dark:bg-gray-700 dark:text-white">
          <form
            className="w-full h-fit flex flex-col gap-6 "
            onSubmit={handleSubmit}
          >
            <div className="intro-box">
              <p className="intro-box__intro-text text-4xl font-bold text-primary text-center mb-4">
                Sign up
              </p>
              <p className="intro-box__intro-message text-black2 whitespace-nowrap text-center dark:text-white/70">
                Enter your email and password to create an account
              </p>
            </div>
            <div className="input-box flex flex-col gap-2">
              <label htmlFor="name" className="dark:text-white">
                Name
              </label>
              <InputField
                type="text"
                name="name"
                id="name"
                placeholder="Input your name"
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>

            <div className="input-box flex flex-col gap-2">
              <label htmlFor="email" className="dark:text-white">
                Email
              </label>
              <InputField
                type="text"
                name="email"
                id="email"
                placeholder="Your email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-box flex flex-col gap-2">
              <label htmlFor="password" className="dark:text-white">
                Password
              </label>
              <InputField
                type="password"
                name="password"
                id="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="input-box flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="dark:text-white">
                Confirm Password
              </label>
              <InputField
                type="password"
                name="confirmPassword"
                id="confirmPassword"
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

            <div className="account text-center text-black2 dark:text-white/70">
              Already have an account?{" "}
              <a href="/" className="sign-in-up text-primary">
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
}
