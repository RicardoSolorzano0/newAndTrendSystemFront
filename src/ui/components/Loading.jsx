import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const Loading = () => {
  return (
    <Grid
      container
      spacing={0}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ minHeight: "100vh", padding: 4 }}
    >
      <Grid container direction="row" justifyContent={"center"}>
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};
