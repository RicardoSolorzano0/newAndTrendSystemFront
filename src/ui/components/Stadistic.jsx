import { Card, CardContent, Typography } from "@mui/material";

export const Stadistic = ({ children, history, title }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1">
          Total de análisis: {history.length}
        </Typography>
        <Typography variant="body1">
          Último análisis: {new Date(history[0]?.date).toLocaleString()}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};
