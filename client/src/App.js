import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContextProvider } from "./context/MyIdContext";
import Test from "./pages/Test.jsx"

// Define lazy-loaded components
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {" "}
                <Login />{" "}
              </Suspense>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {" "}
                <Register />{" "}
              </Suspense>
            }
          />
          <Route
            exact
            path="/home"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {" "}
                <Home />{" "}
              </Suspense>
            }
          />
          <Route
            exact
            path="/Test"
            element={<Test />}
          />
        </Routes>
      </Router>
    </MyContextProvider>
  );
}

export default App;
