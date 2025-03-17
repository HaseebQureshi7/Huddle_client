import Button from "../components/ui/Button";
import TextField from "../components/ui/TextField";
import Typography from "../components/ui/Typography";
import { ColFlex, PageFlex, RowFlex } from "../styles/utils/flexUtils";

function LoginPage() {
  return (
    <div className="fade-in" style={{ ...PageFlex }}>
      {/* page body */}
      <div
        style={{
          width: "100%",
          height: "100%",
          ...RowFlex,
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            ...ColFlex,
            width: "100%",
            height: "100dvh",
          }}
        >
          {/* Form Container */}
          <div
            style={{
              ...ColFlex,
              width: "40%",
              padding: "50px 25px",
              borderRadius: "25px",
              gap: "40px",
            }}
          >
            {/* header */}
            <div
              className="animated-gradient"
              style={{ ...ColFlex, width: "100%" }}
            >
              <img
                style={{
                  width: "75px",
                  aspectRatio: "auto",
                  marginBottom: "25px",
                }}
                src="/public/images/huddle-logo-top.png"
              />
              <Typography
                textProps={{ className: "gradient-text" }}
                styles={{ fontWeight: 500 }}
                size={2}
              >
                Welcome back
              </Typography>
              <Typography
                styles={{ fontWeight: 400, color: "grey" }}
                size={0.8}
              >
                Enter your email and passoword to access your account
              </Typography>
            </div>
            {/* inputs */}
            <div style={{ ...ColFlex, width: "100%", gap: "15px" }}>
              <TextField
                title="Email"
                inputProps={{
                  placeholder: "Enter your email address",
                  onChange: (e) => console.log(e.target.value),
                }}
              />
              <TextField
                title="Password"
                inputProps={{
                  placeholder: "Enter your password",
                  type: "password",
                }}
              />
            </div>
            <div style={{ ...ColFlex, width: "100%", gap: "10px" }}>
              <Button>Login</Button>
              <Button
                styles={{
                  boxShadow: "inset 0 0 0 2px black",
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
