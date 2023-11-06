import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Slide from "@mui/material/Slide";

import LockIcon from "@mui/icons-material/Lock";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import { FormTabButton } from "./FormTabButton";
import { useState } from "react";

export const LinkForm = () => {
  const [currentPage, setCurrentPage] = useState(0);

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
            <FormTabButton
              pageID={0}
              currentPage={currentPage}
              pageSwitchCallback={handlePageSwitch}
            >
              <InsertLinkOutlinedIcon
                className="icon centerTop"
                sx={{ mr: 1 }}
              />
              <Typography variant="caption" fontSize={18}>
                Short link
              </Typography>
            </FormTabButton>

            <FormTabButton
              pageID={1}
              currentPage={currentPage}
              pageSwitchCallback={handlePageSwitch}
            >
              <BarChartOutlinedIcon className="icon centerTop" sx={{ mr: 1 }} />
              <Typography variant="caption" fontSize={18}>
                Analytics
              </Typography>
            </FormTabButton>

          </ul>
          <Paper
            className="linkForm"
            elevation={3}
            sx={{
              textAlign: "center",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            <Container sx={{ p: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: "left" }}>
                  <Typography variant="h4">
                    <b>Shorten a long link</b>
                  </Typography>
                </Grid>

                <Grid item xs={12} sx={{ textAlign: "left" }}>
                  <InputLabel htmlFor={"long-link-field"}>
                    <b>Paste a long URL</b>
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="long-link-field"
                    placeholder="Example: http://super-long-link.com/shorten-it"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={11} md={4} sx={{ textAlign: "left" }}>
                  <InputLabel htmlFor={"domain-link-field"}>
                    <b>Domain</b>
                  </InputLabel>
                  <TextField
                    disabled
                    fullWidth
                    id="domain-link-field"
                    value="short.ly"
                    variant="outlined"
                    sx={{ backgroundColor: "#f2f2f2", borderRadius: 1 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={0.5} sx={{ textAlign: "center", mt: 4 }}>
                  <Typography variant="h5">/</Typography>
                </Grid>
                <Grid item xs={11.5} md={7.5} sx={{ textAlign: "left" }}>
                  <InputLabel htmlFor={"back-half-field"}>
                    <b>Enter a back-half</b> (optional){" "}
                    <InfoOutlinedIcon
                      className="icon centerTop"
                      fontSize="small"
                      sx={{
                        color: "gray",
                      }}
                    />
                  </InputLabel>
                  <TextField
                    fullWidth
                    id="back-half-field"
                    placeholder="example: my-photo-gallery"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "left" }}>
                  <Box sx={{ backgroundColor: "#ecfdff", padding: 1.5 }}>
                    <Typography variant="subtitle1" sx={{ color: "#007c8c" }}>
                      <AutoAwesomeIcon
                        className="icon centerTop"
                        fontSize="small"
                        sx={{
                          color: "#65e6e6",
                          mr: 1,
                        }}
                      />
                      End your link with words that will make it unique
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3.5} sx={{ textAlign: "left" }}>
                  <Button
                    variant="contained"
                    sx={{ width: "100%", p: 1.5, px: 4 }}
                  >
                    Sign up and get your link
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h6">
                    <b>No registration required. Your free plan includes:</b>
                  </Typography>

                  <ul
                    style={{
                      padding: 0,
                      margin: 0,
                      listStyleType: "none",
                    }}
                  >
                    <li style={{ display: "inline-block", marginRight: "8px" }}>
                      <CheckCircleOutlinedIcon
                        className="icon centerTop"
                        fontSize="medium"
                        sx={{
                          color: "#2870f7",
                          mr: 1,
                        }}
                      />
                      Short links
                    </li>
                    <li
                      style={{
                        display: "inline-block",
                        marginRight: "8px",
                        marginLeft: "18px",
                      }}
                    >
                      <CheckCircleOutlinedIcon
                        className="icon centerTop"
                        fontSize="medium"
                        sx={{
                          color: "#2870f7",
                          mr: 1,
                        }}
                      />
                      Link analytics
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Container>
      </Slide>
    </Box>
  );
};
