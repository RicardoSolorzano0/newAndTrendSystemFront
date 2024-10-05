import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getHistory } from "../../store/historyAnalisis/history";
import { useUserHook } from "../../NewsAndTrendApp/hooks/useUserHook";
import { historyStore } from "../../store/historyAnalisis/historyStore";
import Grid from "@mui/material/Grid2";
import { PieAnalysisUI } from "../components/PieAnalysisUI";
import { Stadistic } from "../components/Stadistic";
import { PaginationHistory } from "../components/PaginationHistory";

ChartJS.register(ArcElement, Tooltip, Legend);

const ITEMS_PER_PAGE = 3;

export default function UserAnalysisHistory() {
  const { user } = useUserHook();
  const { id } = user;
  const { history, setHistory } = historyStore();
  const [page, setPage] = useState(1);
  const theme = useTheme();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedHistory = history.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const sentimentCounts = history.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
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
    const { history } = await getHistory(id, page);
    setHistory(history);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Tu Historial de Análisis
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <PieAnalysisUI pieChartData={chartData} />
        <Grid size={{ xs: 12, md: 12 }}>
          <Stadistic history={history} title={"Estadísticas de Análisis"} />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {paginatedHistory.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom noWrap>
                  Análisis
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {new Date(item.date).toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.text}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={`Sentimiento: ${item.sentiment}`}
                    color={
                      item.sentiment === "Positivo"
                        ? "success"
                        : item.sentiment === "Negativo"
                        ? "error"
                        : "default"
                    }
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Palabras clave:</strong> {item.keywords.join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <PaginationHistory
        history={history}
        page={page}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        handleChangePage={handleChangePage}
      />
    </Box>
  );
}
