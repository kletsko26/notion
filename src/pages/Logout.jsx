import { useContext, useEffect } from "react";
import UserContext from "@components/UserContext";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("userID");
    setUser(null);
    navigate("/login");
  }, []);

  return <></>;
};
