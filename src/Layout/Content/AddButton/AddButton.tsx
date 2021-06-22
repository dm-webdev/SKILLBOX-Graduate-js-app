import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TRootReducer } from "../../../store/rootReducer";
import { getListPhoto } from "../../../utils/unsplash";
import "./addbutton.css";

export function AddButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userID = useSelector<TRootReducer, number | null>(state => state.userData.numeric_id);

  const handleClick = () => {
    dispatch(getListPhoto());
    history.push("/gallery");
  };

  return (
    <button
      type="button"
      className="btn content__btn"
      disabled={!userID}
      onClick={handleClick}
    >
      Загрузить фотографии
    </button>
  );
}
