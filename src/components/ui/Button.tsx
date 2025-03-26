import { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import Loading from "./Loading";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  fullWidth?: boolean;
}

function Button({
  children,
  isLoading = false,
  disabled = false,
  style,
  fullWidth = false,
  ...rest
}: IButton) {
  return (
    <button
      className="button"
      disabled={disabled}
      style={{
        ...RowFlex,
        gap: "10px",
        width: fullWidth ? "100%" : "auto",
        padding: "12.5px",
        //   backgroundColor: "#36C1C1",
        backgroundColor: "black",
        color: "white",
        border: "none",
        filter: disabled ? "brightness(0.7)" : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        borderRadius: "7.5px",
        fontWeight: 500,
        ...style,
      }}
      type="button"
      {...rest}
    >
      {isLoading ? (
        <div
          style={{
            ...ColFlex,
          }}
        >
          <Loading />
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
