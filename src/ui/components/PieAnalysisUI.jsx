import Grid from "@mui/material/Grid2";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";

export const PieAnalysisUI = ({ pieChartData }) => {
  return (
    <Grid size={{ xs: 12, md: 12 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Distribución de Sentimientos
          </Typography>
          <Box sx={{ height: 300 }}>
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};
