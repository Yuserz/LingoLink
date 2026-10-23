import React, { lazy, Suspense, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MyContextProvider, MyGlobalContext } from "./context/MyGlobalContext";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// /home is only meaningful with a signed-in user; everything else bounces to
// the login screen. Redirecting here also keeps the Home chunk (and its
// socket/API calls) from loading at all without a session.
function RequireAuth({ children }) {
  const { _id } = useContext(MyGlobalContext);
  return _id ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <MyContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Suspense fallback={<div>Loading...</div>}>
                  <Home />
                </Suspense>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </MyContextProvider>
  );
}

export default App;
