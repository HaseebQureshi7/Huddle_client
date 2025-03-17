import { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

interface IButton {
  children: ReactNode;
  styles?: CSSProperties;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

function Button({ children, styles, buttonProps }: IButton) {
  return (
    <button
    className="button"
      style={{
        width: "100%",
        padding: "12.5px",
        //   backgroundColor: "#36C1C1",
        backgroundColor: "black",
        color: "white",
        border: "none",
        borderRadius: "7.5px",
        fontWeight:600,
        ...styles,
      }}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default Button;
