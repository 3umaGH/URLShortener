import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Lock as LockIcon,
  AutoAwesome as AutoAwesomeIcon,
  InfoOutlined as InfoOutlinedIcon,
  CheckCircleOutlined as CheckCircleOutlinedIcon,
} from "@mui/icons-material";
import axios, { AxiosResponse, AxiosError } from "axios";
import { AlertTimeout } from "../../AlertTimeout";
import { AlertTimeoutProps, LINKFORM_PAGES } from "../../../constants";
import { PayloadType } from "../LinkForm";
import { saveURLToLocalStorage } from "../../../utils/storageUtils";

export const ShortLinkCreateView = ({
  navigatePage,
  updatePayload,
}: {
  navigatePage: (pageID: number) => void;
  updatePayload: (newPayload: PayloadType) => void;
}) => {
  const [formData, setFormData] = useState({});
  const [messageAlert, sendMessage] = useState<AlertTimeoutProps>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_APP_API}/action`, formData)
      .then((response: AxiosResponse) => {
        if (response.data.message === "OK") {
          updatePayload({
            originalURL: response.data.originalURL,
            URLSuffix: response.data.shortLink,
            uuid: response.data.uuid,
          });
          navigatePage(LINKFORM_PAGES.LINK_CREATED);

          saveURLToLocalStorage({
            originalURL: response.data.originalURL,
            URLSuffix: response.data.shortLink,
            uuid: response.data.uuid,
          });
        }
      })

      .catch((error: AxiosError) => {
        const errorMessage =
          (error.response?.data as { message?: string })?.message ||
          "Unknown error";

        sendMessage({ key:Date.now(), severity: "error", text: errorMessage, timeout: 3000 });
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {messageAlert && (
        <AlertTimeout
          key={messageAlert.key}
          message={messageAlert}
        />
      )}

      <Grid container spacing={2} sx={{ p: 2 }}>
        {/*Wrapping in form breaks grid, so adding a new grid container here*/}
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          <Typography variant="h4">
            <b>Shorten a long link</b>
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "left" }}>
          <InputLabel htmlFor={"long-link-field"} sx={{ mb: 1 }}>
            <b>Paste a long URL</b>
          </InputLabel>
          <TextField
            fullWidth
            id="long-link-field"
            name="originalURL"
            placeholder="Example: http://super-long-link.com/shorten-it"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={11} md={4} sx={{ textAlign: "left" }}>
          <InputLabel htmlFor={"domain-link-field"} sx={{ mb: 1 }}>
            <b>Domain</b>
          </InputLabel>
          <TextField
            disabled
            fullWidth
            id="domain-link-field"
            value={import.meta.env.VITE_APP_API}
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
          <InputLabel htmlFor={"back-half-field"} sx={{ mb: 0.5 }}>
            <b>Enter a back-half</b> (optional){" "}
            <Tooltip
              arrow
              enterTouchDelay={0}
              title={`Add your own words at the end of a link (e.g., “${
                import.meta.env.VITE_APP_API
              }/twitter_bits” instead of “${
                import.meta.env.VITE_APP_API
              }/2ZonlUz”)`}
            >
              <InfoOutlinedIcon
                className="icon centerTop"
                fontSize="small"
                sx={{
                  color: "gray",
                }}
              />
            </Tooltip>
          </InputLabel>
          <TextField
            fullWidth
            id="back-half-field"
            name="shortURLPath"
            placeholder="example: my-photo-gallery"
            variant="outlined"
            onChange={handleChange}
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
            type="submit"
            variant="contained"
            sx={{ width: "100%", p: 1.5, px: 4 }}
          >
            Make your link short
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
    </form>
  );
};
