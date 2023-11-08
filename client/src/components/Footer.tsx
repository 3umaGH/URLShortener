import { Box, Container, Grid, Typography } from "@mui/material";
import { logoSource } from "./NavigationBar/NavigationMenu";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export const Footer = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 8, pb: 5 }}>
      <Grid item xs={12} md={3}>
        <img src={logoSource} alt="Logo"></img>
      </Grid>

      <Grid item xs={12} md={3} sx={{ mt: 3.5 }}>
        <Typography variant="h6">
          <b>Find us in social media</b>
        </Typography>
        <Container>
          <InstagramIcon
            className="icon centerTop hover"
            fontSize="large"
            sx={{ mx: 2, color: "gray" }}
          />
          <FacebookIcon
            className="icon centerTop hover"
            fontSize="large"
            sx={{ mx: 2, color: "gray" }}
          />
          <TwitterIcon
            className="icon centerTop hover"
            fontSize="large"
            sx={{ mx: 2, color: "gray" }}
          />
          <LinkedInIcon
            className="icon centerTop hover"
            fontSize="large"
            sx={{ mx: 2, color: "gray" }}
          />
        </Container>
      </Grid>

      <Grid item xs={12} md={3} sx={{ mt: 3.5 }}>
        <Typography variant="h6">
          <b>Company</b>
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Link small</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Another Link</b>
          </Typography>

          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Link small</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Another Link</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Link small</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Another Link</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Link small</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Another Link</b>
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={3} sx={{ mt: 3.5 }}>
        <Typography variant="h6">
          <b>About</b>
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Link small</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Another Link</b>
          </Typography>

          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Link small</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Another Link</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Link small</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Another Link</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Link small</b>
          </Typography>
          <Typography variant="h6" fontSize={16} sx={{ color: "gray" }}>
            <b>Another Link</b>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
