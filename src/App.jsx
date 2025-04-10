import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const splashShown = localStorage.getItem("splash-shown");

    if (!splashShown) {
      setShowSplash(true);
      setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem("splash-shown", "true");
        setLoading(false);
      }, 2000); 
    } else {
      setLoading(false); 
    }
  }, []);

  if (loading) {
    return showSplash ? (
      <div id="splash-screen">
        <h1>Zola</h1>
      </div>
    ) : null;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
