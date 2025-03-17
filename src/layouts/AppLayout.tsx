import { Outlet } from "react-router-dom";
import { LayoutFlex } from "../styles/utils/flexUtils";

function AppLayout() {
  return <div style={{ ...LayoutFlex}}>{<Outlet />}</div>;
}

export default AppLayout;
