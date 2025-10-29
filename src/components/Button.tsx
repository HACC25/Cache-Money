import { ReactNode } from "react";
import { Link } from "react-router-dom";
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
  link?: string;
}

const Button = ({ type = "dark", children, link }: Props) => {
  return (
    <div>
      {link ? (
        <Link to={link}>
          <button
            type="button"
            className={"custom-button btn btn-outline-" + type}
          >
            {children}
          </button>
        </Link>
      ) : (
        <button
          type="button"
          className={"custom-button btn btn-outline-" + type}
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default Button;
