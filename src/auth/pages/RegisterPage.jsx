import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { LayoutAuth } from "../layout/LayoutAuth";
import Grid from "@mui/material/Grid2";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <LayoutAuth
      title={"Register"}
      subtitle={"Bienvenido"}
      description={"¡Registrate para comenzar!"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid size={12}>
            <TextField
              autoComplete="off"
              fullWidth
              label="Usuario"
              type="text"
              name="userName"
              placeholder="Usuario"
              {...register("userName", {
                required: "El usuario es obligatorio",
                minLength: {
                  value: 5,
                  message: "El usuario debe tener al menos 5 caracteres",
                },
              })}
              error={errors.userName ? true : false}
              helperText={errors.userName?.message}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              autoComplete="off"
              fullWidth
              label="Correo electrónico"
              type="email"
              name="email"
              placeholder="correo@gmail.com"
              {...register("email", {
                required: "El correo es obligatorio",
              })}
              error={errors.email ? true : false}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              autoComplete="off"
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
              Registrar
            </Button>
          </Grid>

          <Grid size={12}>
            <Typography align="center">
              ¿Ya tienes cuenta? Ingresa a tu cuenta
              <IconButton
                onClick={() => {
                  navigate("/auth/login");
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
