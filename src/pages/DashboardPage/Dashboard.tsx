import { Keyboard, Scribble } from "@phosphor-icons/react";
import Button from "../../components/ui/Button";
import Typography from "../../components/ui/Typography";
import colors from "../../styles/colors";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";
import TextField from "../../components/ui/TextField";
import DashboardCarousel from "./DashboardCarousel";
import { FormEvent, useState } from "react";
import NewSessionModal from "./NewSessionModal";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hooks/useResponsive";

function DashboardPage() {
  const [meetingLink, setMeetingLink] = useState<string>("");
  const [openNewSessionModal, setOpenNewSessionModal] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const { category } = useResponsive();

  const JoinRoom = (e: FormEvent) => {
    e.preventDefault();
    // create a artificial delay for joining meeting
    // and check if the room exists
    navigate(`/session/${meetingLink}`);
  };

  const CreateNewSession = () => {
    setOpenNewSessionModal(true);
  };

  return (
    <div
      className="fade-in"
      style={
        category == "xs"
          ? {
              ...ColFlex,
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }
          : {
              ...RowFlex,
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }
      }
    >
      <div
        style={{
          ...ColFlex,
          alignItems: "flex-start",
          width: category == "xs" ? "100%" : "60%",
          padding: category == "xs" ? "15px" : "50px",
          // backgroundColor: "red",
        }}
      >
        <div style={{ ...ColFlex, alignItems: "flex-start" }}>
          <Typography
            size={category == "xs" ? 1.5 : 2}
            styles={{ fontWeight: 400 }}
          >
            Start a new{" "}
          </Typography>
          <Typography
            textProps={{ className: "gradient-text" }}
            size={3}
            styles={{ lineHeight: 1, fontWeight: 500 }}
          >
            Collaboration Session
          </Typography>
          <Typography
            size={category == "xs" ? 0.75 : 1.1}
            styles={{ fontWeight: 400 }}
          >
            Build, connect, and collaborate from anywhere with Huddle
          </Typography>
        </div>
        <div
          style={
            category == "xs"
              ? {
                  ...ColFlex,
                  // flexDirection:"column-reverse",
                  alignItems: "flex-start",
                  gap: "15px",
                  marginTop: "25px",
                }
              : {
                  ...RowFlex,
                  justifyContent: "flex-start",
                  gap: "15px",
                  padding: "25px 0",
                }
          }
        >
          <Button
            onClick={CreateNewSession}
            style={{ backgroundColor: colors.primary }}
          >
            <Scribble size={18} />
            <Typography size={0.8}>Start a new session</Typography>
          </Button>
          <form onSubmit={JoinRoom} style={{ ...RowFlex, gap: "10px" }}>
            <TextField
              noLabel
              icon={<Keyboard size={18} />}
              inputProps={{
                placeholder: "Enter a code or link",
                value: meetingLink,
                onChange: (e) => setMeetingLink(e.target.value),
              }}
              title="meeting"
              parentStyles={{ width: "250px" }}
            />
            <Button
              type="submit"
              style={{ backgroundColor: colors.info }}
              disabled={meetingLink?.length == 0}
            >
              <Typography size={0.8}>Join</Typography>
            </Button>
          </form>
        </div>
      </div>
      <DashboardCarousel />

      {/* New Session Modal */}
      <NewSessionModal
        openNewSessionModal={openNewSessionModal}
        setOpenNewSessionModal={setOpenNewSessionModal}
      />
    </div>
  );
}

export default DashboardPage;
