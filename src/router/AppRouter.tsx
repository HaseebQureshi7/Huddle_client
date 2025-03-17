import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
// const LoginPage = lazy(() => import("../pages/LoginPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <LandingPage /> }
    ],
  },
  {
    index: true,
    element: <LandingPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
