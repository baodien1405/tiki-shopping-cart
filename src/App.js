import Header from "components/Header";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "components/NotFound";

function App() {
  return (
    <div className="app">
      <Header />

      <Switch>
        <Redirect from="/home" to="/" exact />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
