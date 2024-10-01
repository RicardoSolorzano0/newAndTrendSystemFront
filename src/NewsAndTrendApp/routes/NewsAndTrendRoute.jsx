import { Navigate, Route, Routes } from "react-router";
import { NewsAndTrendPage } from "../pages/NewsAndTrendPage";

export const NewsAndTrendRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<NewsAndTrendPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
