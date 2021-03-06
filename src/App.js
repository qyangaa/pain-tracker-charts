import "./App.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import Report, { useState } from "./components/Report";
import useWindowSize from "./hooks/useWindowSize";
import Test from "./components/Test";

function App() {
  const windowSize = useWindowSize();
  return (
    <div
      style={{
        width: windowSize.width,
        height: windowSize.height,
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
