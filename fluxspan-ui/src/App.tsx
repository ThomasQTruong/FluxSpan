import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/LoginPage";
import { LandingPage } from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
