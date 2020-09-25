import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./components/views/HomePage";
import MoviePage from "./components/views/MoviePage";
import FavorPage from "./components/views/FavorPage";
import ProfilePage from "./components/views/ProfilePage";
import Header from "./components/utils/Header";
import auth from "./components/hoc/auth";
import Footer from "./components/utils/Footer";

import "./App.css";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={auth(HomePage)} />
          <Route path="/movie/:title" component={auth(MoviePage)} />
          <Route exact path="/favorites" component={auth(FavorPage)} />
          <Route exact path="/profile" component={auth(ProfilePage)} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
