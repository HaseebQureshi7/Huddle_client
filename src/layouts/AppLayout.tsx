import { Outlet, useNavigate } from "react-router-dom";
import { LayoutFlex } from "../styles/utils/flexUtils";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import LoadingPage from "../pages/LoadingPage/LoadingPage"; // Import a loading screen

function AppLayout() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const res = await api.post("/auth/me", {});
        setUser(res.data.data.user);
        navigate("/dashboard");
      } catch {
        navigate("/");
      } finally {
        setIsLoading(false); // Stop loading once API call completes
      }
    };

    autoLogin();
  }, []);

  if (isLoading) return <LoadingPage width="100%" height="100dvh" />; // Show loader until ready

  return <div style={{ ...LayoutFlex }}>{<Outlet />}</div>;
}

export default AppLayout;
