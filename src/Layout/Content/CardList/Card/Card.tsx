import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { IPhoto } from "../../../../utils/createList";
import { CardPhoto } from "../../CardPhoto";
import { CardMenu } from "../CardMenu";
import "./card.css";

interface ICard {
  photo: IPhoto;
}

export function Card({ photo }: ICard) {
  const history = useHistory();

  const cardPhotoClose = () => {
    history.push("/gallery");
  };

  const locationCardPhoto = useLocation().pathname === `/gallery/${photo.id}`;

  return (
    <li className="content__item">
      <Link
        to={`/gallery/${photo.id}`}
        className="content__img__container"
        aria-label={photo.alt_description}
      >
        <picture className="content__img">
          <source media="(min-width: 576px)" srcSet={photo.urls_small} />

          <img
            src={photo.urls_thumb}
            className="content__img"
            alt={photo.alt_description}
          />
        </picture>
      </Link>

      <CardMenu photo={photo} />

      {locationCardPhoto && (
        <CardPhoto photo={photo} cardPhotoClose={cardPhotoClose} />
      )}
    </li>
  );
}
