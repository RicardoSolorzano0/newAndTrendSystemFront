import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { LayoutAuth } from "../layout/LayoutAuth";
import Grid from "@mui/material/Grid2";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const info = data;
    // const info = await login(username, password);
    console.log(info, "revisando la data");
  };

  return (
    <LayoutAuth
      title={"Login"}
      subtitle={"Bienvenido"}
      description={"¡Nos alegra tenerte de vuelta!"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Usuario"
              type="text"
              name="username"
              placeholder="Usuario"
              {...register("username", {
                required: "El usuario es obligatorio",
              })}
              error={errors.username ? true : false}
              helperText={errors.username?.message}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              name="password"
              placeholder="***********"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              error={errors.password ? true : false}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid size={12}>
            <Button fullWidth variant="contained" type="submit">
              Iniciar sesión
            </Button>
          </Grid>

          <Grid size={12}>
            <Typography align="center">
              ¿Aún no tienes cuenta? Crea tu cuenta
              <IconButton
                onClick={() => {
                  navigate("/auth/register");
                }}
              >
                <ArrowOutwardIcon
                  sx={{
                    border: "2px solid black",
                    borderRadius: "50%",
                    fontSize: 25,
                  }}
                />
              </IconButton>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </LayoutAuth>
  );
};
