import { BrowserRouter, Routes, Route } from "react-router-dom";
// Public components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import AllReports from "./pages/AllProjects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  // If user is NOT logged in, show public layout
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/overview" element={<Overview />} />

        <Route path="/projects" element={<AllReports />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
