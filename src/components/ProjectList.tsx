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
              <div className="row">
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

                <div
                  className={
                    projects.rating === "Low"
                      ? "rating col-sm text-success"
                      : projects.rating === "Medium"
                      ? "rating col-sm text-warning"
                      : projects.rating === "High"
                      ? "rating col-sm text-danger"
                      : "rating col-sm"
                  }
                >
                  {projects.rating}
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
