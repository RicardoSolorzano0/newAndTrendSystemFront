import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavNested } from "./NavNested";

export const NavOption = ({
  name,
  icon,
  toggleDrawer,
  pl = 2,
  nested,
  routes,
}) => {
  if (nested) {
    return (
      <NavNested
        name={name}
        icon={icon}
        toggleDrawer={toggleDrawer}
        routes={routes}
      />
    );
  } else {
    return (
      <ListItemButton sx={{ pl: pl }} onClick={toggleDrawer(false)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    );
  }
};
