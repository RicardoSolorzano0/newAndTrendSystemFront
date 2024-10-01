import { Navigate, Route, Routes } from "react-router";
import { Loading } from "../ui/components/Loading";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { NewsAndTrendRoute } from "../NewsAndTrendApp/routes/NewsAndTrendRoute";

export const AppRouter = () => {
  const statusAuth = "authenticated"; // "not-authenticated" "authenticated" "loading"

  if (statusAuth === "loading") {
    return <Loading />;
  }

  return (
    <Routes>
      {statusAuth === "authenticated" ? (
        <Route path="/*" element={<NewsAndTrendRoute />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
