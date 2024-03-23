// HeroSection.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "10vh", // Adjust based on your preference
        backgroundImage: `url('/path-to-your-hero-image.jpg')`, // Add your hero image
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="p" gutterBottom>
        Banner here
      </Typography>
    </Box>
  );
};

export default HeroSection;
