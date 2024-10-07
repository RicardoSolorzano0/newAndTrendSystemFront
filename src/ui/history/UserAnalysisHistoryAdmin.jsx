import { useState, useMemo, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { getHistory } from "../../store/historyAnalisis/history";
import { useUserHook } from "../../NewsAndTrendApp/hooks/useUserHook";
import { historyStore } from "../../store/historyAnalisis/historyStore";
import Grid from "@mui/material/Grid2";
import { PieAnalysisUI } from "../components/PieAnalysisUI";
import { Stadistic } from "../components/Stadistic";
import { PaginationHistory } from "../components/PaginationHistory";
import { TableHistory } from "../components/TableHistory";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const ITEMS_PER_PAGE = 5;

export default function AdminAnalysisHistoryAdmin() {
  const { user } = useUserHook();
  const { id } = user;
  const { history, setHistory } = historyStore();
  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedHistory = history.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const sentimentCounts = useMemo(() => {
    return history.reduce((acc, item) => {
      acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
      return acc;
    }, {});
  }, [history]);

  const pieChartData = {
    labels: Object.keys(sentimentCounts),
    datasets: [
      {
        data: Object.values(sentimentCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const getData = async () => {
    const { history } = await getHistory(id);
    setHistory(history);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Panel de Administración - Historial de Análisis
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <PieAnalysisUI pieChartData={pieChartData} />
      </Grid>
      <Stadistic history={history} title="Estadísticas Generales">
        <Typography variant="body1">
          Sentimiento más común:{" "}
          {Object.keys(sentimentCounts).length > 0
            ? Object.entries(sentimentCounts).reduce((a, b) =>
                a[1] > b[1] ? a : b
              )[0]
            : "No hay datos"}
        </Typography>
        <Typography variant="body1">
          Número de usuarios únicos:{" "}
          {new Set(history.map((item) => item.userId)).size}
        </Typography>
      </Stadistic>
      <TableHistory paginatedHistory={paginatedHistory} />
      <PaginationHistory
        history={history}
        page={page}
        handleChangePage={handleChangePage}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
      />
    </Box>
  );
}
