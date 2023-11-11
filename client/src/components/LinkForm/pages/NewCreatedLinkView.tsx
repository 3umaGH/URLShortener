import {
  Button,
  Container,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { PayloadType } from "../LinkForm";
import { useState } from "react";
import { LINKFORM_PAGES } from "../../../constants";

export const NewCreatedLinkView = ({
  navigatePage,
  payload = {},
}: {
  navigatePage: (pageID: number) => void;
  payload?: PayloadType;
}) => {
  const { URLSuffix, uuid } = payload ?? {};
  const [isSecretVisible, setSecretVisible] = useState(false);

  return (
    <>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h3" sx={{ my: 2, fontSize: { xs: 32, md: 58 } }}>
          <b>
            Your <span style={{ color: "#3477eb" }}>new link</span> is ready!
          </b>
        </Typography>
        <a className="urlLink" href="#">
          {import.meta.env.VITE_APP_API}/{(URLSuffix as string) ?? "N/A"}
        </a>
      </Grid>

      <Grid item xs={12} sx={{ mt: 2.5 }}>
        <Typography variant="h6" sx={{ fontSize: { xs: 16, md: 26 } }}>
          Share it seamlessly and stay informed with detailed link statistics.
          <br />
          Streamline your online experience today!
        </Typography>
        <Divider sx={{ mt: 5 }} />
      </Grid>

      <Grid item xs={12} sx={{ textAlign: "center", mt: 5 }}>
        <Container>
          <InputLabel htmlFor={"secret-key-field"}>
            <Typography variant="body1">
              <b>Links Secret Key</b>
            </Typography>
            <Tooltip
              arrow
              enterTouchDelay={0}
              title="You can share this secret key to other people in order for them to have access to statistics or be able to delete link."
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

          {isSecretVisible && (
            <TextField
              id="secret-key-field"
              disabled
              value={(uuid as string) ?? "N/A"}
              variant="outlined"
              sx={{ width: "100%", color: "red", my: 2 }}
              inputProps={{
                sx: {
                  textAlign: "center",
                  "&::placeholder": {},
                },
              }}
            />
          )}

          <Button
            variant={isSecretVisible ? "outlined" : "text"}
            color="warning"
            onClick={() => setSecretVisible(!isSecretVisible)}
            sx={{ mt: 1 }}
          >
            {isSecretVisible ? "Hide Me" : "Show me"}
          </Button>
        </Container>

        <Button
          variant="outlined"
          sx={{ mt: 7.5, fontSize: 25 }}
          onClick={() => navigatePage(LINKFORM_PAGES.MAIN_PAGE)}
        >
          Go Back
        </Button>
      </Grid>
    </>
  );
};
