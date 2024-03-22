import React from "react";
import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Box sx={{ paddingTop: "50px" }}>
        <FeaturedProducts />
      </Box>
    </Box>
  );
}
