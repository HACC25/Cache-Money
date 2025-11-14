import "./Carousel.css";
import "./ProjectCard";

interface RecentProject {
  id: string;
  name: string;
  status: "On Track" | "At Risk" | "Critical" | "Active" | "Completed";
  metric1: string;
  metric2: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
}

interface Props {
  allProjects: RecentProject[];
}

const Carousel = ({ allProjects }: Props) => {
  return (
    <>
      <div
        id="projectCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* Bootstrap Indicators */}
        <div className="carousel-indicators">
          {allProjects.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#projectCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Carousel Inner */}
        <div className="carousel-inner">
          {allProjects.map((project, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="project-carousel-item">
                <div className="container">
                  {/* Title and Status */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h2 className="display-6 mb-2">{project.name}</h2>
                      {project.status}
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <div className="metric-card primary">
                        <h6 className="text-muted mb-1">COMPLETION</h6>
                        <h3 className="mb-0">
                          {project.metric1.split(": ")[1]}
                        </h3>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="metric-card info">
                        <h6 className="text-muted mb-1">REPORTS</h6>
                        <h3 className="mb-0">
                          {project.metric2.split(": ")[1]}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <p className="lead">{project.description}</p>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-body">
                          <h6 className="card-subtitle mb-3 text-muted">
                            Timeline
                          </h6>
                          <div className="info-row">
                            <span className="fw-semibold">Start Date:</span>
                            <span>{project.startDate}</span>
                          </div>
                          <div className="info-row">
                            <span className="fw-semibold">End Date:</span>
                            <span>{project.endDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-body">
                          <h6 className="card-subtitle mb-3 text-muted">
                            Budget
                          </h6>
                          <div className="info-row">
                            <span className="fw-semibold">Total Budget:</span>
                            <span>${project.budget}</span>
                          </div>
                          <div className="info-row">
                            <span className="fw-semibold">Amount Spent:</span>
                            <span>${project.spent}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bootstrap Controls - Pure Default */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#projectCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#projectCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
