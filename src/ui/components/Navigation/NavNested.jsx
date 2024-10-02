import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { NavOption } from "./NavOption";

export const NavNested = (props) => {
  const { name, icon, toggleDrawer, routes } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {routes.map(({ path, name, icon, nested, routes }) => (
            <NavOption
              nested={nested}
              key={path}
              name={name}
              icon={icon}
              toggleDrawer={toggleDrawer}
              routes={routes}
            />
          ))}
        </List>
      </Collapse>
    </Box>
  );
};
