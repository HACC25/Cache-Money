import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
// Public components
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import AllReports from "./pages/AllProjects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import StaggeredMenu from "./components/StaggeredMenu";

function AppContent() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      alert('Successfully logged out!');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    }
  };

  // Menu items based on authentication status
  const getMenuItems = () => {
    if (currentUser) {
      // User is logged in - show logout option
      return [
        { label: "Our ETS Project", ariaLabel: "Home Page", link: "/" },
        { label: "Site Overview", ariaLabel: "Overview Page", link: "/overview" },
        { label: "View All Projects", ariaLabel: "All Projects Page", link: "/projects" },
        { 
          label: "Log Out", 
          ariaLabel: "Log Out", 
          link: "#",
          onClick: handleLogout
        },
      ];
    } else {
      // User is not logged in - show login option
      return [
        { label: "Log In", ariaLabel: "Login Page", link: "/login" },
        { label: "Our ETS Project", ariaLabel: "Home Page", link: "/" },
        { label: "Site Overview", ariaLabel: "Overview Page", link: "/overview" },
        { label: "View All Projects", ariaLabel: "All Projects Page", link: "/projects" },
      ];
    }
  };

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
          <Route path="/login" element={<SignIn />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/projects" element={<AllReports />} />
          <Route path="/project/:projectId" element={<ProjectDetailPage />} />
          <Route
            path="/project/:projectId/report/:reportId"
            element={<ReportDetailPage />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
