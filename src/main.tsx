import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import App from "./App";
import AllReports from "./pages/AllReports";
import Footer from "./components/Footer";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/reports" element={<AllReports />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
