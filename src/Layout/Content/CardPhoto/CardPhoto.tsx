import React from "react";
import ReactDOM from "react-dom";
import { IPhoto } from "../../../utils/createList";
import { useModalOpen } from "../../../utils/hooks/useModalOpen";
import { AuthorBar } from "./AuthorBar";
import "./cardphoto.css";
import { KarmaCount } from "./KarmaCount";

interface ICardPhoto {
  photo: IPhoto;
  cardPhotoClose: () => void;
}

export function CardPhoto({ photo, cardPhotoClose }: ICardPhoto) {
  const [ref] = useModalOpen(cardPhotoClose);

  const node = document.querySelector("#modal");
  if (!node) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__container" ref={ref}>
        <picture>
          <source media="(min-width: 1650px)" srcSet={photo.urls_full} />

          <source media="(min-width: 576px)" srcSet={photo.urls_regular} />

          <img
            src={photo.urls_small}
            alt={photo.alt_description}
          />
        </picture>

        <button
          className="modal__btn_hide"
          onClick={() => cardPhotoClose()}
          aria-label="свернуть изображение"
        ></button>

        <AuthorBar photo={photo} />

        <KarmaCount photo={photo} />
      </div>
    </div>,
    node
  );
}
