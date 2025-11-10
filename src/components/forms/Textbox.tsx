import { useId, useState } from "react";
import "./Textbox.css"


type Base = {
    label?: string;
    placeholder?: string;
    multiline?: boolean;
    rows?: number;
    id?: string;
};


type Controlled = { value: string; onChange : (v: string) => void };
type Uncontrolled = { defaultValue?: string; onChange?: (v:string) => void };
type Props = Base & (Controlled | Uncontrolled);


export default function Textbox(props: Props) {
    const {
      label = "Type here...",
      placeholder,
      multiline = false,
      rows = 3,
      id: explicitId,
} = props;


    const autoId = useId();
    const id = explicitId ?? autoId;


    const isControlled = "value" in props;
    const initial = "defaultValue" in props && props.defaultValue !== undefined
      ? props.defaultValue
      : "";


    const [inner, setInner] = useState<string>(initial);
    const value = isControlled ? props.value : inner;


    const setValue = (v: string) => {
        if (!isControlled) setInner(v);
        if ("onChange" in props && props.onChange) props.onChange(v);
    };


    return (
        <div className="mb-3 customTextbox">
            <label htmlFor={id} 
            className="form-label">{label}</label>
            {multiline ? (
                <textarea
                id = {id}
                className="form-control textbox-control"
                rows={rows}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                />
            ) : (
              <input
                id={id}
                type="text"
                className="form-control textbox-control"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
              />
            )}
        </div>
    );
}