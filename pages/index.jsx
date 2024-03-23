import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import FeaturedProducts from "../components/FeaturedProducts";
import HeroSection from "../components/HeroSection"; // Import HeroSection

export default function Home() {
  return (
    <Box>
      <HeroSection /> {/* Add HeroSection here */}
      <Navbar />
      <Box sx={{ paddingTop: "50px" }}>
        <FeaturedProducts />
      </Box>
    </Box>
  );
}
