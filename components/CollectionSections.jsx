import React, { useState, useEffect, useRef } from "react";
import { fetchProductsFromCollection } from "../utils/shopify";
import { Typography, Box } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Make sure to import the CSS for styling
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./card"; // Ensure the correct path

// Custom Next Arrow
// Custom Next Arrow
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

// Custom Prev Arrow
function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

const CollectionProductsCustomCarousel = () => {
  // Hardcoded mock products
  const mockProducts = Array.from({ length: 16 }, (_, index) => ({
    imageUrl: `https://via.placeholder.com/250?text=Product+${index + 1}`,
    name: `Product ${index + 1}`,
    minVariantPrice: {
      amount: `${(Math.random() * 100).toFixed(2)}`,
      currencyCode: "USD",
    },
  }));

  // const CollectionProductsCustomCarousel = () => {
  //   const [products, setProducts] = useState([]);
  //   const slider = useRef(null);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         const fetchedProducts = await fetchProductsFromCollection(
  //           "10-and-under"
  //         );
  //         setProducts(fetchedProducts);
  //       } catch (error) {
  //         console.error("Failed to fetch products:", error);
  //       }
  //     };

  //     fetchProducts();
  //   }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
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
        {mockProducts.map((product, index) => (
          <Box key={index} sx={{ padding: "10px", width: "100%" }}>
            <ProductCard
              product={{
                productImage: product.imageUrl,
                productName: product.name,
                productDescription: product.description,
                price: {
                  amount: product.minVariantPrice.amount,
                  currencyCode: product.minVariantPrice.currencyCode,
                },
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CollectionProductsCustomCarousel;
