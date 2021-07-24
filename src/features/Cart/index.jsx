import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import NotProductInCart from "./components/NotProductInCart";
import ProductDetailCard from "./components/ProductDetailCard";
import ProductTotalPrice from "./components/ProductTotalPrice";
import { cartItemsCountSelector, cartTotalSelector } from "./selectors";
// import PropTypes from "prop-types";

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    flex: "1 1 0",
  },
  right: {
    width: "250px",
  },
  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    marginTop: "30px",
    paddingBottom: "20px",
  },
  cartTitle: {
    margin: theme.spacing(2, 0),
  },
}));

CartFeature.propTypes = {};

function CartFeature(props) {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotalCount = useSelector(cartItemsCountSelector);
  const cartTotal = useSelector(cartTotalSelector);

  return (
    <Box>
      <Container>
        <Typography className={classes.cartTitle}>
          GIỎ HÀNG ({cartTotalCount} sản phẩm)
        </Typography>
        {cartItems.length ? (
          <Grid container spacing={1}>
            <Grid item className={classes.left}>
              <Paper elevation={0}>
                {cartItems.map((item) => (
                  <ProductDetailCard key={item.id} item={item} />
                ))}
              </Paper>
            </Grid>

            <Grid item className={classes.right}>
              <Paper elevation={0}>
                <ProductTotalPrice totalPrice={cartTotal} />
              </Paper>
              <BootstrapButton
                variant="contained"
                color="primary"
                disableRipple
                fullWidth
                size="small"
                style={{ marginTop: "20px" }}
              >
                Tiến hành đặt hàng
              </BootstrapButton>
            </Grid>
          </Grid>
        ) : (
          <Paper>
            <NotProductInCart />
          </Paper>
        )}
      </Container>
    </Box>
  );
}

export default CartFeature;
