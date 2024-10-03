import { Navigate, Route, Routes } from "react-router";
import { Loading } from "../ui/components/Loading";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { NewsAndTrendRoute } from "../NewsAndTrendApp/routes/NewsAndTrendRoute";
import { store } from "../store/store";
import { useEffect } from "react";

export const AppRouter = () => {
  const { statusAuth, loginStore, setUser } = store();

  useEffect(() => {
    //evaluando que exista token en el local storage
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken") &&
      localStorage.getItem("user")
    ) {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const user = JSON.parse(localStorage.getItem("user"));
      setUser({ ...user, accessToken, refreshToken });
      loginStore();
    }
  }, []);

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
