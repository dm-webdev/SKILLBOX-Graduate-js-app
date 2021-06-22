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
  callbackUrl: "https://dm-webdev.ru/react-app",

  // accessKey: "bK8VrY_ggqkjbbafQD4VPkWDu5nwN6QaBN5x7Fuezsw",
  // secret: "ODzUc7b9i6_d3L_zJrsivdbO5yr3GrY_D2tQisUuutg",
  // callbackUrl: "http://localhost:3000/react-app",
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
  const token = useSelector<TRootReducer, string | null>(
    (state) => state.app.token
  );
  const isTokenPresent = !!token;
  const code = location.search.split("code=")[1];
  const isCodePresent = !!code;

  useEffect(() => {
    const tokenFromLocalStore = localStorage.getItem("unsplashToken");
    const isTokenFromLocalStorePresent = !!tokenFromLocalStore;

    if (!isTokenPresent && isTokenFromLocalStorePresent && typeof tokenFromLocalStore === 'string') {
      dispatch(setToken(tokenFromLocalStore));
      unsplash.auth.setBearerToken(tokenFromLocalStore);
    }

    if (!isTokenPresent && isCodePresent && !isTokenFromLocalStorePresent) {
      dispatch(showLoader());
      unsplash.auth
        .userAuthentication(code)
        .then(res => res.json())
        .then(json => {
          localStorage.setItem("unsplashToken", `${json.access_token}`);
          dispatch(setToken(json.access_token));
          unsplash.auth.setBearerToken(json.access_token);
          const path = location.origin + location.pathname;
          location.replace(path);
        })
        .catch(er => {
          dispatch(showAlert(
            `Во время авторизации, что-то пошло не так, попробуйте зайти в приложение позднее. ${er.response?.data}`
          ));
        })
        .finally( () => dispatch(hideLoader()));
    }
  }, [isTokenPresent, isCodePresent]);
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
    .then(res => res.json())
    .then(json => {
      dispatch({ type: GET_GALLERY, photos: createList(json) });
    })
    .catch(er => {
      dispatch(showAlert(
        `Что то пошло не так, попробуйте зайти в приложение позднее. ${er.response?.data}`
      ));
    })
    .finally( () => dispatch(hideLoader()));
};

export const likePhoto = (id: string): ThunkAction<void, TRootReducer, unknown, Action<string>> => dispatch => {
  unsplash.photos.likePhoto(id).catch(er => {
    dispatch(showAlert(
      `Во время оценки фото, что-то пошло не так, попробуйте зайти в приложение позднее. ${er.response?.data}`
    ));
  });
};


export const dislikePhoto = (id: string): ThunkAction<void, TRootReducer, unknown, Action<string>> => dispatch => {
  unsplash.photos.unlikePhoto(id).catch((er) => {
    dispatch(showAlert(
      `Во время оценки фото, что-то пошло не так, попробуйте зайти в приложение позднее. ${er.response?.data}`
    ));
  });
};
