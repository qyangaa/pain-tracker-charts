import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Report from "./components/Report";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/user-report/mobile/:token" component={Report} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
