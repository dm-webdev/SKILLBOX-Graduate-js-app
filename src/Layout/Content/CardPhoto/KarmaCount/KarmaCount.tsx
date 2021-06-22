import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_LIKEBTN } from "../../../../store/galleryReducer/galleryConst";
import { TRootReducer } from "../../../../store/rootReducer";
import { IPhoto } from "../../../../utils/createList";
import { dislikePhoto, likePhoto } from "../../../../utils/unsplash";
import "./karmacount.css";
import {setKarma} from "../../../../utils/setKarma";

interface IKarmaCount {
  photo: IPhoto;
}

export function KarmaCount({ photo }: IKarmaCount) {
  const dispatch = useDispatch();
  const [likeCount, setLikeCount] = useState(photo.likes);
  const photosList = useSelector<TRootReducer, IPhoto[]>(state => state.gallery.photos);
  const indexOfPhoto: number = photosList.findIndex(item => item.id === photo.id);
  const isLiked = useSelector<TRootReducer, boolean>(state => state.gallery.photos[indexOfPhoto].liked_by_user);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
    dispatch(likePhoto(photo.id));
    dispatch({
      type: SET_LIKEBTN,
      photos: setKarma(photosList, indexOfPhoto, true),
    });
  };

  const handleDisLike = () => {
    setLikeCount(likeCount - 1);
    dispatch(dislikePhoto(photo.id));
    dispatch({
      type: SET_LIKEBTN,
      photos: setKarma(photosList, indexOfPhoto, false),
    });
  };

  return (
    <div className="karma-count">
      {!isLiked
        ? <button
            className="karma-count__like"
            type="button"
            aria-label="поставить лайк фотографии"
            onClick={handleLike}
          />
        : <button
            className="karma-count__dislike"
            type="button"
            aria-label="убрать лайк фотографии"
            onClick={handleDisLike}
          />
      }
      <span className="karma-count__desk">{likeCount}</span>
    </div>
  );
}
