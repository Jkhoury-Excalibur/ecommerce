import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
  CardActionArea,
  Paper,
} from "@mui/material";
import Image from "next/image";

function Example() {
  const items = [
    {
      name: "Product #1",
      description: "Another random thing you have never seen before!",
      imageUrl: "/Logo.png", // Make sure to use valid image URLs
    },
    {
      name: "Product #2",
      description: "Another random thing you have never seen before!",
      imageUrl: "/Logo.png",
    },
    {
      name: "Product #3",
      description: "Another random thing you have never seen before!",
      imageUrl: "/Logo.png",
    },
    {
      name: "Product #4",
      description: "Another random thing you have never seen before!",
      imageUrl: "/Logo.png",
    },
    {
      name: "Product #5",
      description: "Another random thing you have never seen before!",
      imageUrl: "/Logo.png",
    },
    {
      name: "Product #6",
      description: "Another random thing you have never seen before!",
      imageUrl: "/Logo.png",
    },
    // Add more items here...
  ];

  const useResponsiveCards = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3; // Default to 3 cards for larger screens
  };

  const visibleCards = useResponsiveCards();
  const totalSlides = Math.ceil(items.length / visibleCards);

  return (
    <Carousel
      animation="fade"
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
    >
      {Array.from({ length: totalSlides }).map((_, slideIndex) => (
        <ItemGroup
          key={slideIndex}
          items={items.slice(
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
        gap: 6,
        padding: "20px",
      }}
    >
      {items.map((item, index) => (
        <Card
          raised
          sx={{
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            maxWidth: "400px",
            MinHeight: "400px",
            "&:hover": { boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)" },
          }}
        >
          <CardContent>
            <Image
              src={item.imageUrl}
              alt={item.name}
              layout="responsive"
              width={500}
              height={300}
              objectFit="contain"
            />
          </CardContent>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#1661C2", fontSize: "24px" }}
            >
              {item.description}
            </Typography>
          </CardContent>
          <CardActionArea
            sx={{ justifyContent: "center", p: 0, borderRadius: 0 }}
          >
            <Button
              size="large"
              fullWidth
              variant="contained"
              sx={{
                width: "100%",
                height: "100%",
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
