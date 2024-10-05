import { useLocation } from "react-router";
import { Nav } from "../../ui/components/Navigation/Nav";
import UserAnalysisHistory from "../../ui/history/UserAnalysisHistory";
import AdminAnalysisHistoryAdmin from "../../ui/history/UserAnalysisHistoryAdmin";
import { useUserHook } from "../hooks/useUserHook";

export const HistoryPage = () => {
  const location = useLocation();
  localStorage.setItem("location", location.pathname);

  const { user } = useUserHook();
  const { rol } = user;

  if (rol === "user") {
    return (
      <Nav>
        <UserAnalysisHistory />
      </Nav>
    );
  }

  return (
    <Nav>
      <AdminAnalysisHistoryAdmin />
    </Nav>
  );
};
