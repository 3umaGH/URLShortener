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

export const LinkForm = () => {
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
          <Paper
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
                      fontSize="small"
                      sx={{
                        color: "gray",
                        position: "relative",
                        top: "2px",
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
                        fontSize="small"
                        sx={{
                          color: "#65e6e6",
                          position: "relative",
                          top: "4px",
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
                        fontSize="medium"
                        sx={{
                          color: "#2870f7",
                          position: "relative",
                          top: "4px",
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
                        fontSize="medium"
                        sx={{
                          color: "#2870f7",
                          position: "relative",
                          top: "4px",
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
