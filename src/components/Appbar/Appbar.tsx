import { GearSix, Question, SignOut } from "@phosphor-icons/react";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";
import { CurrentDateTime } from "../../utils/CurrentDate";
import Button from "../ui/Button";
import Typography from "../ui/Typography";
import { useUser } from "../../hooks/useUser";
import colors from "../../styles/colors";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import { useResponsive } from "../../hooks/useResponsive";

function Appbar() {
  const { user } = useUser();

  const { category } = useResponsive();

  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const { mutate: logout, isPending: logoutStatus } = useLogout();
  return (
    <div
      style={category == "xs" ? {
        ...ColFlex,
        width: "100%",
        alignItems:"flex-start",
        padding: "15px",
        gap:"5px"
      } :{
        ...RowFlex,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "25px",
        padding: "15px",
      }}
    >
      {/* Logo bar */}
      <div style={{ minWidth: "125px", ...RowFlex, gap: "10px" }}>
        <img
          style={{ width: "60px", aspectRatio: "auto" }}
          src="/images/huddle-logo-top.png"
        />
        <Typography
          textProps={{ className: "gradient-text" }}
          size={1.85}
          styles={{ fontWeight: 500 }}
        >
          Huddle
        </Typography>
      </div>
      {/* current date */}
      <div style={{ ...RowFlex, gap: "10px", marginLeft: category == "xs" ? "none" : "auto" }}>
        <Typography size={1.5} styles={{ fontWeight: 400, color: "grey" }}>
          {CurrentDateTime()}
        </Typography>
      </div>
      <div style={{ ...RowFlex, gap: "10px" }}>
        <Button tooltip={`Your settings`}>
          <Typography size={0.8}>{user?.name}</Typography>
          <GearSix size={18} />
        </Button>

        <Button tooltip="help" style={{ backgroundColor: colors.primary }}>
          <Question size={18} />
        </Button>

        <Button
          tooltip="logout"
          onClick={() => setShowLogoutModal(true)}
          isLoading={logoutStatus}
          style={{ backgroundColor: colors.error }}
        >
          <SignOut size={18} />
        </Button>
      </div>
      <LogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
        logoutFn={logout}
      />
    </div>
  );
}

export default Appbar;
