import React from "react";
import { Box } from "@mui/material";
import { NavigationMenu } from "./NavigationMenu";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ backgroundColor: "#f7f7f7", textAlign: "center" }}>
      <NavigationMenu/>
      {children}
      <h2>Footer</h2>
    </Box>
  );
};
