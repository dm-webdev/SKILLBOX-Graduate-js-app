import React from "react";
import ReactDOM from "react-dom";
import { IPhoto } from "../../../utils/createList";
import { useModalOpen } from "../../../utils/hooks/useModalOpen";
import { AuthorBar } from "./AuthorBar";
import "./cardphoto.css";
import { KarmaCount } from "./KarmaCount";
import { useSelector } from 'react-redux';
import { TRootReducer } from '../../../store/rootReducer';

interface ICardPhoto {
  photo: IPhoto;
  cardPhotoClose: () => void;
}

export function CardPhoto({ photo, cardPhotoClose }: ICardPhoto) {
  const [ref] = useModalOpen(cardPhotoClose);
  const token = useSelector<TRootReducer>(state => state.app.token);

  const node = document.querySelector("#modal");
  if (!node) return null;

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__container" ref={ref}>
        <picture className="modal__img">
          <source media="(min-width: 1650px)" srcSet={photo.urls_full} />
          <source media="(min-width: 576px)" srcSet={photo.urls_regular} />
          <img
            className="modal__img"
            src={photo.urls_small}
            alt={photo.alt_description}
          />
        </picture>

        <button
          className="modal__btn_hide"
          onClick={cardPhotoClose}
          aria-label="свернуть изображение"
        />

        <AuthorBar photo={photo} />

        {!!token && <KarmaCount photo={photo}/>}
      </div>
    </div>,
    node
  );
}
