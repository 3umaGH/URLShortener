import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { NavigationButton } from "./NavigationButton";

export const NavigationMenu = () => {
  return (
    <Container disableGutters sx={{ mt: -1 }}>
      <AppBar
        position="static"
        sx={{
          m: 0,
          backgroundColor: "rgba(0,0,0,0.0)",
          color: "#4a4a4a",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{display:"flex", justifyContent: "space-evenly"}}>
          <Box sx={{ maxWidth: "5%", minWidth: "120px" }}>
            <img
              src="https://images.squarespace-cdn.com/content/v1/5cd90f9a81551228736aaa01/1559565680227-38K8XVENP2S8KOR7GP2Z/placeholder.com-logo1.png?format=2500w"
              alt="Logo"
              width="100%"
            ></img>
          </Box>
          <NavigationButton title="Products" path="/" />
          <NavigationButton title="View Analytics" path="/" />

          
        </Toolbar>
      </AppBar>
    </Container>
  );
};
