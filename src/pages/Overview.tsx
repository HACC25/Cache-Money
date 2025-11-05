import Carousel from "../components/Carousel";
import Button from "../components/Button";
import "./Overview.css";
import Metrics from "../components/Metrics";
import ProjectList from "../components/ProjectList";
import Follow from "../components/Follow";

const data = [
  {
    name: "Keiki Replatform Off Mainframe Project",
    rating: "Low",
    link: "/projects",
  },
  { name: "Business Registration Modernization", rating: "Medium" },
  { name: "Integrated Case Management System", rating: "High" },
  { name: "Med-Quest Health Analytics Program", rating: "Completed" },
];

//This page will follow the figma mockup of "Public: landing page displaying: project highlight cart, metrics & more"
const Overview = () => {
  return (
    <div className="">
      <div className="container">
        <div className="row">
          <h1
            className="pb-1 pb-md-2 pb-lg-4 top-pad"
            style={{ fontSize: "clamp(1rem, 2vw + 1rem, 4rem)" }}
          >
            Office of Enterprise Technology Services
          </h1>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <h5 style={{ fontSize: "clamp(1rem, 1.5vw, 2rem)" }}>ABOUT US</h5>
        </div>
      </div>

      {/* Carousle */}
      <div className="container pb-1 pb-lg-2">
        <div>
          <Carousel></Carousel>
        </div>
      </div>

      {/* View all projects button */}
      <div className="container">
        <div className="row">
          <div className="pt-1 pt-md-2 pt-lg-4 text-decoration-none d-flex justify-content-end">
            <Button link="/projects">VIEW ALL ETS PROJECTS</Button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <h1
            className="pt-1 pt-md-2 pt-lg-4"
            style={{ fontSize: "clamp(1rem, 2vw + 1rem, 2.5rem)" }}
          >
            ETS PROJECT METRIC OVERVIEW
          </h1>
        </div>
      </div>

      {/* Metrics */}
      <div className="container">
        <div className="row">
          <div className="py-1 py-md-2 py-lg-4">
            <div className="row">
              <div className="col">
                <Metrics
                  value={20}
                  metric="ACTIVE PROJECTS"
                  type="success"
                ></Metrics>
              </div>
              <div className="col">
                <Metrics value={15} metric="ON TRACK" type="warning"></Metrics>
              </div>
              <div className="col">
                <Metrics
                  value={3}
                  metric="COMPLETED PROJECTS"
                  type="primary"
                ></Metrics>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <h1
            className="py-1 pt-md-3 py-lg-4"
            style={{ fontSize: "clamp(1rem, 2vw + 1rem, 2.5rem)" }}
          >
            ETS PROJECT METRIC QUICK DASHBOARD
          </h1>
        </div>
      </div>

      {/* List of projects */}
      <div className="container">
        <div className="row">
          <div className="pb-1 pb-md-2 pb-lg-4">
            <ProjectList projects={data} type="light"></ProjectList>
          </div>
        </div>
      </div>

      {/* View all projects button */}
      <div className="container">
        <div className="row">
          <div className="py-1 py-md-2 py-lg-4 text-decoration-none d-flex justify-content-end">
            <Button link="/projects">VIEW ALL ETS PROJECTS</Button>
          </div>
        </div>
      </div>

      {/* Follow ETS */}
      <hr></hr>
      <div className="container">
        <div className="row pt-4">
          <h1 style={{ fontSize: "clamp(1rem, 2vw + 1rem, 3rem)" }}>
            Want to follow the ETS Projects?
          </h1>
          <p style={{ fontSize: "clamp(1rem, 2.8vw, 2rem)" }}>
            Provide your email to receive notifications for new projects and
            reports
          </p>
          <div className="pb-5">
            <Follow></Follow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
