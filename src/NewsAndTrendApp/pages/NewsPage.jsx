import {
  Box,
  Button,
  Card,
  CardContent,
  // CardMedia,
  CircularProgress,
  Link,
  Pagination,
  TextField,
  // Tooltip,
  Typography,
} from "@mui/material";
import { Nav } from "../../ui/components/Navigation/Nav";
import Grid from "@mui/material/Grid2";
import { newsStore } from "../../store/news/newsStore";
import { useState } from "react";
import { getNews } from "../../store/news/news";
import { useForm } from "react-hook-form";
import { AlertUI } from "../../ui/components/AlertUI";
import { useLocation } from "react-router";

export const NewsPage = () => {
  const location = useLocation();
  localStorage.setItem("location", location.pathname);

  const { news, setNews } = newsStore();
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

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { topic } = getValues();

  const onSubmit = async (form) => {
    setLoading(true);
    const { topic } = form;
    const { err, articles, currentPage, totalPages } = await getNews(topic, 1);
    if (err) {
      setAlert({
        open: true,
        type: "error",
        text: err,
      });
      setNews([]);
      setLoading(false);
      return;
    }
    setPagination({ currentPage, totalPages });
    setLoading(false);
    setNews(articles);
  };

  const handlePageChange = async (event, value) => {
    setLoading(true);
    const { articles, currentPage, totalPages } = await getNews(topic, value);
    setPagination({ currentPage, totalPages });
    setLoading(false);
    setNews(articles);
  };

  return (
    <Nav>
      <Box>
        <Typography variant="h4" gutterBottom>
          Buscar Noticias
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 11 }}>
              <TextField
                fullWidth
                label="Tema"
                type="text"
                name="topic"
                placeholder="Ej: Tecnología"
                {...register("topic", {
                  required: "El tema es obligatorio",
                })}
                error={errors.topic ? true : false}
                helperText={errors.topic?.message}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 1 }}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
              >
                Buscar
              </Button>
            </Grid>
          </Grid>
        </form>

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {!loading && news.length > 0 && (
          <>
            <Grid container spacing={3} mt={2}>
              {news.map((item, index) => (
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

        {!loading && news.length === 0 && topic && (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            No se encontraron resultados para {topic}
          </Typography>
        )}
      </Box>
      <AlertUI alert={alert} setAlert={setAlert} />
    </Nav>
  );
};
