import React from "react";
import {
  Box,
  makeStyles,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(8),
    textAlign: "center",
  },
  image: {
    maxWidth: "100%",
    width: "190px",
    objectFit: "cover",
    margin: "0 auto 25px",
  },
}));

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

function NotProductInCart(props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.image}>
        <img
          src="https://salt.tikicdn.com/desktop/img/mascot@2x.png"
          alt="123"
          width="100%"
        />
      </Box>
      <Typography>Không có sản phẩm nào trong giỏ hàng của bạn.</Typography>
      <BootstrapButton
        variant="contained"
        color="primary"
        disableRipple
        size="small"
        style={{ marginTop: "20px" }}
      >
        Tiếp tục mua sắm
      </BootstrapButton>
    </Box>
  );
}

export default NotProductInCart;
