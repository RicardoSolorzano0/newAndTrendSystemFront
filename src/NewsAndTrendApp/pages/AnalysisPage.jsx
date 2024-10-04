import { useLocation } from "react-router";
import { Nav } from "../../ui/components/Navigation/Nav";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { analysisStore } from "../../store/analysis/analysisStore";
import { analyzeSentiment } from "../../store/analysis/analysis";
import { useUserHook } from "../hooks/useUserHook";

export const AnalysisPage = () => {
  const { user } = useUserHook();
  const { id } = user;

  const { analysis, setAnalysis } = analysisStore();

  const location = useLocation();
  localStorage.setItem("location", location.pathname);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (form) => {
    const { headlines } = form;
    const { results, sentiment } = await analyzeSentiment(headlines, id);
    setAnalysis({ sentiment: results, score: sentiment });
  };

  return (
    <Nav>
      <Typography variant="h4" gutterBottom>
        Análisis de Texto
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Texto"
          type="text"
          name="headlines"
          placeholder="Ingrese el texto a analizar"
          {...register("headlines", { required: "El texto es requerido" })}
          error={!!errors.headlines}
          helperText={errors.headlines?.message}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit" sx={{ mb: 2 }}>
          Analizar
        </Button>
      </form>

      {analysis && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Resultados del Análisis
            </Typography>
            <Typography>Sentimiento: {analysis.sentiment}</Typography>
            <Typography>Puntaje dado: {analysis.score}</Typography>
          </CardContent>
        </Card>
      )}
    </Nav>
  );
};
