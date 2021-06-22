import { Reducer } from "redux";
import { IPhoto } from "../../utils/createList";
import { GET_GALLERY, SET_LIKEBTN } from "./galleryConst";


export type TGalleryReducer = {
  photos: IPhoto[];
}

const initialState: TGalleryReducer = {
  photos: [],
};

export const galleryReducer: Reducer<TGalleryReducer> = (state = initialState, action) => {
  switch (action.type) {
    case GET_GALLERY:
      return {
        ...state,
        photos: state.photos.concat(action.photos),
      };
      case SET_LIKEBTN:
      return {
        ...state,
        photos: state.photos,
      };
    default: return state;
  }
};
