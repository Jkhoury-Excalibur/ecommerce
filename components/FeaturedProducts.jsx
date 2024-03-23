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
      NextIcon=">" // Example to customize the icon
      PrevIcon="<"
      navButtonsProps={{
        className: "", // Apply a common class if needed
        style: { backgroundColor: "#1661C2", borderRadius: 0 },
      }}
      navButtonsWrapperProps={{
        style: { bottom: "50px" },
      }}
      // Apply custom classes to individual buttons
      navButtonProps={{
        prev: {
          className: "carouselNavButtonPrev",
        },
        next: {
          className: "carouselNavButtonNext",
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
