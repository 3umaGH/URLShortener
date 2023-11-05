import { Box, Typography } from "@mui/material";

type NavigationButtonProps = {
  title: string;
  path: string;
};

export const NavigationButton = ({ title, path }: NavigationButtonProps) => {
  return (
    <Box className="navbar button" onClick={() => alert(path)} sx={{ mx: "1vw", cursor:"pointer" }}>
      <Typography variant="h6" fontSize={16}>
        {title}
      </Typography>
    </Box>
  );
};
