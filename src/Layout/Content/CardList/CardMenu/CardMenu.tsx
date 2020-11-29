import React from "react";
import { IPhoto } from "../../../../utils/createList";
import "./cardmenu.css";

interface ICardMenu {
  photo: IPhoto;
}

export function CardMenu({ photo }: ICardMenu) {
  return (
    <div className="content__menu">
      <a
        className="content__authorinfo"
        href={photo.author_link_html}
        aria-label={`перейти на страницу автора ${photo.author_username}`}
      >
        <div className="content__authoravatar__container">
          <img
            src={photo.author_avatar}
            className="content__authoravatar"
            alt={photo.author_username[0].toUpperCase()}
          />
        </div>

        <span className="content__authorname">{photo.author_username}</span>
      </a>

      <div className="content__desk">
        <span className="content__date">
          {new Date(photo.created_at).toLocaleDateString()}{" "}
        </span>
        <span className="content__karma">{photo.likes}</span>
      </div>
    </div>
  );
}
