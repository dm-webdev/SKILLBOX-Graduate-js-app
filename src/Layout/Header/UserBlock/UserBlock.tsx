import React, { useEffect } from "react";
import "./userblock.css";
import { useDispatch, useSelector } from "react-redux";
import { TRootReducer } from "../../../store/rootReducer";
import { clearUserData, getUserDate } from "../../../store/userReducer/userActions";
import { getTokenUserData, useToken } from "../../../utils/unsplash";
import { clearToken } from "../../../store/appReducer/actionApp";
import { useHistory } from 'react-router-dom';
import defaultAvatar from "../../../img/avatar_anonim.svg";
import { TUserDataReducer } from "../../../store/userReducer/userDataReducer";

export function UserBlock() {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector<TRootReducer>(state => state.app.token);
  const userData = useSelector<TRootReducer, TUserDataReducer>(state => state.userData);
  const isTokenPresent = !!token;
  const isUserDataPresent = !!userData?.numeric_id;

  useToken();

  const handleClick: () => void = isTokenPresent
    ? () => {
        dispatch(clearUserData());
        dispatch(clearToken());
        localStorage.removeItem("unsplashToken");
        history.push("/");
      }
    : () => getTokenUserData()

  useEffect (() => {
    if (isTokenPresent && !isUserDataPresent) {
      dispatch(getUserDate());
    }
  }, [isTokenPresent, isUserDataPresent]);

  return (
    <button
      className={`header__link ${token ? "text_dark" : "text_grey"}`}
      type="button"
      aria-label="зарегистрироваться"
      onClick={handleClick}
    >
      <p className="header__text">{userData?.username || "войти"}</p>
      <div className="header__img__container">
        <img
          className="header__avatar"
          src={userData?.profile_image || defaultAvatar}
          alt={userData?.username ? userData?.username[0].toUpperCase() : "A"}
        />
      </div>
    </button>
  );
}
