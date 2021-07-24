import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@material-ui/core";
import { THUMBNAIL_PLACEHOLDER } from "constants/index";
import { useHistory } from "react-router-dom";
import formatPrice from "utils/common";

Product.propTypes = {
  product: PropTypes.object,
};

Product.defaultProps = {
  product: {},
};

function Product({ product }) {
  const history = useHistory();
  const thumbnailUrl = product.thumbnail
    ? `${process.env.REACT_APP_API_URL}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };

  return (
    <Box padding={1} onClick={handleClick} style={{ cursor: "pointer" }}>
      <Box padding={1} minHeight={215}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {formatPrice(product.salePrice)}
        </Box>

        {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ""}
      </Typography>
    </Box>
  );
}

export default Product;
