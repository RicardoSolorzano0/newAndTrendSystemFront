import { Box, Pagination } from "@mui/material";

export const PaginationHistory = ({
  history,
  page,
  handleChangePage,
  ITEMS_PER_PAGE,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Pagination
        count={Math.ceil(history.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        size={"small"}
      />
    </Box>
  );
};
