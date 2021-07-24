import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { THUMBNAIL_PLACEHOLDER } from "constants/index";
import PropTypes from "prop-types";
import React from "react";
import formatPrice from "utils/common";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  thumbnail: {
    width: "20%",
  },
  quantity: {
    marginLeft: "15px",
  },
  info: {
    width: "50%",
    padding: theme.spacing(0, 2),
  },
  price: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
  },
  salePrice: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: "bold",
  },
  originalPrice: {
    textDecoration: "line-through",
  },
  promotionPercent: {
    paddingLeft: "10px",
    marginLeft: "15px",
    borderLeft: `1px solid ${theme.palette.grey[400]}`,
  },
}));

ProductDetailCard.propTypes = {
  item: PropTypes.object,
};

function ProductDetailCard({ item }) {
  const classes = useStyles();
  const { product } = item;

  const thumbnailUrl = product.thumbnail
    ? `${process.env.REACT_APP_API_URL}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;
  return (
    <Box className={classes.root}>
      <Box className={classes.thumbnail}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>

      <Box className={classes.info}>
        <Typography>{product.name}</Typography>
        <Button variant="outlined" color="primary" size="small">
          Xóa
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          className={classes.quantity}
        >
          {item.quantity}
        </Button>
      </Box>

      <Box className={classes.price}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(product.salePrice)}
        </Box>

        {product.promotionPercent > 0 && (
          <Box>
            <Box component="span" className={classes.originalPrice}>
              {formatPrice(product.originalPrice)}
            </Box>
            <Box
              component="span"
              className={classes.promotionPercent}
            >{`-${product.promotionPercent}%`}</Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProductDetailCard;
