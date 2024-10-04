import { Navigate, Route, Routes } from "react-router";
import { Loading } from "../ui/components/Loading";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { NewsAndTrendRoute } from "../NewsAndTrendApp/routes/NewsAndTrendRoute";
import { store } from "../store/store";
import { useEffect } from "react";
import { refreshAccessToken } from "../store/auth/auth";
import { useUserHook } from "../NewsAndTrendApp/hooks/useUserHook";

export const AppRouter = () => {
  const { statusAuth, loginStore, setUser } = store();
  const { user } = useUserHook();

  const refresh = async (accesstoken, refreshToken) => {
    const { data } = await refreshAccessToken(accesstoken, refreshToken);
    const { accessToken } = data;
    localStorage.setItem("accessToken", accessToken);
    setUser({ ...user, accessToken });
    loginStore();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        refresh(accessToken, refreshToken);
      }
    }, 900000); // 15 minutos en milisegundos

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
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
