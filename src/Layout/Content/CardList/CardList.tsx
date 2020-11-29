import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { TRootReducer } from "../../../store/rootReducer";
import { IPhoto } from "../../../utils/createList";
import { Card } from "./Card/Card";
import "./cardlist.css";

export function CardList() {
  const photosList = useSelector<TRootReducer, IPhoto[]>(
    (state) => state.gallery.photos
  );

  const locationHome = useLocation().pathname === "/";
  const locationAuth = useLocation().pathname === "/auth";
  const locationGallery = useLocation().pathname.includes("/gallery");

  return (
    <ul className="content__list">
      {(locationHome || locationAuth) && (
        <li className="content__list_empty">
          <p>
            Данное приложение разработано в качестве дипломного проекта курса
            JavaScript онлайн университета SKILLBOX. В разработке использовано
            Unsplash API с официальной библиотекой unsplash-js. Программа
            написана на TypeScript использованием React, Redux, React-router.
          </p>
          <p>Для просмотра фотографий, пожалуйста зарегистрируйтесь и нажмите
            кнопку "загрузить фотографии". Приятного просмотра!</p>
        </li>
      )}

      { locationGallery && (photosList.length === 0 ? (
        <li className="content__list_empty">
          <p>
            Для просмотра фотографий, зарегистрируйтесь и нажмите кнопку
            "загрузить фотографии". Приятного просмотра!
          </p>
        </li>
      ) : (
        photosList.map((item) => <Card key={item.id} photo={item} />)
      ))}
    </ul>
  );
}
