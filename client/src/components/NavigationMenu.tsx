import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import { Box, Button } from "@mui/material";
import { NavigationButton } from "./NavigationButton";

export const NavigationMenu = () => {
  const logoSrc = "https://placeholderlogo.com/img/placeholder-logo-4.png";
  const paths = [
    { title: "Products", link: "/" },
    { title: "View Analytics", link: "/" },
  ];

  return (
    <Container disableGutters maxWidth={false} sx={{ maxWidth: "1300px" }}>
      <AppBar
        position="static"
        sx={{
          m: 0,
          backgroundColor: "rgba(0,0,0,0.0)",
          color: "#4a4a4a",
          boxShadow: "none",
        }}
      >
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <img src={logoSrc} alt="Logo"></img>
        </Box>

        <Toolbar
          sx={{
            height: "100px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <img src={logoSrc} alt="Logo"></img>
          </Box>

          {paths.map((path) => (
            <NavigationButton
              key={path.title}
              title={path.title}
              path={path.link}
            />
          ))}

          <Button
            variant="contained"
            sx={{
              width: "110px",
              height: "40px",
              borderRadius: "5px",
              display: { xs: "none", md: "block" },
            }}
          >
            Contact
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
