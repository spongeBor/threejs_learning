import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Second from "./components/Second";
import Third from "./components/Third";
import "./App.scss";
import First from "./components/First";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/scene_1" element={<First />}></Route>
        <Route path="/scene_2" element={<Second />}></Route>
        <Route path="/scene_3" element={<Third />}></Route>
      </Routes>
    </div>
  );
}
function Main() {
  return (
    <div className="main">
      <Link to="/scene_1">First</Link>
      <Link to="/scene_2">Second</Link>
      <Link to="/scene_3">Third</Link>
    </div>
  );
}

export default App;
