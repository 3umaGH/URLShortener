import { useState } from "react";

import {
  Button,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Tooltip,
  CircularProgress,
  Container,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ShortLinkList } from "../../ShortLinkList";
import { PayloadType } from "../LinkForm";
import { getShortLink } from "../../../api/Api";
import { AlertTimeoutProps } from "../../../constants";
import { AlertTimeout } from "../../AlertTimeout";
import {
  getSavedURLs,
  saveURLToLocalStorage,
} from "../../../utils/storageUtils";

type FormProps = {
  uuid: string;
};

export const ShortLinkListView = ({
  navigatePage,
  updatePayload,
}: {
  navigatePage: (pageID: number) => void;
  updatePayload: (newPayload: PayloadType) => void;
}) => {
  const [formData, setFormData] = useState<FormProps>({ uuid: "" });
  const [messageAlert, sendMessage] = useState<AlertTimeoutProps>();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    getShortLink(formData.uuid)
      .then((response) => {
        const shortLink = response.data.shortLink;
        const hasMatch = getSavedURLs().some(
          (row) => row.uuid === shortLink.id
        );

        if (hasMatch) {
          sendMessage({
            key: Date.now(),
            message: {
              severity: "warning",
              text: `${import.meta.env.VITE_APP_DOMAIN}${
                shortLink.URLSuffix
              } already exists!`,
              timeout: 6000,
            },
          });

          setSubmitting(false);
          setFormData({ uuid: "" });
          return;
        }

        saveURLToLocalStorage({
          originalURL: shortLink.originalURL,
          URLSuffix: shortLink.URLSuffix,
          uuid: shortLink.id,
        });

        sendMessage({
          key: Date.now(),
          message: {
            severity: "success",
            text: `Added ${import.meta.env.VITE_APP_DOMAIN}${
              shortLink.URLSuffix
            }`,
            timeout: 6000,
          },
        });

        setSubmitting(false);
      })
      .catch((error) => {
        const message = error.response.data.message ?? error.message;

        sendMessage({
          key: Date.now(),
          message: {
            severity: "error",
            text: message,
            timeout: 6000,
          },
        });

        setSubmitting(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value ? value : "", // If value is undefined, set prop to ""
    });
  };

  return (
    <Container disableGutters>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={0} sx={{ p: 2 }}>
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            {messageAlert && (
              <AlertTimeout
                key={messageAlert.key}
                message={messageAlert.message}
                sx={{ justifyContent: "center" }}
              />
            )}
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "left", mb:2 }}>
            <Typography variant="h4">
              <b>View link analytics</b>
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <ShortLinkList
              key={isSubmitting.toString()} // Using key to rerender the component when isSubmitting state updates.
              navigatePage={navigatePage}
              updatePayload={updatePayload}
            />
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "left", mt: 9 }}>
            <InputLabel htmlFor={"secret-key-field"} >
              <b>Paste secret key</b>{" "}
              <Tooltip
                arrow
                enterTouchDelay={0}
                title="If someone has provided you with their private link key, you can import it here to access link analytics."
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
          </Grid>

          <Grid item xs={12} sm={10} sx={{ textAlign: "left" }}>
            <TextField
              required
              inputProps={{
                minLength: 36,
                maxLength: 36,
              }}
              id="secret-key-field"
              name="uuid"
              value={formData.uuid}
              placeholder="Example: 550e8400-e29b-41d4-a716-446655440000"
              variant="outlined"
              onChange={handleChange}
              sx={{ width: "98%" }}
            />
          </Grid>
          <Grid item xs={12} sm={2} sx={{ textAlign: "left"}}>
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "100%", p: 1.95 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={25} sx={{ color: "white" }} />
              ) : (
                "Add"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
