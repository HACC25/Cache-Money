import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import "./ProjectList.css";

interface Project {
  name: string;
  rating: string;
  link?: string;
}

interface Props {
  type?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  projects: Project[];
}

const ProjectList = ({ type, projects }: Props) => {
  return (
    <div className="container text-center">
      <div className="row">
        <ul className="list-group overflow-auto list-design">
          {projects.map((projects) => (
            <li
              className={
                "text-dark list-group-item grid-design list-group-item-" + type
              }
            >
              <div className="row p-1 p-md-2 p-lg-3">
                {projects.link ? (
                  <Link
                    to={projects.link}
                    className="text-decoration-none name col-md-auto"
                  >
                    <div>{projects.name}</div>
                  </Link>
                ) : (
                  <div className="name col-md-auto">{projects.name}</div>
                )}

                <div className="rating col-sm">
                  Criticality Rating:{" "}
                  <span
                    className={
                      projects.rating === "Low"
                        ? "text-success"
                        : projects.rating === "Medium"
                        ? "text-warning"
                        : projects.rating === "High"
                        ? "text-danger"
                        : "text-primary"
                    }
                  >
                    {projects.rating}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;
