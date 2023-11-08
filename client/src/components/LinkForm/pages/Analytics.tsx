import { Button, Grid, TextField, InputLabel, Typography } from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Tip } from "../../Tip";
import { AnalyticsGrid } from "../../AnalyticsLinkGrid";

export const Analytics = ({
  navigatePage,
}: {
  navigatePage: (pageID: number) => void;
}) => {
  return (
    <>
      <Grid item xs={12} sx={{ textAlign: "left" }}>
        <Typography variant="h4">
          <b>View link analytics</b>
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <AnalyticsGrid navigatePage={navigatePage}/>
      </Grid>

      <Grid item xs={12} sx={{ textAlign: "left" }}>
        <InputLabel htmlFor={"secret-key-field"} sx={{ mb: -1 }}>
          <b>Paste secret key</b>{" "}
          <Tip text="If someone has provided you with their private link key, you can import it here to access link analytics.">
            <InfoOutlinedIcon
              className="icon centerTop"
              fontSize="small"
              sx={{
                color: "gray",
              }}
            />
          </Tip>
        </InputLabel>
      </Grid>

      <Grid item xs={12} sm={10} sx={{ textAlign: "left" }}>
        <TextField
          id="secret-key-field"
          placeholder="Example: 550e8400-e29b-41d4-a716-446655440000"
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={12} sm={2} sx={{ textAlign: "left" }}>
        <Button
          variant="contained"
          sx={{ width: "100%", p: 1.95 }}
          color="secondary"
        >
          Add Link
        </Button>
      </Grid>
    </>
  );
};
