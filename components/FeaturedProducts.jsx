import React, { useState, useEffect } from "react";
import { fetchProducts } from "../utils/shopify";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  useTheme,
  CardActionArea,
  Button,
  useMediaQuery,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";

function Example() {
  const [products, setProducts] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  const useResponsiveCards = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

    return isMobile ? 1 : isTablet ? 2 : 3;
  };

  const visibleCards = useResponsiveCards();
  const totalSlides = Math.ceil(products.length / visibleCards);

  return (
    <Carousel
      animation="fade"
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      interval={6000}
      indicators={false} // Add this line to hide the dots
      navButtonsProps={{
        style: {
          backgroundColor: "#0000000c",
          borderRadius: 0,
          color: "black",
          height: "300px",
          width: "25px",
        },
      }}
      navButtonsWrapperProps={{
        style: {
          padding: "0px",
          top: "calc(50% - 325px)",
        },
      }}
    >
      {Array.from({ length: totalSlides }).map((_, slideIndex) => (
        <ItemGroup
          key={slideIndex}
          items={products.slice(
            slideIndex * visibleCards,
            (slideIndex + 1) * visibleCards
          )}
        />
      ))}
    </Carousel>
  );
}

function ItemGroup({ items }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: "20px",
      }}
    >
      {items.map((item, index) => (
        <Card
          key={index}
          raised
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            maxWidth: "350px",
            minHeight: "350px",
            "&:hover": { boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)" },
          }}
        >
          <Image
            src={item.imageUrl}
            alt={item.name}
            layout="responsive"
            width={400}
            height={300}
            objectFit="cover"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            {/* Display the price */}
            <Typography variant="body2" color="text.secondary">
              Price: {item.minVariantPrice.amount}{" "}
              {item.minVariantPrice.currencyCode}
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
      ))}
    </Box>
  );
}

export default Example;
