import { HomeOutlined } from "@mui/icons-material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RestoreIcon from "@mui/icons-material/Restore";
import { NewsPage } from "../NewsAndTrendApp/pages/NewsPage";
import { TrendsPage } from "../NewsAndTrendApp/pages/TrendsPage";
import { AnalysisPage } from "../NewsAndTrendApp/pages/AnalysisPage";
import { HistoryPage } from "../NewsAndTrendApp/pages/HistoryPage";

export const routes = [
  {
    path: "/",
    name: "Home",
    element: <>Home</>,
    icon: <HomeOutlined />,
    nested: false,
    routes: [],
    active: true,
  },
  {
    path: "/news",
    name: "Noticias",
    element: <NewsPage />,
    icon: <NewspaperIcon />,
    nested: false,
    routes: [],
    active: true,
  },
  {
    path: "/trends",
    name: "Tendencias",
    element: <TrendsPage />,
    icon: <TrendingUpIcon />,
    nested: false,
    routes: [],
    active: true,
  },
  {
    path: "/analysis",
    name: "Analisis de texto",
    element: <AnalysisPage />,
    icon: <QueryStatsIcon />,
    nested: false,
    routes: [],
    active: true,
  },
  {
    path: "/history",
    name: "Historial",
    element: <HistoryPage />,
    icon: <RestoreIcon />,
    nested: false,
    routes: [],
    active: true,
  },
];
