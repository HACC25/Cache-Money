import Carousel from "../components/Carousel";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import "./Page.css";
import Metrics from "../components/Metrics";

//This page will follow the figma mockup of "Public: landing page displaying: project highlight cart, metrics & more"
const Overview = () => {
  return (
    <div>
      <Carousel></Carousel>
      <Link
        to="/projects"
        className="text-decoration-none d-flex justify-content-end"
      >
        <Button>VIEW ALL ETS PROJECTS</Button>
      </Link>
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
    </div>
  );
};

export default Overview;
