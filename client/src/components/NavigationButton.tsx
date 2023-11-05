import { Box, Typography } from "@mui/material";

type NavigationButtonProps = {
  title: string;
  path: string;
};

export const NavigationButton = ({ title, path }: NavigationButtonProps) => {
  return (
    <Box
      className="navbar button"
      onClick={() => alert(path)}
      sx={{
        mx: "5vw",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      <Typography variant="h6" component="span" fontSize={16}>
        {title}
      </Typography>
    </Box>
  );
};
