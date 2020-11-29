import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_LIKEBTN } from "../../../../store/galleryReducer/galleryConst";
import { TRootReducer } from "../../../../store/rootReducer";
import { IPhoto } from "../../../../utils/createList";
import { setLikeBtn } from "../../../../utils/setLikeBtn";
import { dislikePhoto, likePhoto } from "../../../../utils/unsplash";
import "./karmacount.css";

interface IKarmaCount {
  photo: IPhoto;
}

export function KarmaCount({ photo }: IKarmaCount) {
  const dispatch = useDispatch();

  const photosList = useSelector<TRootReducer, IPhoto[]>(
    (state) => state.gallery.photos
  );
  const indexOfPhoto: number = photosList.findIndex(
    (item) => item.id === photo.id
  );

  const isLiked = useSelector<TRootReducer, boolean>(
    (state) => state.gallery.photos[indexOfPhoto].liked_by_user
  );
  const [likeCount, setLike] = useState(photo.likes);

  const handleLike = () => {
    setLike(likeCount + 1);
    dispatch(likePhoto(photo.id));
    dispatch({
      type: SET_LIKEBTN,
      photos: setLikeBtn(photosList, indexOfPhoto),
    });
  };

  function handleDisLike() {
    setLike(likeCount - 1);
    dispatch(dislikePhoto(photo.id));
    dispatch({
      type: SET_LIKEBTN,
      photos: setLikeBtn(photosList, indexOfPhoto),
    });
  }

  return (
    <div className="karma-count">
      <button
        className="karma-count__like"
        type="button"
        aria-label="поставить лайк фотографии"
        onClick={() => handleLike()}
        disabled={isLiked}
      ></button>

      <span className="karma-count__desk">{likeCount}</span>

      <button
        className="karma-count__dislike"
        type="button"
        aria-label="убрать лайк фотографии"
        onClick={() => handleDisLike()}
        disabled={isLiked}
      ></button>
    </div>
  );
}
