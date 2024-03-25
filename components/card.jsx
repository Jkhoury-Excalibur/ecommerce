import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const CardInfo = styled(CardContent)(({ theme }) => ({
  flexGrow: 1, // Allow this component to expand
  "&:last-child": {
    paddingBottom: theme.spacing(2),
  },
}));

const ProductCard = ({ product }) => {
  // Log the product description to see if it's being passed correctly
  console.log("Product Description:", product.description);

  return (
    <Card
      elevation={4}
      sx={{
        maxWidth: 250,
        minHeight: 275,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "auto",
            maxWidth: "100%",
            maxHeight: 150,
            objectFit: "contain",
          }}
          image={product.productImage}
          alt={product.productName}
        />
      </Box>
      <CardInfo>
        <Typography variant="h6" gutterBottom component="div">
          {product.productName}
        </Typography>
        {/* Directly render the description */}
        <Typography mb={0} variant="subtitle1" gutterBottom component="div">
          {product.productDescription}
        </Typography>
        <Typography mb={0} variant="subtitle1" gutterBottom component="div">
          Price: {product.price.amount} {product.price.currencyCode}
        </Typography>
      </CardInfo>
      <Button fullWidth variant="contained" sx={{ borderRadius: "0px" }}>
        Add to Cart
      </Button>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    productImage: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    description: PropTypes.string, // Made optional in case some products don't have a description
    price: PropTypes.shape({
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      currencyCode: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductCard;
