import { useState } from "react";

interface ProjectData {
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

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" mt-3">
      <style>{`
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
        }
        
        .accordion-content.open {
          max-height: 2000px;
          padding: 1rem;
        }
        
        .accordion-header {
          transition: background-color 0.2s ease;
        }
        
        .accordion-header:hover {
          background-color: #e9ecef !important;
        }
        
        .progress-wrapper {
          position: relative;
          height: 25px;
        }
        
        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: #000;
          font-weight: 600;
          font-size: 14px;
          z-index: 10;
          text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
        }
      `}</style>

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
                    transition: "transform 0.3s ease",
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
                        <div className="col-md-8">
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
