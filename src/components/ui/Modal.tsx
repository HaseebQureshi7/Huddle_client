import { X } from "@phosphor-icons/react";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";
import Typography from "./Typography";
import Button from "./Button";
import { ReactNode } from "react";

interface IModal {
  children: ReactNode;
  title: string;
  subTitle: string;
  modalState: {
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
  };
}

function Modal({ children, modalState, subTitle, title }: IModal) {
  return (
    <div
      style={{
        ...ColFlex,
        width: "100dvw",
        height: "100dvh",
        backgroundColor: "rgba(100, 100, 100, 0.2)",
        backdropFilter: "blur(5px)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      {/* modal content */}
      <div
        className="fade-in-fast"
        style={{
          ...ColFlex,
          width: "50%",
          minHeight: "30dvh",
          justifyContent: "flex-start",
        //   border: "2px solid lightgrey",
          borderRadius: "12.5px",
          backgroundColor: "white",
          padding: "25px 20px",
          gap:"25px"
        }}
      >
        {/* modal header */}
        <div
          style={{ ...RowFlex, width: "100%", justifyContent: "space-between" }}
        >
          {/* title & sub heading */}
          <div style={{ ...ColFlex, alignItems: "flex-start" }}>
            <Typography size={1.25} styles={{ fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography size={1} styles={{ color: "grey" }}>
              {subTitle}
            </Typography>
          </div>
          {/* Modal Actions */}
          <div style={{ ...ColFlex, alignItems: "center" }}>
            <Button
              onClick={() => modalState.setOpenModal(false)}
              style={{ backgroundColor: "transparent" }}
            >
              <X size={20} style={{ color: "grey" }} />
            </Button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
