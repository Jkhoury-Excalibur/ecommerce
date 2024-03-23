import React, { useState, useEffect, useRef } from "react";
import { fetchProductsFromCollection } from "../utils/shopify";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  CardActionArea,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";

const CollectionProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await fetchProductsFromCollection(
          "10-and-under"
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (scrollOffset) => {
    carouselRef.current.scrollLeft += scrollOffset;
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Products from the "10 and under" Collection
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2, // Adjust the gap if needed to ensure shadows are visible
          overflow: "hidden", // Ensures the container itself doesn't clip the shadows
          padding: "20px", // Adds padding around the carousel for shadow visibility
        }}
      >
        <Button onClick={() => scroll(-200)}>
          <ArrowBackIosNewIcon />
        </Button>
        <Box
          ref={carouselRef}
          display="flex"
          overflow="auto"
          sx={{
            gap: 4, // Ensure there's enough space between cards for shadows to be visible
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {products.map((product, index) => (
            <Card
              key={index}
              raised // This should add elevation to the card
              sx={{
                maxWidth: "350px",
                margin: "0 10px", // Added margin to ensure shadows aren't clipped
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
                  size="small"
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
          ))}
        </Box>
        <Button onClick={() => scroll(200)}>
          <ArrowForwardIosIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default CollectionProducts;
