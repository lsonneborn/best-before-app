import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

import jsonData from "./data/testdata.json";

//TODO
// - Save new Items to JSON
// - make best before date optional
// - filter by category/at home
// - edit item

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import BestBefore from "./pages/navbar/BestBefore";
import Home from "./pages/navbar/Home";
import Settings from "./pages/navbar/Settings";
import ShoppingList from "./pages/navbar/ShoppingList";

const App = () => {
  const jsonDataWithDates = jsonData.map((item) => ({
    ...item,
    bestBeforeDate: new Date(item.bestBeforeDate),
  }));

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Navbar />
        <Switch>
          <Route path="/Home" Component={Home} />
          <Route
            path="/best-before"
            Component={() => <BestBefore jsonData={jsonDataWithDates} />}
          />
          <Route path="/shopping-list" Component={ShoppingList} />
          <Route path="/settings" Component={Settings} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
