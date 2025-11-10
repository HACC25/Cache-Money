import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { ProjectData } from "../components/SampleData";
import { fetchAllProjects } from "../services/firebaseDataService";

const AllProjects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all projects from Firebase with their reports
        const fetchedProjects = await fetchAllProjects();
        setProjects(fetchedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

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
        CURRENT ETS PROJECTS
      </h1>

      {projects.length === 0 ? (
        <div className="alert alert-info">
          No projects available yet. ETS employees can create new projects.
        </div>
      ) : (
        <div className="row">
          {projects.map((project) => (
            <div
              key={project.id}
              className="col-md-6 mb-4"
              style={{ paddingTop: "10px" }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProjects;
