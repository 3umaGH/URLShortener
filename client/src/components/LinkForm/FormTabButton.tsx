import React from "react";
import { Box } from "@mui/material";
type FormTabButtonProps = {
  children: React.ReactNode;
  pageID: number;
  currentPage: number;
  pageSwitchCallback: (pageID: number) => void;
};

export const FormTabButton = ({
  children,
  pageID,
  currentPage,
  pageSwitchCallback,
}: FormTabButtonProps) => {
  return (
    <li onClick={() => pageSwitchCallback(pageID)}>
      <Box
        className={
          currentPage === pageID ? "formTabs button active" : "formTabs button"
        }
        sx={{ flexDirection: { xs: "column", md: "row" }, alignItems: {xs: "center", md:"baseline"} }}
      >
        {children}
      </Box>
    </li>
  );
};
