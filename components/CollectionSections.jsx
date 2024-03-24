import React, { useState, useEffect } from "react";
import { fetchProductsFromCollection } from "../utils/shopify";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  CardActionArea,
} from "@mui/material";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const CollectionProductsCustomCarousel = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const slidesToShow = isMobile ? 1 : isTablet ? 2 : 4;
  const gap = 16; // Adjust the gap size as needed

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await fetchProductsFromCollection(
          "10-and-under"
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleNext = () => {
    setStartIndex((prevIndex) => {
      let nextIndex = prevIndex + 1;
      const maxStartIndex = products.length - slidesToShow;
      if (nextIndex > maxStartIndex) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      const maxStartIndex = products.length - slidesToShow;
      if (newIndex < 0) {
        newIndex = maxStartIndex;
      }
      return newIndex;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        margin: "auto",
        padding: "20px",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          margin: "auto",
          padding: "20px",
          margin: "auto",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Products from the "10 and under" Collection
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: isMobile ? "initial" : "auto", // Apply 'margin: auto' only on non-mobile devices
        }}
      >
        <Button onClick={handlePrev}>
          <ArrowBackIosIcon />
        </Button>
        <Box
          sx={{
            overflow: "hidden",
            width: `100%`, // Full width of the container
            display: "flex",
            marginLeft: `${gap}px`, // Consistent gap
            marginRight: `${gap}px`, // Consistent gap
          }}
        >
          <Box
            sx={{
              display: "flex",
              transition: "transform 0.5s ease",
              transform: `translateX(-${(100 / slidesToShow) * startIndex}%)`, // Adjust based on the visible slides and current index
            }}
          >
            {products.map((product, index) => (
              <Box
                key={index}
                sx={{
                  width: `calc(${100 / slidesToShow}% - ${gap}px)`, // Width based on slidesToShow
                  flexShrink: 0, // Prevent flexbox from shrinking items
                  padding: `0 ${gap / 2}px`, // Half gap on each side for spacing
                }}
              >
                <Card
                  raised
                  sx={{
                    maxWidth: "200px", // Ensure card doesn't overflow its container
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    "&:hover": { boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)" },
                  }}
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="responsive"
                    width={400}
                    height={300}
                    objectFit="cover"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    {/* Display the price */}
                    <Typography variant="body2" color="text.secondary">
                      Price: {product.minVariantPrice.amount}{" "}
                      {product.minVariantPrice.currencyCode}
                    </Typography>
                  </CardContent>
                  <CardActionArea sx={{ borderRadius: 0 }}>
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      sx={{
                        width: "100%",
                        borderRadius: 0,
                        fontWeight: "bold",
                        backgroundColor: "#1661C2",
                        "&:hover": { backgroundColor: "orangered" },
                      }}
                    >
                      View Item
                    </Button>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
        <Button onClick={handleNext}>
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default CollectionProductsCustomCarousel;
