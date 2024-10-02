import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { routes } from "../../../router/routes";
import { NavNested } from "./NavNested";
import { NavOption } from "./NavOption";
import { Link } from "react-router-dom";

export const Nav = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={toggleDrawer(false)}
    >
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
              <NavOption name={name} icon={icon} toggleDrawer={toggleDrawer} />
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
      <Divider />
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
            News and Trends
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
