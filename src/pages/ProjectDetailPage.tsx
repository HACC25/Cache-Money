import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectDetail from "../components/ProjectDetail";
import { sampleProjects, ProjectData } from "../components/SampleData";

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Looking for project with ID:", projectId);
    console.log(
      "Available projects:",
      sampleProjects.map((p) => p.id)
    );

    // Find the project by ID
    const foundProject = sampleProjects.find((p) => p.id === projectId);

    if (foundProject) {
      console.log("Found project:", foundProject.name);
      setProject(foundProject);
    } else {
      console.error("Project not found");
    }

    setIsLoading(false);
  }, [projectId]);

  if (isLoading) {
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

  if (!project) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Project not found. Please check the URL or return to the projects
          page.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h6>STATE OF HAWAII - Office of Enterprise Technology Services</h6>
      <h1 className="mb-4" style={{ fontWeight: "800" }}>
        {project.name}
      </h1>

      {/* Project info card */}
      <div className="card mb-4">{/* Project details */}</div>

      <h2 className="mt-5 mb-4">IV&V Monthly Reports</h2>

      {project.reports && project.reports.length > 0 ? (
        <div>
          {/* Sort reports by date (most recent first) */}
          {[...project.reports]
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((report, index) => (
              <div key={report.id} className="mb-4">
                <ProjectDetail
                  report={report}
                  project={project}
                  index={index + 1}
                />
              </div>
            ))}
        </div>
      ) : (
        <div className="alert alert-info">
          No reports available for this project yet.
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
