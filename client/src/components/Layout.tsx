import { Box } from "@mui/material";
import { NavigationMenu } from "./NavigationBar/NavigationMenu";
import { Footer } from "./Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ backgroundColor: "#f7f7f7", textAlign: "center" }}>
      <NavigationMenu />
      {children}
      <Footer />
    </Box>
  );
};
