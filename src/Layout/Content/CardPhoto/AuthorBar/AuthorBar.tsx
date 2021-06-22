import React from "react";
import { IPhoto } from "../../../../utils/createList";
import "./authorbar.css";

interface IAuthorBar {
  photo: IPhoto;
}

export function AuthorBar({ photo }: IAuthorBar) {
  return (
    <a className="author-bar" href={photo.author_link_html}>
      <img className="author-bar__avatar" src={photo.author_avatar} alt={photo.author_username} />

      <div className="author-bar__desk">
        <span className="author-bar__username">{photo.author_username}</span>

        <span className="author-bar__date">опубликовано {new Date(photo.created_at).toLocaleString()}</span>
      </div>
    </a>
  );
}
