import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import formatPrice from "utils/common";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  totalPrice: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: "bold",
    color: "#fe3f3b",
  },
}));

ProductTotalPrice.propTypes = {
  totalPrice: PropTypes.string,
};

function ProductTotalPrice({ totalPrice }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography>Thành tiền</Typography>
      <Box component="span" className={classes.totalPrice}>
        {formatPrice(totalPrice)}
      </Box>
    </Box>
  );
}

export default ProductTotalPrice;
