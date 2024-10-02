import { Navigate, Route, Routes } from "react-router";
import { Loading } from "../ui/components/Loading";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { NewsAndTrendRoute } from "../NewsAndTrendApp/routes/NewsAndTrendRoute";
import { store } from "../store/store";

export const AppRouter = () => {
  const { statusAuth } = store();

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
