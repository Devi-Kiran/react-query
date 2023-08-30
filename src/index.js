import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <nav>
      <Link to="/">Home</Link>{" "}
      <Link to="/super-heroes">SuperHeroes</Link>{" "}
      <Link to="/rq-super-heroes">RQSuperHeroes</Link>{" "}
      <Link to="/rq-paralal-query">RQParallalQuery</Link>{" "}
      <Link to="/rq-dynamic-paralal-query">RQDynamicParallalQuery</Link>{" "}
      <Link to="/rq-dependent-query">RQDependentQuery</Link>{" "}
      <Link to="/rq-paginated-query">PaginatedQueriesPage</Link>
      <Link to="/rq-infinite-queries">InfiniteQueries</Link>
    </nav>
    <App />
  </BrowserRouter>
);

reportWebVitals();
