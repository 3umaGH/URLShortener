import { useState, useEffect } from "react";
import { Button, Grid, Typography, Tooltip } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { PayloadType } from "../LinkForm";
import axios, { AxiosResponse } from "axios";

type Referral = {
  referralUrl: string;
  count: number;
};

type Country = {
  country: string;
  count: number;
};

type URLDetailsType = {
  id: string;
  originalURL: string;
  URLSuffix: string;
  totalClicks: number;
  referrals: Referral[];
  countries: Country[];
  dateCreated: string;
};

export const PageStats = ({ payload = {} }: { payload?: PayloadType }) => {
  const [pageStatistics, setPageStatistics] = useState<URLDetailsType>();
  const { uuid } = payload ?? {};

  useEffect(() => {
    const fetch = async () => {
      axios
        .get(`${import.meta.env.VITE_APP_API}/action/${uuid}`)
        .then((response: AxiosResponse) => {
          const apiResponse: URLDetailsType = response.data.shortLink;

          if (apiResponse && response.data.message === "OK") {
            setPageStatistics(apiResponse);
          } else {
            //TODO: Error handling
          }
        });
    };

    if (!pageStatistics) fetch();
  }, [pageStatistics, uuid]);

  return (
    <>
      {pageStatistics && (
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
              {pageStatistics.totalClicks}
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
                  {pageStatistics.referrals.map((refer) => (
                    <TableRow key={refer.referralUrl}>
                      <TableCell align="left">{refer.referralUrl}</TableCell>
                      <TableCell align="center">
                        <b>{refer.count}</b>
                      </TableCell>
                    </TableRow>
                  ))}
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
            <TableContainer component={Paper} sx={{ mt: 1 }}>
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
                  {pageStatistics.countries.map((country) => (
                    <TableRow key={country.country}>
                      <TableCell align="left">{country.country}</TableCell>
                      <TableCell align="center">
                        <b>{country.count}</b>
                      </TableCell>
                    </TableRow>
                  ))}
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
      )}
    </>
  );
};
