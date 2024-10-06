import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { LayoutAuth } from "../layout/LayoutAuth";
import Grid from "@mui/material/Grid2";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { register as registerUser } from "../../store/auth/auth";
import { AlertUI } from "../../ui/components/AlertUI";
import { useState } from "react";
import { store } from "../../store/store";

export const RegisterPage = () => {
  const { setUser, loginStore, setLoading } = store();
  const [alert, setAlert] = useState({
    open: false,
    type: "",
    text: "",
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (form) => {
    setLoading();
    const { username, email, password } = form;
    const { msg, accessToken, refreshToken, user } = await registerUser(
      username,
      email,
      password
    );

    if (msg) {
      setAlert({
        open: true,
        type: "error",
        text: msg,
      });
    } else {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      setUser({ ...user, accessToken, refreshToken });
      loginStore();

      setAlert({
        open: true,
        type: "success",
        text: "Registro exitoso",
      });
    }
  };

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
              name="username"
              placeholder="Usuario"
              {...register("username", {
                required: "El usuario es obligatorio",
                minLength: {
                  value: 5,
                  message: "El usuario debe tener al menos 5 caracteres",
                },
              })}
              error={errors.username ? true : false}
              helperText={errors.username?.message}
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
      <AlertUI alert={alert} setAlert={setAlert} />
    </LayoutAuth>
  );
};
