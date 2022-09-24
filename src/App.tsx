import "./styles/App.scss";
import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Favorites from "./pages/Favorites";
import Navigation from "./components/Navigation";

const App: React.FC = () => {
  return (
    <Fragment>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Fragment>
  );
};

export default App;
