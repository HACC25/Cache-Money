import { Link } from "react-router-dom";
import "./ProjectList.css";

interface Project {
  id: string;
  name: string;
  status: string;
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
          {projects.map((project) => (
            <li
              className={
                "text-dark list-group-item grid-design list-group-item-" + type
              }
            >
              <div className="row p-1 p-md-2 p-lg-3 align-items-center">
                <Link
                  to={`/project/${project.id}`}
                  className="text-decoration-none name col-8"
                >
                  <div>{project.name}</div>
                </Link>
                <div className="rating col-4">
                  Criticality Rating:{" "}
                  <span
                    className={
                      project.status === "On Track"
                        ? "text-success"
                        : project.status === "At Risk"
                        ? "text-warning"
                        : project.status === "Critical"
                        ? "text-danger"
                        : "text-primary"
                    }
                  >
                    {project.status}
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
