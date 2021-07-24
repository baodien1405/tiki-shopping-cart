import React from "react";
import PropTypes from "prop-types";
import { THUMBNAIL_PLACEHOLDER } from "constants/index";
import { Box } from "@material-ui/core";

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

function ProductThumbnail({ product }) {
  const thumbnailUrl = product.thumbnail
    ? `${process.env.REACT_APP_API_URL}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
  return (
    <Box>
      <img src={thumbnailUrl} alt={product.name} width="100%" />
    </Box>
  );
}

export default ProductThumbnail;
