import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ProjectCard from "../components/VendorProjectCard";
import { sampleProjects, ProjectData } from "../components/SampleData";

const VendorDashboard = () => {
  const [activeTab] = useState("assigned"); // "assigned" or "reports"
  const [assignedProjects, setAssignedProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    /*currentUser */
  } = useAuth();

  // Mock the current vendor ID - in a real app, this would come from auth system
  const currentVendorId = "vendor1";

  useEffect(() => {
    // Simulate fetching data from backend
    const fetchAssignedProjects = () => {
      // Filter projects assigned to the current vendor
      const filteredProjects = sampleProjects.filter(
        (project) => project.vendorId === currentVendorId
      );

      setAssignedProjects(filteredProjects);
      setLoading(false);
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

  return (
    <div className="container mt-5">
      <h6>STATE OF HAWAII - Office of Enterprise Technology Services</h6>
      <h1 className="mb-4" style={{ fontWeight: "800" }}>
        VENDOR DASHBOARD
      </h1>

      {activeTab === "assigned" && (
        <>
          <h2 className="mb-3">Projects assigned to you</h2>

          {assignedProjects.length === 0 ? (
            <div className="alert alert-info">
              No projects have been assigned to your vendor account yet.
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
