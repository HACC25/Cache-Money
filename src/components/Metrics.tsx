import "./Metrics.css";

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
    <div className={"card mb-3 custom-metric text-bg-" + type}>
      <link
        href="https://fonts.googleapis.com/css2?family=Jomhuria&display=swap"
        rel="stylesheet"
      ></link>
      <div className="card-body">
        <h1 className="value p-2 p-md-4 p-lg-5">{value}</h1>
      </div>
      <div className="card-header metric-name p-1 p-md-2 p-lg-3">{metric}</div>
    </div>
  );
};

export default Metrics;
