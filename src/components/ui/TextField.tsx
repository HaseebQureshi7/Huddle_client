import { CSSProperties, InputHTMLAttributes, LabelHTMLAttributes } from "react";
import { ColFlex } from "../../styles/utils/flexUtils";

interface IButton {
  title: string;
  parentProps?: InputHTMLAttributes<HTMLDivElement>;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  parentStyles?: CSSProperties;
  labelStyles?: CSSProperties;
  inputStyles?: CSSProperties;
}

function TextField({
  title,
  parentProps,
  labelProps,
  inputProps,
  inputStyles,
  labelStyles,
  parentStyles,
}: IButton) {
  return (
    <div
      style={{
        ...ColFlex,
        width: "100%",
        alignItems: "flex-start",
        gap: "5px",
        ...parentStyles,
      }}
      {...parentProps}
    >
      <label {...labelProps} style={{ fontSize: "0.9rem", ...labelStyles }}>
        {title}
      </label>
      <input
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "7.5px",
          border: "none",
          backgroundColor: "#ececec",
          ...inputStyles,
        }}
        type="email"
        {...inputProps}
      />
    </div>
  );
}

export default TextField;
