import { userApi } from "../../api/user.api";
import LoginForm from "../../components/shared/LoginForm";
import { useNavigate } from "react-router-dom";

export default function UserSignup() {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    await userApi.signup(formData);
    navigate("/VerifyEmail");
  };
  return <LoginForm onSubmit={handleSubmit} formUse={"Create new account"} />;
}
