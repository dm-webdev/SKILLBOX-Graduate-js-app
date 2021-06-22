import { AnyAction, CombinedState, combineReducers, Reducer } from "redux";
import { appReducer, TAppReducer } from "./appReducer/appReducer";
import { galleryReducer, TGalleryReducer } from "./galleryReducer/galleryReducer";
import { TUserDataReducer, userDataReducer } from "./userReducer/userDataReducer";


export type TRootReducer = {
  app: TAppReducer;
  gallery: TGalleryReducer;
  userData: TUserDataReducer;
}

export const rootReducer: Reducer<
  CombinedState<{
    app: TAppReducer;
    gallery: TGalleryReducer;
    userData: TUserDataReducer;
  }>,
  AnyAction
> = combineReducers({
  app: appReducer,
  gallery: galleryReducer,
  userData: userDataReducer,
});
