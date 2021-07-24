import Header from "components/Header";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "components/NotFound";
import ProductFeature from "features/Product";
import CartFeature from "features/Cart";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/" to="/products" exact />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
