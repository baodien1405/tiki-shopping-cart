import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ListPage from "./pages/ListPage";
import { Box } from "@material-ui/core";

Product.propTypes = {};

function Product(props) {
  const match = useRouteMatch();

  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} component={ListPage} />
      </Switch>
    </Box>
  );
}

export default Product;
