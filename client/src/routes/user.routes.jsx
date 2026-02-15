import VerifyEmail from "../components/shared/VerifyEmail";
import UserSignup from "../pages/shared/UserSignup";

export const userRoutes = [
  {
    path: "auth/signup/email",
    element: <UserSignup />,
  },
  {
    path: "/VerifyEmail",
    element: <VerifyEmail />,
  },
];
