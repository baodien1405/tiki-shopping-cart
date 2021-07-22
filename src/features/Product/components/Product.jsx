import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { THUMBNAIL_PLACEHOLDER } from "constants/index";

Product.propTypes = {
  product: PropTypes.object,
};

Product.defaultProps = {
  product: {},
};

function Product({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${process.env.REACT_APP_API_URL}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  return (
    <Box padding={1}>
      <Box padding={1} minHeight={215}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.salePrice)}
        </Box>

        {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ""}
      </Typography>
    </Box>
  );
}

export default Product;
