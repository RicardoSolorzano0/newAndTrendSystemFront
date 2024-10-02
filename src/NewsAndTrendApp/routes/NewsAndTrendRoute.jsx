import { Navigate, Route, Routes } from "react-router";
import { NewsAndTrendPage } from "../pages/NewsAndTrendPage";
import { routes } from "../../router/routes";

export const NewsAndTrendRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<NewsAndTrendPage />} />
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
