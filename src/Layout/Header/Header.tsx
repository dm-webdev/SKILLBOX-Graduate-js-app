import React from "react";
import "./header.css";
import { HeaderBar } from "./HeaderBar";
import { UserBlock } from "./UserBlock";

export function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <div className="header__menu">
          <a
            className="animated"
            href="https://www.dm-webdev.ru/"
            aria-label="перейти на персональную страницу разработчика, Мироненко Дениса"
          >
            <img
              src="./logo.svg"
              alt="разработчик, Мироненко Денис"
              className="header__logo"
            />
          </a>
          <UserBlock />
        </div>
        
        <HeaderBar />
      </div>
    </header>
  );
}
