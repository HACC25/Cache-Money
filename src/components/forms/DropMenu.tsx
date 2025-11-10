import { useState, useId } from "react";
import "./DropMenu.css";

type Variant = 
| "primary"
| "secondary"
| "success"
| "danger"
| "warning"
| "info"
| "light"
| "dark";

export type DropItem = string | {
    label: string;
    value?: string | number;
    disabled? : boolean 
};


interface Props {
    id?: string;
    label?: string;
    type?: Variant;
    items: DropItem[];
    onSelect?: (item: DropItem, index: number) => void;
    selectedIndex?: number;
    defaultSelectedIndex?: number;
    className?:string;
    onClear?: () => void;
    clearable?: boolean;
    clearText?: string;
}


const getLabel = (item: DropItem) => (typeof item === "string" ? item : item.label);


export default function DropMenu({
    id,
    label = "choose",
    type = "secondary",
    items,
    onSelect,
    selectedIndex,
    defaultSelectedIndex,
    className,
    onClear,
    clearable = false,
    clearText = "Clear",
}: Props) {
    const [internalIndex, setInternalIndex] = useState<number | undefined>(defaultSelectedIndex);
    const activeIndex = selectedIndex ?? internalIndex;


    const activeText = activeIndex != null ? getLabel(items[activeIndex]) : label;
    


    return (
        <div className={`dropdown ${className ?? ""}`}> 
          <button
          id={id}
          className={`btn btn-${type} dropdown-toggle`}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded={false}
        >
          {activeText}
        </button>


        <ul className="dropdown-menu">
            {clearable && (
              <>
                <li>
                    <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => {
                        if (selectedIndex == null) setInternalIndex(undefined);
                        onClear?.();
                    }}
                    >
                        {clearText}
                    </button>
                </li>
                <li><hr className="dropdown-divider" /></li>
              </>
            )}


            {items.map((item, i) => {
                const text = getLabel(item);
                const disabled = typeof item === "object" && !!item.disabled;
                return (
                  <li key={i}>
                    <button
                    className="dropdown-item"
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                        if (selectedIndex == null) setInternalIndex(i);
                        onSelect?.(item, i);
                    }}
                    >
                        {text}
                    </button>
                  </li>
                );
            })}
        </ul>
      </div>
    );
};
    
export function LabeledDropMenu ({
  title,
  id: explicitId,
  ... props
}: { title: string } & React.ComponentProps<typeof DropMenu>) {
    const autoId = useId();
    const id = explicitId ?? autoId;
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{title}</label>
            <DropMenu id={id} {... props} />
        </div>
    );
}