import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Link,
  Pagination,
  TextField,
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
import { analyzeSentiment } from "../../store/analysis/analysis";
import { useUserHook } from "../hooks/useUserHook";

export const NewsPage = () => {
  const { user } = useUserHook();
  const { id } = user;
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
    const { message, articles, currentPage, totalPages } = await getNews(
      topic,
      1
    );
    if (message) {
      setAlert({
        open: true,
        type: "error",
        text: message,
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
    const { articles, currentPage, totalPages, message } = await getNews(
      topic,
      value
    );

    if (message) {
      setAlert({
        open: true,
        type: "error",
        text: message,
      });
      setNews([]);
      setLoading(false);
      return;
    }

    setPagination({ currentPage, totalPages });
    setLoading(false);
    setNews(articles);
  };

  const handleSaveNewsSentimental = async (item) => {
    const { description, title } = item;
    const { message } = await analyzeSentiment(description, id, title);
    if (message) {
      setAlert({
        open: true,
        type: "error",
        text: message,
      });
      return;
    }
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
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                      <Button onClick={() => handleSaveNewsSentimental(item)}>
                        <Link
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Leer más
                        </Link>
                      </Button>
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
