import { GearSix, Question, SignOut } from "@phosphor-icons/react";
import { RowFlex } from "../styles/utils/flexUtils";
import { CurrentDateTime } from "../utils/CurrentDate";
import Button from "./ui/Button";
import Typography from "./ui/Typography";
import { useUser } from "../hooks/useUser";
import colors from "../styles/colors";
import useLogout from "../hooks/useLogout";

function Appbar() {
  const { user } = useUser();
  const { mutate: logout, isPending: logoutStatus } = useLogout();
  return (
    <div
      style={{
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
          src="/public/images/huddle-logo-top.png"
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
      <div style={{ ...RowFlex, gap: "10px", marginLeft: "auto" }}>
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
          onClick={() => logout()}
          isLoading={logoutStatus}
          style={{ backgroundColor: colors.error }}
        >
          <SignOut size={18} />
        </Button>
      </div>
    </div>
  );
}

export default Appbar;
