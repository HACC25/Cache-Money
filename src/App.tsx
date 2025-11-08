import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useAuth, AuthProvider } from "./contexts/AuthContext";
// Public components
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Overview from "./pages/Overview";
import AllReports from "./pages/AllProjects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import RequireRole from "./components/RequireRole";
import NewProject from "./pages/NewProject";
import EditProject from "./pages/EditProject";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import StaggeredMenu from "./components/StaggeredMenu";

// Vendor components
import VendorDashboard from "./pages/vendor/VendorDashboard";
// Add : import CreateReport from "./pages/vendor/VendorDashboard";

// ETS components
import ETSDashboard from "./pages/ets/ETSDashboard";
import ETSStatistics from "./pages/ets/ETSStatistics";

function AppContent() {
  const { currentUser, signOut, userRole, isETSEmployee } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      alert("Successfully logged out!");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    }
  };

  const menuItems = currentUser
    ? [
        {
          label: "Site Overview",
          ariaLabel: "Overview Page",
          link: "/overview",
        },
        {
          label: "View All Projects",
          ariaLabel: "All Projects Page",
          link: "/projects",
        },
        ...(isETSEmployee
          ? [
              {
                label: "ETS Dashboard",
                ariaLabel: "ETS Dashboard",
                link: "/ets/dashboard",
              },
              {
                label: "Create New Project",
                ariaLabel: "Create Project",
                link: "/projects/new",
              },
            ]
          : []),
        ...(userRole === "vendor"
          ? [
              {
                label: "Vendor Dashboard",
                ariaLabel: "Vendor Dashboard",
                link: "/vendor/dashboard",
              },
              {
                label: "Create Report",
                ariaLabel: "Vendor Report",
                link: "/vendor/create-report",
              },
            ]
          : []),
      ]
    : [
        {
          label: "Site Overview",
          ariaLabel: "Overview Page",
          link: "/overview",
        },
        {
          label: "View All Projects",
          ariaLabel: "All Projects Page",
          link: "/projects",
        },
      ];

  return (
    <div className="app-root">
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
          items={menuItems}
          authAction={handleLogout}
          currentUser={currentUser}
          userRole={userRole}
          isETSEmployee={isETSEmployee}
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

        <Route
          path="/projects/new"
          element={
            <RequireRole allowedRoles={["ets"]}>
              <NewProject />
            </RequireRole>
          }
        />
        <Route
          path="/project/:projectId/edit"
          element={
            <RequireRole allowedRoles={["ets"]}>
              <EditProject />
            </RequireRole>
          }
        />
        {/* Vendor Dashboard */}
        <Route
          path="/vendor/dashboard"
          element={
            <RequireRole allowedRoles={["vendor"]}>
              <VendorDashboard />
            </RequireRole>
          }
        />
        {/* ETS Dashboard */}
        <Route
          path="/ets/dashboard"
          element={
            <RequireRole allowedRoles={["ets"]}>
              <ETSDashboard />
            </RequireRole>
          }
        />
        {/* ETS Statistics*/}
        <Route
          path="/ets/statistics"
          element={
            <RequireRole allowedRoles={["ets"]}>
              <ETSStatistics />
            </RequireRole>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
