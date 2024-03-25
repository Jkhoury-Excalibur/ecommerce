import React from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import FeaturedProducts from "../components/FeaturedProducts";
import HeroSection from "../components/HeroSection"; // Import HeroSection
import CollectionProducts from "@/components/CollectionSections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Box sx={{ paddingTop: "30px" }}>
        <HeroSection /> {/* Add HeroSection here */}
        <Box sx={{ paddingTop: "50px" }}>
          <FeaturedProducts />
        </Box>
        <Box sx={{ padding: "20px" }}>
          <CollectionProducts />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
