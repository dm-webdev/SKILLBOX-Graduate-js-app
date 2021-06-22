import React from "react";
import { useSelector } from "react-redux";
import { TRootReducer } from "../../../store/rootReducer";
import "./headerbar.css";
import {TUserDataReducer} from '../../../store/userReducer/userDataReducer';

export function HeaderBar() {
  const userData = useSelector<TRootReducer, TUserDataReducer>(state => state.userData);
  const isUserDataPresent = !!userData?.numeric_id;

  return (
    <div className="header__bar">
      {!isUserDataPresent && "Пожалуйста авторизуйтесь!"}
      {isUserDataPresent && `Добро пожаловать, ${userData.name}!`}
    </div>
  );
}
