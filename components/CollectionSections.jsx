import React, { useState, useEffect } from "react";
import { fetchProductsFromCollection } from "../utils/shopify";
import { Typography, Card, CardContent, Button, Box } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";

const CollectionProductsCustomCarousel = () => {
  const [products, setProducts] = useState([]);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: "20px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Products from the "10 and under" Collection
      </Typography>
      <Slider {...settings}>
        {products.map((product, index) => (
          <Box key={index} sx={{ padding: "10px" }}>
            <Card raised sx={{ maxWidth: "250px", minHeight: "200px" }}>
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
                <Typography variant="body2" color="text.secondary">
                  Price: {product.minVariantPrice.amount}{" "}
                  {product.minVariantPrice.currencyCode}
                </Typography>
              </CardContent>
              <Button size="large" fullWidth variant="contained">
                View Item
              </Button>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CollectionProductsCustomCarousel;
