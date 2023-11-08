import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import Slide from "@mui/material/Slide";

import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { FormTabButton } from "./FormTabButton";
import { useState } from "react";
import { ShortLink } from "./pages/ShortLink";
import { Analytics } from "./pages/Analytics";
import { PageStats } from "./pages/PageStats";

export const LinkForm = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const navigatePage = (pageID: number) => {
    setCurrentPage(pageID);
  };

  type VisiblePageProps = {
    visible: true;
    id: number;
    title: string;
    icon: JSX.Element;
    pageElement: JSX.Element;
  };

  type HiddenPageProps = {
    visible: false;
    id: number;
    pageElement: JSX.Element;
  };

  type FormPageProps = VisiblePageProps | HiddenPageProps;

  const formPages: FormPageProps[] = [
    {
      id: 0,
      title: "Short Link",
      visible: true,
      icon: <InsertLinkOutlinedIcon />,
      pageElement: <ShortLink />,
    },
    {
      id: 1,
      title: "Analytics",
      visible: true,
      icon: <BarChartOutlinedIcon />,
      pageElement: <Analytics navigatePage={navigatePage} />,
    },
    {
      id: 2,
      visible: false,
      pageElement: <PageStats />,
    },
  ];

  return (
    <Box sx={{ textAlign: "center", mb:15 }}>
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
              if (page.visible)
                return (
                  <FormTabButton
                    key={page.id}
                    pageID={page.id}
                    currentPage={currentPage}
                    pageSwitchCallback={navigatePage}
                  >
                    <Box
                      className="icon centerTop"
                      sx={{ mr: { xs: 0, md: 1 } }}
                    >
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
