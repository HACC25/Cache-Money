import "./Metrics.css";
import CountUp from "./CountUp";

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
  value: number;
  metric: string;
}

const Metrics = ({ type = "light", value, metric }: Props) => {
  return (
    <div
      className={"card mb-3 custom-metric text-bg-" + type}
      style={{ border: "3px solid black" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Jomhuria&display=swap"
        rel="stylesheet"
      ></link>
      <div className="card-body">
        <h1 className="value px-1 pt-1 px-md-3 pt-md-3 px-lg-4 pt-lg-4 text-white">
          <CountUp to={value} />
        </h1>
      </div>
      <div className="card-header metric-name p-1 p-md-2 p-lg-3 text-white">
        {metric}
      </div>
    </div>
  );
};

export default Metrics;
