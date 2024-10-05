import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const TableHistory = ({ paginatedHistory }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Texto (primeras 50 caracteres)</TableCell>
            <TableCell>Sentimiento</TableCell>
            <TableCell>Palabras clave</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedHistory.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell>{new Date(item.date).toLocaleString()}</TableCell>
              <TableCell>{item.text.substring(0, 50)}...</TableCell>
              <TableCell>
                <Chip
                  label={item.sentiment}
                  color={
                    item.sentiment === "Positivo"
                      ? "success"
                      : item.sentiment === "Negativo"
                      ? "error"
                      : "default"
                  }
                  size="small"
                />
              </TableCell>
              <TableCell>{item.keywords.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
