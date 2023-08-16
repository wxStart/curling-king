import React, { Suspense, lazy } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button } from "antd";

// import Home from "./pages/home";
// import About from "./pages/about";

const Home = lazy(/* webpackChunkName: 'Home' */ () => import("./pages/home"));
const About = lazy(
  /**webpackChunkName: 'About' */ () => import("./pages/about")
);

function App() {
  return (
    
    <div>
      <h1>React-App</h1>
      <Button type="primary"> type="primary"</Button>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/home" Component={Home}></Route>
          <Route path="/about" Component={About}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
