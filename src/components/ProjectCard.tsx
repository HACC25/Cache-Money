import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProjectData } from "./sampleData";

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div
      className="card text-center p-4"
      style={{
        borderRadius: "20px",
        backgroundColor: "#ffffff",
        maxWidth: "500px",
        margin: "20px auto",
      }}
    >
      {/* Project Name */}
      <h2 className="fw-bold mb-3">{project.name.toUpperCase()}</h2>

      {/* Status Badge */}
      <div
        className="mx-auto mb-4 px-4 py-2 text-white fw-semibold"
        style={{
          backgroundColor: project.statusColor,
          borderRadius: "50px",
          display: "inline-block",
        }}
      >
        STATUS: {project.status.toUpperCase()}
      </div>

      {/* Metrics */}
      <div className="d-flex justify-content-around mb-4">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            border: "1px solid #aaa",
            width: "45%",
            height: "100px",
          }}
        >
          <span className="fw-bold">{project.metric1}</span>
        </div>

        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            border: "2px solid #c95604",
            width: "45%",
            height: "100px",
          }}
        >
          <span className="fw-bold">{project.metric2}</span>
        </div>
      </div>

      {/* Description */}
      <div
        className="p-3 bg-white mx-auto"
        style={{
          borderRadius: "20px",
          border: "1px solid #aaa",
          width: "90%",
        }}
      >
        <p className="m-0 fw-medium">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
