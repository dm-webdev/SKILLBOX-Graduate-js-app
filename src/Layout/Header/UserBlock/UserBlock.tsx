
import React, { useEffect } from "react";
import "./userblock.css";
import { useDispatch, useSelector } from "react-redux";
import { TRootReducer } from "../../../store/rootReducer";
import { clearUserData, getUserDate } from "../../../store/userReducer/userActions";
import { getTokenUserData, useToken } from "../../../utils/unsplash";
import { clearToken } from "../../../store/appReducer/actionApp";
import { useHistory } from "react-router-dom";

export function UserBlock() {

  const dispatch = useDispatch();
  const token = useSelector<TRootReducer>((state) => state.app.token);
  const userId = useSelector<TRootReducer, number>((state) => state.userData.numeric_id);
  const userName = useSelector<TRootReducer, string | undefined>((state) => state.userData.username);
  const avatarSrc = useSelector<TRootReducer, string | undefined>((state) => state.userData.profile_image);
  const history = useHistory();

  useToken();  

  let handleClick: () => void;

  useEffect (()=>{
    if (token !== undefined && userId === 0) {
      dispatch(getUserDate());
      history.push("/auth");
    }
  }, [dispatch, history, token, userId]);

  if (!token) {
    handleClick = () => {
      getTokenUserData();      
      // history.push("/auth")
    };
  } else {
    handleClick = () => {
      dispatch(clearUserData());
      dispatch(clearToken());
      localStorage.removeItem("token");
      history.push("/");
    };
  }

  return (
    <button
      className={`header__link ${token ? "text_dark" : "text_grey"}`}
      type="button"
      aria-label="зарегистрироваться"
      onClick={() => handleClick()}
    >
      <p className="header__text">{userName || "войти"}</p>
      <div className="header__img__container">
        <img src={avatarSrc || "./avatar_anonim.svg"} className="header__avatar" alt={userName ? userName[0].toUpperCase() : "A"} />
      </div>
    </button>
  );
}
