import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
// Public components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import AllReports from "./pages/AllReports";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/reports" element={<AllReports />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
