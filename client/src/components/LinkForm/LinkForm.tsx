import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import Slide from "@mui/material/Slide";

import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { FormTabButton } from "./FormTabButton";
import { useState } from "react";
import { ShortLink } from "./pages/ShortLink";
import { Analytics } from "./pages/Analytics";

export const LinkForm = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const formPages = [
    {
      id: 0,
      title: "Short Link",
      icon: <InsertLinkOutlinedIcon />,
      pageElement: <ShortLink />,
    },
    {
      id: 1,
      title: "Analytics",
      icon: <BarChartOutlinedIcon />,
      pageElement: <Analytics />,
    },
  ];

  const handlePageSwitch = (pageID: number) => {
    setCurrentPage(pageID);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Slide
        direction="down"
        in={true}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <Container>
          <ul className="formTabs">
            {formPages.map((page) => {
              return (
                <FormTabButton
                  pageID={page.id}
                  currentPage={currentPage}
                  pageSwitchCallback={handlePageSwitch}
                >
                  <Box className="icon centerTop" sx={{ mr: { xs: 0, md: 1 } }}>
                    {page.icon}
                  </Box>
                  <Typography variant="caption" fontSize={18}>
                    {page.title}
                  </Typography>
                </FormTabButton>
              );
            })}
          </ul>
          <Paper
            elevation={3}
            sx={{
              position: "relative",
              textAlign: "center",
              backgroundColor: "white",
              borderRadius: "10px",

              borderColor: "red",
              border: "solid 3px #c4c4c4",

              zIndex: 0,
            }}
          >
            <Container sx={{ p: 4 }}>
              <Grid container spacing={2}>
                {formPages[currentPage].pageElement}
              </Grid>
            </Container>
          </Paper>
        </Container>
      </Slide>
    </Box>
  );
};
