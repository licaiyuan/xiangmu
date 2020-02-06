import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import sy from './App.js'
import scsp from './scsp.js'
import Ksp from './ksp/ksp.js'
function AppRouter() {
  return (
    <Router>
  
        <Route path="/" exact component={sy} />
        <Route path="/scsp" exact component={scsp} />
        <Route path="/ksp" exact component={Ksp} />
    </Router>
  );  
}
export default AppRouter;