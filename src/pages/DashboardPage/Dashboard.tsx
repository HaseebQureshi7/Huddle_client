import { Keyboard, Scribble } from "@phosphor-icons/react";
import Button from "../../components/ui/Button";
import Typography from "../../components/ui/Typography";
import colors from "../../styles/colors";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";
import TextField from "../../components/ui/TextField";
import DashboardCarousel from "./DashboardCarousel";
import { FormEvent, useState } from "react";

function DashboardPage() {
  const [meetingLink, setMeetingLink] = useState<string>("");
  const JoinRoom = (e:FormEvent) => {
    e.preventDefault()
    console.log("joining...")
  }
  return (
    <div
      className="fade-in"
      style={{
        ...RowFlex,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          ...ColFlex,
          alignItems: "flex-start",
          width: "60%",
          padding: "50px",
          // backgroundColor: "red",
        }}
      >
        <div style={{ ...ColFlex, alignItems: "flex-start" }}>
          <Typography size={2} styles={{ fontWeight: 400 }}>
            Start a new{" "}
          </Typography>
          <Typography
            textProps={{ className: "gradient-text" }}
            size={3}
            styles={{ lineHeight: 1, fontWeight: 500 }}
          >
            Collaboration Session
          </Typography>
          <Typography size={1.1} styles={{ fontWeight: 400 }}>
            Build, connect, and collaborate from anywhere with Huddle
          </Typography>
        </div>
        <div
          style={{
            ...RowFlex,
            justifyContent: "flex-start",
            gap: "15px",
            padding: "25px 0",
          }}
        >
          <Button style={{ backgroundColor: colors.primary }}>
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
    </div>
  );
}

export default DashboardPage;
