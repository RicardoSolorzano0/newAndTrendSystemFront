import { useLocation } from "react-router";
import { Nav } from "../../ui/components/Navigation/Nav";

export const AnalysisPage = () => {
  const location = useLocation();
  localStorage.setItem("location", location.pathname);

  return <Nav>AnalysisPage</Nav>;
};
