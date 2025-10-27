import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ReactNode } from "react";
import "./Button.css";

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
  children: ReactNode;
}

const Button = ({ type = "dark", children }: Props) => {
  return (
    <button type="button" className={"custom-button btn btn-outline-" + type}>
      {children}
    </button>
  );
};

export default Button;
