import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { Tip } from "../../Tip";
import { AnalyticsGrid } from "../../AnalyticsGrid";

export const Analytics = () => {
  return (
    <>
      <Grid item xs={12} sx={{ textAlign: "left" }}>
        <Typography variant="h4">
          <b>View link analytics</b>
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ textAlign: "center" }}>
      <AnalyticsGrid />
        {/*<List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
          }}
        >
          {[1, 2, 3].map((num) => {
            return (
              <ListItemButton key={num} disableGutters>
                <Typography variant="subtitle1" sx={{ width: "100%" }}>
                  <ListItemText
                    primary="https://short.ly/my-portfolio-link"
                    secondary="https://somelonglink.com/portfolio/id/14/523534/public"
                    sx={{
                      wordBreak: "break-all",
                      textAlign: "center",
                    }}
                  />
                  <Divider />
                </Typography>
              </ListItemButton>
            );
          })}
        </List>*/}
      </Grid>

      <Grid item xs={12} sx={{ textAlign: "left" }}>
        <InputLabel htmlFor={"secret-key-field"} sx={{ mb: 1 }}>
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
        <Grid item xs={12} sx={{ textAlign: "left" }}>

          <TextField
            id="secret-key-field"
            placeholder="Example: 550e8400-e29b-41d4-a716-446655440000"
            variant="outlined"
            sx={{width:"80%"}}
            />
          <Button
            variant="contained"
            sx={{ width: "19%", p: 1.95, ml: 1 }}
            color="secondary"
          >
            Add Link
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
