import {
  Box,
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { addToCart, showMiniCart } from "features/Cart/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddToCartForm from "../components/AddToCartForm";
import ProductAdditional from "../components/ProductAdditional";
import ProductDescription from "../components/ProductDescription";
import ProductInfo from "../components/ProductInfo";
import ProductMenu from "../components/ProductMenu";
import ProductReviews from "../components/ProductReviews";
import ProductThumbnail from "../components/ProductThumbnail";
import useProductDetail from "../hooks/useProductDetail";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  left: {
    width: "400px",
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: "1 1 0",
    padding: theme.spacing(1.5),
  },
  loading: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
  },
}));

function DetailPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    params: { productId },
    url,
  } = useRouteMatch();
  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = (formValues) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity: formValues.quantity,
    });
    dispatch(action);
    dispatch(showMiniCart());
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Switch>
          <Route path={url} exact>
            <ProductDescription product={product} />
          </Route>

          <Route path={`${url}/additional`} exact>
            <ProductAdditional />
          </Route>

          <Route path={`${url}/reviews`} exact>
            <ProductReviews />
          </Route>
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
