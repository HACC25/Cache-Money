import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ProjectCard from "../../components/VendorProjectCard";
import { ProjectData } from "../../types/projectTypes";
import { fetchProjectsByVendor } from "../../services/firebaseDataService";

const VendorDashboard = () => {
  const [activeTab] = useState("assigned"); // "assigned" or "reports"
  const [assignedProjects, setAssignedProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  // TODO: Replace with actual vendor ID from auth system
  const currentVendorId = currentUser?.uid || "";
  useEffect(() => {
    const fetchAssignedProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch projects assigned to this vendor from Firebase
        const vendorProjects = await fetchProjectsByVendor(currentVendorId);
        setAssignedProjects(vendorProjects);
      } catch (err) {
        console.error("Error fetching vendor projects:", err);
        setError(
          "Failed to load your assigned projects. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedProjects();
  }, [currentVendorId]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Projects</h4>
          <p>{error}</p>
          <hr />
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h6>STATE OF HAWAII - Office of Enterprise Technology Services</h6>
      <h1 className="mb-4" style={{ fontWeight: "800" }}>
        VENDOR DASHBOARD
      </h1>

      {activeTab === "assigned" && (
        <>
          <h2 className="mb-3" style={{ paddingBottom: "40px" }}>
            Projects assigned to you
          </h2>

          {assignedProjects.length === 0 ? (
            <div style={{ paddingBottom: "80px" }}>
              <div className="alert alert-info">
                No projects have been assigned to your vendor account yet.
              </div>
            </div>
          ) : (
            assignedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </>
      )}

      {activeTab === "reports" && (
        <>
          <h2 className="mb-3">My Reports</h2>
          <div className="alert alert-info">
            This tab will show all reports you've created across all projects.
          </div>
        </>
      )}
    </div>
  );
};

export default VendorDashboard;
