import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../services/firebase-config";
import "./AllProjectsTable.css";

interface ProjectData {
  id: string;
  name: string;
  calculated_risk: string;
  schedule: number;
  total_reports: number;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
}

interface Vendor {
  vendor_name: string;
  vendor_projects: ProjectData[];
}

interface Props {
  vendors: Vendor[];
}

const AllProjectsTable = ({ vendors }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleView = (project: ProjectData) => {
    navigate(`/project/${project.id}`);
  };

  const handleEdit = (project: ProjectData) => {
    navigate(`/project/${project.id}}/edit`);
  };

  const handleDelete = async (project: ProjectData) => {
    if (!project.id) return;
    if (
      !window.confirm(
        "Are you sure you want to delete this project? This will also delete all associated reports."
      )
    )
      return;

    try {
      const docRef = doc(db, "projects", project.id);
      await deleteDoc(docRef);
      alert("Project deleted successfully");
      navigate("/projects");
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Error deleting project");
    }
  };

  return (
    <div className="mt-3">
      {vendors.map((vendor, index) => {
        const isOpen = openIndex === index;

        return (
          <div className="border rounded mb-2" key={index}>
            <div
              className="accordion-header p-3 bg-light"
              style={{ cursor: "pointer" }}
              onClick={() => toggleAccordion(index)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{vendor.vendor_name}</h5>
                <span
                  style={{
                    transition: "transform 0.4s ease",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}
                >
                  ▼
                </span>
              </div>
            </div>

            <div className={`accordion-content ${isOpen ? "open" : ""}`}>
              {vendor.vendor_projects && vendor.vendor_projects.length > 0 ? (
                vendor.vendor_projects.map((project, projectIndex) => (
                  <div className="card mb-3" key={projectIndex}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <h5 className="card-title">{project.name}</h5>
                          <p className="mb-1">
                            <strong>Start Date:</strong> {project.startDate}
                          </p>
                          <p className="mb-1">
                            <strong>End Date:</strong> {project.endDate}
                          </p>
                          <p className="mb-1">
                            <strong>Overall Risk:</strong>{" "}
                            <span
                              className={`badge ${
                                project.calculated_risk === "Low"
                                  ? "bg-success"
                                  : project.calculated_risk === "High"
                                  ? "bg-danger"
                                  : "bg-warning"
                              }`}
                            >
                              {project.calculated_risk}
                            </span>
                          </p>
                          <p className="mb-1">
                            <strong>Total Reports:</strong>{" "}
                            {project.total_reports}
                          </p>
                        </div>
                        <div className="col-md-8 position-relative">
                          {/* Three-dot menu */}
                          <div
                            className="dropdown position-absolute"
                            style={{ top: "-13px", right: "5px" }}
                          >
                            <button
                              className="btn btn-link text-dark p-0 text-decoration-none"
                              type="button"
                              id={`dropdownMenu${index}-${projectIndex}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{
                                fontSize: "1.5rem",
                                lineHeight: 1,
                              }}
                            >
                              ⋮
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby={`dropdownMenu${index}-${projectIndex}`}
                            >
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleView(project)}
                                >
                                  View
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleEdit(project)}
                                >
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => handleDelete(project)}
                                >
                                  Remove
                                </button>
                              </li>
                            </ul>
                          </div>

                          <p className="mb-2">
                            <strong>Schedule Status</strong>
                          </p>
                          <div className="progress-wrapper mb-3">
                            <div
                              className="progress"
                              style={{ height: "25px" }}
                            >
                              <div
                                className="progress-bar bg-info"
                                style={{ width: project.schedule + "%" }}
                              ></div>
                            </div>
                            <div className="progress-text">
                              {project.schedule}%
                            </div>
                          </div>

                          <p className="mb-2">
                            <strong>Total Funds:</strong> $
                            {project.budget.toLocaleString()}
                          </p>
                          <div className="progress-wrapper">
                            <div
                              className="progress"
                              style={{ height: "25px" }}
                            >
                              <div
                                className="progress-bar bg-info"
                                style={{
                                  width:
                                    (
                                      (project.spent / project.budget) *
                                      100
                                    ).toFixed(1) + "%",
                                }}
                              ></div>
                            </div>
                            <div className="progress-text">
                              Spent: ${project.spent.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-12">
                          <p className="mb-0 text-muted">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="alert alert-info mb-0">
                  No projects found for this vendor.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllProjectsTable;
