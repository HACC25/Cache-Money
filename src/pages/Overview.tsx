import Carousel from "../components/Carousel";
import Button from "../components/Button";
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
      <h1 className="p-1 p-md-2 py-lg-4 container">
        Office of Enterprise Technology Services
      </h1>
      <h5 className="container">ABOUT US</h5>
      {/* Carousle */}
      <div className="p-1 p-md-2 py-lg-4 container">
        <Carousel></Carousel>
      </div>

      {/* View all projects button */}
      <div className="p-1 p-md-2 py-lg-4 text-decoration-none d-flex justify-content-end container">
        <Button link="/projects">VIEW ALL ETS PROJECTS</Button>
      </div>

      <h1 className="p-1 p-md-2 py-lg-4 container">
        ETS PROJECT METRIC OVERVIEW
      </h1>

      {/* Metrics */}
      <div className="p-1 p-md-2 py-lg-4 container">
        <div className="row width">
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

      <h1 className="p-1 p-md-2 py-lg-4 container">
        ETS PROJECT METRIC QUICK DASHBOARD
      </h1>

      {/* List of projects */}
      <div className="p-1 p-md-2 py-lg-4">
        <ProjectList projects={data} type="light"></ProjectList>
      </div>

      {/* View all projects button */}
      <div className="p-1 p-md-2 py-lg-4 text-decoration-none d-flex justify-content-end container">
        <Button link="/projects">VIEW ALL ETS PROJECTS</Button>
      </div>
    </div>
  );
};

export default Overview;
