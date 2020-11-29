import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { TRootReducer } from "../store/rootReducer";
import { Alert } from "./components/Alert";
import { Loader } from "./components/Loader";
import { Content } from "./Content";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./layout.css";

export function Layout() {
  const isLoading = useSelector<TRootReducer, boolean>(
    (state) => state.app.isLoading
  );
  const isAlert = useSelector<TRootReducer, boolean>(
    (state) => state.app.isAlert
  );
  const textAlert = useSelector<TRootReducer, string>(
    (state) => state.app.alertText
  );

  return (
    <div className="layout">
      <BrowserRouter basename="/react_app">
        <Header />

        <Content />

        <Footer />

        {isLoading && <Loader />}

        {isAlert && <Alert text={textAlert} />}
      </BrowserRouter>
    </div>
  );
}
