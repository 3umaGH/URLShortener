import { Box, Typography } from "@mui/material";

import Fade from "@mui/material/Fade";

export const HeaderText = () => {
  return (
    <Box sx={{ mb: 5 }}>
      <Fade in={true} timeout={1600} mountOnEnter unmountOnExit>
        <Typography
          variant="h2"
          fontSize={{ xs: 30, sm: 44, md: 64 }}
          sx={{ mb: 1.5 }}
        >
          <b>
            Make every <b style={{ color: "#3477eb" }}>connection</b> count
          </b>
        </Typography>
      </Fade>

      <Fade in={true} timeout={1600} mountOnEnter unmountOnExit>
        <Typography
          variant="body1"
          fontSize={{ xs: 18, sm: 20, md: 28 }}
          sx={{ color: "#565657" }}
          lineHeight={1.4}
        >
          Shorten your links for free with <b>Short.ly!</b>
          <br />
          Track what's thriving, and what's not, effortlessly.
        </Typography>
      </Fade>
    </Box>
  );
};
