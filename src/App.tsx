import { BrowserRouter, Routes, Route } from "react-router-dom";
// Public components
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import AllReports from "./pages/AllProjects";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import StaggeredMenu from "./components/StaggeredMenu";

const data = [
  { label: "Our ETS Project", ariaLabel: "Home Page", link: "/" },
  { label: "Site Overview", ariaLabel: "Overview Page", link: "/overview" },
  {
    label: "View All Projects",
    ariaLabel: "All Projects Page",
    link: "/projects",
  },
];

function App() {
  // If user is NOT logged in, show public layout
  return (
    <div style={{ paddingTop: "100px" }}>
      <BrowserRouter>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          <StaggeredMenu
            position="right"
            items={data}
            displaySocials={false}
            displayItemNumbering={false}
            menuButtonColor="#000"
            openMenuButtonColor="#000"
            changeMenuColorOnOpen={true}
            colors={["#4169E1", "#031273"]}
            logoUrl="https://ets.hawaii.gov/wp-content/uploads/2020/08/ETS-Logo-B-w-ETS-process4-border-71x71-1.png"
            accentColor="#4169E1"
          />
        </div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/projects" element={<AllReports />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
