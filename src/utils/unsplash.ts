/* eslint-disable no-restricted-globals */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import Unsplash from "unsplash-js";
import {
  hideLoader,
  setCount,
  setToken,
  showAlert,
  showLoader,
} from "../store/appReducer/actionApp";
import { GET_GALLERY } from "../store/galleryReducer/galleryConst";
import { TRootReducer } from "../store/rootReducer";
import { createList } from "./createList";

const unsplash = new Unsplash({
  accessKey: "gtlSt2e3pUksk6EJN0uu7g3bt9e69AoDfqtJRUk4bj0",
  secret: "rAykEjts_1a63ZtS3hwqCkdqJ6yc9USfb4hAHI5EG5I",
  callbackUrl: "https://dm-webdev.ru/react_app",
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes",
]);

export function getTokenUserData() {
  location.assign(authenticationUrl);
}

export function useToken() {
  const dispatch = useDispatch();
  const token = useSelector<TRootReducer, string | undefined>(
    (state) => state.app.token
  );

  useEffect(() => {
    dispatch({ type: "useToken" });
    const code = location.search.split("code=")[1];

    if (code === undefined && token === undefined) {
      const localToken = localStorage.getItem("token");

      if (
        localToken !== undefined &&
        localToken !== null &&
        localToken.length > 9
      ) {
        dispatch(setToken(localToken));
        unsplash.auth.setBearerToken(localToken);
      }
    } else if (code && token === undefined) {
      dispatch({ type: "FROM_Up" });
      dispatch(showLoader());
      unsplash.auth
        .userAuthentication(code)
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem("token", `${json.access_token}`);
          dispatch(setToken(json.access_token));
          unsplash.auth.setBearerToken(json.access_token);
          dispatch(hideLoader());
        })
        .catch((er) => {
          dispatch(
            showAlert(
              `Во время авторизации, что-то пошло не так, попробуйте зайти в приложение позднее. ${er}`
            )
          );
          dispatch(hideLoader());
        });
    }
  }, [dispatch, token]);
}

export const getListPhoto = (): ThunkAction<
  void,
  TRootReducer,
  unknown,
  Action<string>
> => (dispatch, getState) => {
  dispatch(setCount());
  dispatch(showLoader());
  unsplash.photos
    .listPhotos(getState().app.count, 10, "latest")
    .then((res) => res.json())
    .then((json) => {
      dispatch({ type: GET_GALLERY, photos: createList(json) });
      dispatch(hideLoader());
    })
    .catch((er) => {
      dispatch(
        showAlert(
          `Что то пошло не так, попробуйте зайти в приложение позднее. ${er}`
        )
      );
      dispatch(hideLoader());
    });
};

export const likePhoto = (
  id: string
): ThunkAction<void, TRootReducer, unknown, Action<string>> => (dispatch) => {
  unsplash.photos.likePhoto(id).catch((er) => {
    dispatch(
      showAlert(
        `Во время оценки фото, что-то пошло не так, попробуйте зайти в приложение позднее. ${er}`
      )
    );
  });
};

export const dislikePhoto = (
  id: string
): ThunkAction<void, TRootReducer, unknown, Action<string>> => (dispatch) => {
  unsplash.photos.unlikePhoto(id).catch((er) => {
    dispatch(
      showAlert(
        `Во время оценки фото, что-то пошло не так, попробуйте зайти в приложение позднее. ${er}`
      )
    );
  });
};
