import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { TRootReducer } from "../../../store/rootReducer";
import "./headerbar.css";

export function HeaderBar() {
  const name = useSelector<TRootReducer, string | undefined>(
    (state) => state.userData.name
  );

  const locationHome = useLocation().pathname === "/";
  const locationAuth = useLocation().pathname.includes("/auth");
  const locationGallery = useLocation().pathname.includes("/gallery");
  
  return (
    <div className="header__bar">
      {locationHome && "Пожалуйста авторизуйтесь!"}
      {locationAuth && `Добро пожаловать, ${name}!`}
      {locationGallery && `Сегодня ${new Date().toLocaleDateString()}`}
    </div>
  );
}
