import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

import testList from "./data/testdata.json";

import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import BestBefore from "./pages/BestBefore";
import Settings from "./pages/Settings";
import ShoppingList from "./pages/ShoppingList";

const App = () => {
  const [listData, setlistData] = useState(testList);

  const listDataWithDates = listData.map((item) => ({
    ...item,
    bestBeforeDate: new Date(item.bestBeforeDate),
  }));

  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* <Navbar /> */}
        <Switch>
          <Route
            path="/best-before"
            Component={() => <BestBefore initialData={listDataWithDates} />}
          />
          <Route path="/shopping-list" Component={ShoppingList} />
          <Route path="/settings" Component={Settings} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
