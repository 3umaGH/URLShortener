import { Container, Box, Button, Typography } from "@mui/material";

export const PromoSection = () => {
  return (
    <Container
      maxWidth={false}
      className="promo-section"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box>
        <Typography
          variant="h3"
          sx={{ padding: 2, fontSize: { xs: 36, md: 48 } }}
        >
          <b>More than a free link shortener</b>
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            py: { xs: 2, md: 4 },
            px: { xs: 3, md: 6 },
            fontSize: { xs: 16, sm: 20, md: 26 },
            mt: 5,
          }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};
