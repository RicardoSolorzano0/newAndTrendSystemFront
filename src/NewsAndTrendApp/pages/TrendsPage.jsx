import { useLocation } from "react-router";
import { Nav } from "../../ui/components/Navigation/Nav";
import { trendsStore } from "../../store/trends/trendsStore";
import { useEffect, useState } from "react";
import { getTrends } from "../../store/trends/trends";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Pagination,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AlertUI } from "../../ui/components/AlertUI";

export const TrendsPage = () => {
  const location = useLocation();
  localStorage.setItem("location", location.pathname);

  const { trends, setTrends } = trendsStore();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    type: "",
    text: "",
  });
  const [pagination, setPagination] = useState({
    totalPages: 0,
    currentPage: 1,
  });

  const { totalPages, currentPage } = pagination;

  const handlePageChange = async (event, value) => {
    getData(value);
  };

  const getData = async (value) => {
    setLoading(true);
    const { articles, currentPage, totalPages } = await getTrends(value);
    setPagination({ currentPage, totalPages });
    setLoading(false);
    setTrends(articles);
  };

  useEffect(() => {
    getData(1);
  }, []);
  return (
    <Nav>
      <Box>
        <Typography variant="h4" gutterBottom>
          Buscar Tendencias
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {!loading && trends.length > 0 && (
          <>
            <Grid container spacing={3} mt={2}>
              {trends.map((item, index) => (
                <Grid
                  sx={{ display: "flex" }}
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={index}
                >
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {item.source.name} -{" "}
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {item.description}
                      </Typography>
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Leer más
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}

        {!loading && trends.length === 0 && (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            No se encontraron resultados para la búsqueda
          </Typography>
        )}
      </Box>
      <AlertUI alert={alert} setAlert={setAlert} />
    </Nav>
  );
};
