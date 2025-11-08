import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Button.css";

interface Content {
  name: string;
  link: string;
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
  content: Content[];
  onSelect?: (selected: string) => void;
}

const ButtonGroup = ({ type = "primary", content, onSelect }: Props) => {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Update selected button based on current route
  useEffect(() => {
    const currentIndex = content.findIndex(
      (item) => item.link === location.pathname
    );
    if (currentIndex !== -1) {
      setSelectedIndex(currentIndex);
    }
  }, [location.pathname, content]);

  const handleSelect = (index: number, name: string) => {
    setSelectedIndex(index);
    if (onSelect) {
      onSelect(name);
    }
  };

  return (
    <div className="btn-group" role="group">
      {content.map((item, index) => (
        <Link to={item.link}>
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id={item.name + index}
            autoComplete="off"
            checked={selectedIndex === index}
            onChange={() => handleSelect(index, item.name)}
          />
          <label
            className={"custom-button btn btn-outline-" + type}
            htmlFor={item.name + index}
          >
            {item.name}
          </label>
        </Link>
      ))}
    </div>
  );
};

export default ButtonGroup;
