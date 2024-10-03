import { Nav } from "../../ui/components/Navigation/Nav";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { routes } from "../../router/routes";

export const NewsAndTrendPage = () => {
  return (
    <Nav>
      <Box>
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            py: 8,
            mb: 6,
            borderRadius: {
              xs: "20px 20px 20px 20px",
              sm: "50px 50px 50px 50px",
            },
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Container maxWidth="lg">
            <Grid
              container
              spacing={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid xs={12} md={6}>
                <Typography
                  textAlign={"center"}
                  variant="h2"
                  component="h1"
                  gutterBottom
                  fontWeight="bold"
                >
                  Sistema Noticias y tendencias
                </Typography>
                <Typography variant="h5" textAlign={"center"}>
                  Mantente al día con las últimas noticias y tendencias. Nuestro
                  sistema te ofrece herramientas avanzadas para explorar,
                  analizar y descubrir la información que realmente importa.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            align="center"
            fontWeight="bold"
          >
            Características principales
          </Typography>
          <Grid container spacing={4}>
            {routes.slice(1).map((feature) => (
              <Grid size={6} key={feature.path}>
                <Card
                  component={Link}
                  to={feature.path}
                  sx={{
                    textDecoration: "none",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  <CardMedia>{feature.icon}</CardMedia>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      fontWeight="bold"
                    >
                      {feature.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box sx={{ py: 6 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              align="center"
              fontWeight="bold"
            >
              ¿Cómo funciona?
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid xs={12} md={8}>
                <Typography variant="body1">
                  Nuestra app utiliza tecnología de punta para procesar y
                  analizar noticias. Nuestra aplicación se conecta a fuentes de
                  noticias confiables a través de APIs, permitiéndote buscar y
                  explorar noticias sobre cualquier tema.
                </Typography>
                <Typography variant="body1">
                  Además, empleamos algoritmos de procesamiento de lenguaje
                  natural para analizar el contenido de las noticias y textos
                  que proporciones. Esto nos permite extraer información valiosa
                  como el sentimiento general.
                </Typography>
                <Typography variant="body1">
                  Con nuestro sistema, tendrás acceso a herramientas poderosas
                  para mantenerte informado y comprender mejor el panorama de
                  las noticias actuales.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            fontWeight="bold"
          >
            ¿Listo para explorar?
          </Typography>
          <Typography variant="body1">
            Comienza a descubrir insights valiosos en las noticias de hoy.
          </Typography>
          <Button
            component={Link}
            to="/news"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              bgcolor: "primary.main",
            }}
          >
            Empezar ahora
          </Button>
        </Container>
      </Box>
    </Nav>
  );
};
