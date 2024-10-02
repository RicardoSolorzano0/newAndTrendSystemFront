import { Box, Typography } from "@mui/material";

export const LayoutAuth = ({ children, title, subtitle, description }) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: "400px",
          margin: "auto",
          borderRadius: "10px",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "1px 1px 10px black",
        }}
      >
        {title && <Typography variant="h4">{title}</Typography>}
        {subtitle && <Typography variant="h5">{subtitle}</Typography>}
        {description && <Typography variant="h6">{description}</Typography>}
        {children}
      </Box>
    </Box>
  );
};
