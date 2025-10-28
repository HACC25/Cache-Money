import Carousel from "../components/Carousel";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import "./Overview.css";
import Metrics from "../components/Metrics";
import ProjectList from "../components/ProjectList";

const data = [
  {
    name: "Keiki Replatform Off Mainframe Project",
    rating: "Low",
    link: "./projects",
  },
  { name: "Business Registration Modernization", rating: "Medium" },
  { name: "Integrated Case Management System", rating: "High" },
  { name: "Med-Quest Health Analytics Program", rating: "Completed" },
];

//This page will follow the figma mockup of "Public: landing page displaying: project highlight cart, metrics & more"
const Overview = () => {
  return (
    <div className="top-pad">
      <h1 className="header">Office of Enterprise Technology Services</h1>
      <h6>ABOUT US</h6>
      {/* Carousle */}
      <Carousel></Carousel>

      {/* View all projects button */}
      <Link
        to="/projects"
        className="text-decoration-none d-flex justify-content-end"
      >
        <Button>VIEW ALL ETS PROJECTS</Button>
      </Link>

      <h1 className="header">ETS PROJECT METRIC OVERVIEW</h1>

      {/* Metrics */}
      <div className="container">
        <div className="row">
          <div className="col">
            <Metrics value={20} metric="ACTIVE PROJECTS"></Metrics>
          </div>
          <div className="col">
            <Metrics value={15} metric="ON TRACK"></Metrics>
          </div>
          <div className="col">
            <Metrics value={3} metric="COMPLETED PROJECTS"></Metrics>
          </div>
        </div>
      </div>

      <h1 className="header">ETS PROJECT METRIC QUICK DASHBOARD</h1>

      {/* List of projects */}
      <ProjectList projects={data} type="light"></ProjectList>

      {/* View all projects button */}
      <Link
        to="/projects"
        className="text-decoration-none d-flex justify-content-end"
      >
        <Button>VIEW ALL ETS PROJECTS</Button>
      </Link>
    </div>
  );
};

export default Overview;
