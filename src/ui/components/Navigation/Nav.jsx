import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { routes } from "../../../router/routes";
import { NavNested } from "./NavNested";
import { NavOption } from "./NavOption";
import { Link } from "react-router-dom";
import { store } from "../../../store/store";
import CloseIcon from "@mui/icons-material/Close";
import { usersInitValue } from "../../../store/auth/authStore";

export const Nav = ({ children }) => {
  const { user, logoutStore, setUser } = store();
  const { username } = user;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    logoutStore();
    setUser(usersInitValue);
  };

  const DrawerList = (
    <Box
      role="presentation"
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      // onClick={toggleDrawer(false)}
    >
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          overflow: "auto",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Menú
        </Typography>
        <List>
          {routes.map(({ path, name, icon, nested, routes }) => (
            <ListItem
              key={path}
              disablePadding
              sx={{ color: "black" }}
              component={Link}
              to={path}
            >
              {!nested ? (
                <NavOption
                  name={name}
                  icon={icon}
                  toggleDrawer={toggleDrawer}
                />
              ) : (
                <NavNested
                  path={path}
                  name={name}
                  icon={icon}
                  nested={nested}
                  routes={routes}
                  toggleDrawer={toggleDrawer}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://i.pinimg.com/564x/8f/ef/f9/8feff93941a2425f1d7b98118625a17d.jpg"
        />
        <Typography>{username}</Typography>
        <Tooltip title="Cerrar sesión">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => {
              handleLogout();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  return (
    <Box display={"flex"}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{ color: "white", textDecoration: "none" }}
            component={Link}
            to={"/"}
          >
            Noticias y tendencias
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: 9,
          marginLeft: 2,
          marginRight: 2,
          padding: 2,
          borderRadius: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
