import { Navigate, Route, Routes, useNavigate } from "react-router";
import { Loading } from "../ui/components/Loading";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { NewsAndTrendRoute } from "../NewsAndTrendApp/routes/NewsAndTrendRoute";
import { store } from "../store/store";
import { useEffect } from "react";
import { refreshAccessToken } from "../store/auth/auth";

export const AppRouter = () => {
  const { statusAuth, loginStore, setUser, user } = store();
  const navigate = useNavigate();

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
      //recuperando el location de el local storage
      const location = localStorage.getItem("location");
      navigate(location);
      console.log(location, "almacenada");
      setUser({ ...user, accessToken, refreshToken });
      loginStore();
    }
  }, []);

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
