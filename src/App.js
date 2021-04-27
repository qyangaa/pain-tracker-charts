import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Report from "./components/Report";
import Test from "./components/Test";

function App() {
  return (
    <div
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        margin: 0,
        padding: 0,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/user-report/mobile/:token" component={Report} />
          <Route path="/test" component={Test} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
