import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/views/HomePage";
import MoviePage from "./components/views/MoviePage";
import FavorPage from "./components/views/FavorPage";
import ProfilePage from "./components/views/ProfilePage";
import Header from "./components/utils/Header";
import auth from "./components/hoc/auth";
import Footer from "./components/utils/Footer";
import SignUpPage from "./components/views/SignUpPage";

import "./App.css";
import "antd/dist/antd.css";

// 0: 비로그인자만 갈 수 있는 곳.
// 1: 로그인자만 갈 수 있는 곳.
// 2: 둘 다 갈 수 있는 곳.

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={auth(HomePage, 2)} />
          <Route exact path="/signup" component={auth(SignUpPage, 0)} />
          <Route path="/movie/:title" component={auth(MoviePage, 2)} />
          <Route exact path="/favorites" component={auth(FavorPage, 1)} />
          <Route exact path="/profile" component={auth(ProfilePage, 1)} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
