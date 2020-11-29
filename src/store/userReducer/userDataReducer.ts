import { Reducer } from "redux";
import { CLEAR_USERDATA, GET_USERDATA } from "./userDataConst";


export type TUserDataReducer = {
  numeric_id: number,
  name?: string,
  username?: string,
  profile_image?: string,
}

const initialState: TUserDataReducer = {
  numeric_id: 0,
  name: undefined,
  username: undefined,
  profile_image: undefined,

}

export const userDataReducer: Reducer<TUserDataReducer> = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERDATA: 
      return {
        ...state,
        numeric_id: action.numeric_id,
        name: action.name,
        username: action.username,
        profile_image: action.profile_image.medium,
      };
    case CLEAR_USERDATA: 
      return {
        ...state,
        numeric_id: 0,
        name: undefined,
        username: undefined,
        profile_image: undefined,
      };
      
    default: return state
  }
}