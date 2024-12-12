// This must be imported for first
import "reflect-metadata";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// enables i18n
import "./i18n";

import { container } from "tsyringe";
import { IMovieApiServiceToken } from "./services/api/IMovieApiService";
import { MovieAppApiService } from "./services/api/movieAppApi";
import { EnvService } from "./services/envService";
// import { TmdbApiService } from "./services/api/tmdb";

// Bind the right movie api service to the interface
container.register<MovieAppApiService>(IMovieApiServiceToken, {
  useClass: MovieAppApiService,
});

// Or you can bind the other movie api service to the interface
// container.register<TmdbApiService>(IMovieApiServiceToken, {
//   useClass: TmdbApiService,
// });

container.resolve(EnvService);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
