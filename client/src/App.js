import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Define lazy-loaded components
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Suspense fallback={<div>Loading...</div>}> <Home /> </Suspense>}/>
      </Routes>
    </Router>
  )
}

export default App
