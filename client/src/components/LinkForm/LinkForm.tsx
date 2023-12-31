import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import {
  InsertLinkOutlined as InsertLinkOutlinedIcon,
  BarChartOutlined as BarChartOutlinedIcon,
} from "@mui/icons-material";
import { FormTabButton } from "./FormTabButton";
import { useState } from "react";
import { LINKFORM_PAGES } from "../../constants";

import { ShortLinkCreateView } from "./pages/ShortLinkCreateView";
import { ShortLinkListView } from "./pages/ShortLinkListView";
import { ShortLinkStatsView } from "./pages/ShortLinkStatsView";
import { NewCreatedLinkView } from "./pages/NewCreatedLinkView";

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

export type PayloadType<T = Record<string, unknown>> = T;

export const LinkForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [payload, setPayload] = useState<PayloadType>({}); // Used to move data between pages

  const navigatePage = (pageID: number) => {
    setCurrentPage(pageID);
  };

  const handlePayloadChange = (newPayload: PayloadType) => {
    setPayload(newPayload);
  };

  const formPages: FormPageProps[] = [
    {
      id: LINKFORM_PAGES.MAIN_PAGE,
      title: "Short Link",
      visible: true,
      icon: <InsertLinkOutlinedIcon />,
      pageElement: (
        <ShortLinkCreateView
          navigatePage={navigatePage}
          updatePayload={handlePayloadChange}
        />
      ),
    },
    {
      id: LINKFORM_PAGES.LINK_LIST,
      title: "Analytics",
      visible: true,
      icon: <BarChartOutlinedIcon />,
      pageElement: (
        <ShortLinkListView
          navigatePage={navigatePage}
          updatePayload={handlePayloadChange}
        />
      ),
    },
    {
      id: LINKFORM_PAGES.LINK_CREATED,
      visible: false,
      pageElement: <NewCreatedLinkView navigatePage={navigatePage} payload={payload} />,
    },
    {
      id: LINKFORM_PAGES.LINK_DETAILS,
      visible: false,
      pageElement: <ShortLinkStatsView navigatePage={navigatePage} payload={payload} />,
    },
  ];

  return (
    <Box sx={{ textAlign: "center", mb: 15}}>
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
              minHeight: "550px",
              zIndex: 0,
            }}
          >
            <Container sx={{ p: {xs: 1, md:4} }}>
              <Grid container spacing={0}>
                {formPages.find((page) => page.id === currentPage)?.pageElement}
              </Grid>
            </Container>
          </Paper>
        </Container>
      </Slide>
    </Box>
  );
};
