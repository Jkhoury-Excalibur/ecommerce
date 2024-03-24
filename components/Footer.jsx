import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "#f3f3f3", padding: "20px 0", marginTop: "auto" }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" align="center" gutterBottom>
            Quick Links
          </Typography>
          {/* These links should be replaced with your actual page links */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="8px"
          >
            <Link href="#" variant="body1">
              About Us
            </Link>
            <Link href="#" variant="body1">
              Contact
            </Link>
            <Link href="#" variant="body1">
              Privacy Policy
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" align="center" gutterBottom>
            Contact
          </Typography>
          {/* Update this with your actual contact information */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="8px"
          >
            <Typography variant="body1">Email: contact@example.com</Typography>
            <Typography variant="body1">Phone: +1 234 567 890</Typography>
          </Box>
        </Grid>
        {/* You can add more sections here such as social media links */}
      </Grid>
      <Typography variant="body2" color="text.secondary" align="center" mt={3}>
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
