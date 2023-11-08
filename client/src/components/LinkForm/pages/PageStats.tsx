import { Button, Grid, Typography, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const PageStats = () => {
  const linkClicks = 16;

  return (
    <>
      <Grid item xs={12} sx={{ textAlign: "left" }}>
        <Typography variant="h4">
          <b>Link Statistics</b>
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ my: 2 }}>
        <Typography variant="h6">Total Link Clicks:</Typography>
        <Typography
          className="analytics-total-link-clicks-label"
          variant="h3"
          sx={{ display: "inline-block", py: 2, px: 2.5, mt: 1 }}
        >
          {linkClicks}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h6" style={{ display: "inline-block" }}>
          Top Refferals
        </Typography>
        <Tooltip
          arrow
          enterTouchDelay={0}
          title="Insight into Sources: Discover where clicks originate, guiding marketing strategies towards effective channels."
        >
          <InfoOutlinedIcon
            fontSize="small"
            sx={{
              color: "gray",
              ml: 0.5,
            }}
          />
        </Tooltip>
        <TableContainer component={Paper} sx={{ mt: 1 }}>
          <Table sx={{ minWidth: "100%" }} aria-label="refferals">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "75%" }} align="left">
                  Refferal
                </TableCell>
                <TableCell sx={{ width: "15%" }} align="center">
                  Clicks
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  https://www.youtube.com/watch?v=dQw4w9WgXcQ
                </TableCell>
                <TableCell align="center">
                  <b>158</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  https://en.wikipedia.org/wiki/Philosophy
                </TableCell>
                <TableCell align="center">
                  <b>18</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  https://m.youtube.com/watch?v=jQ41Gk80djs
                </TableCell>
                <TableCell align="center">
                  <b>8</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">about:info</TableCell>
                <TableCell align="center">
                  <b>3</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">
                  https://www.unicef.org/education
                </TableCell>
                <TableCell align="center">
                  <b>1</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h6" style={{ display: "inline-block" }}>
          Top Countries
        </Typography>
        <Tooltip
          arrow
          enterTouchDelay={0}
          title="Geographic Reach: Understand user locations for tailored content and targeted campaigns."
        >
          <InfoOutlinedIcon
            fontSize="small"
            sx={{
              color: "gray",
              ml: 0.5,
            }}
          />
        </Tooltip>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} aria-label="refferals">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "75%" }} align="left">
                  Contry
                </TableCell>
                <TableCell sx={{ width: "15%" }} align="center">
                  Clicks
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">USA</TableCell>
                <TableCell align="center">
                  <b>158</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">England</TableCell>
                <TableCell align="center">
                  <b>18</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Australia</TableCell>
                <TableCell align="center">
                  <b>8</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Estonia</TableCell>
                <TableCell align="center">
                  <b>3</b>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Zimbabwe</TableCell>
                <TableCell align="center">
                  <b>1</b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="error" sx={{ mt: 1 }}>
          Delete Link
        </Button>
      </Grid>
    </>
  );
};
