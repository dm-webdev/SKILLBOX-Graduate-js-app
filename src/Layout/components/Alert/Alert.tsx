import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearToken, hideAlert } from "../../../store/appReducer/actionApp";
import { clearUserData } from "../../../store/userReducer/userActions";
import "./alert.css";

interface IAlert {
  text: string;
}

export function Alert({ text }: IAlert) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleCloseAlert = () => {
    dispatch(hideAlert());
    dispatch(clearUserData());
    dispatch(clearToken());
    localStorage.removeItem("unsplashToken");
    history.push("/");
  };

  return (
    <div className="alert">
      <p className="alert__desc">{text}</p>
      <button className="btn" onClick={handleCloseAlert}>скрыть</button>
    </div>
  );
}
