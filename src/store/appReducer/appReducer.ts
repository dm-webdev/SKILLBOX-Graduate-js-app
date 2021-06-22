import { Reducer } from "redux";
import {
  SET_TOKEN,
  SHOW_LOADER,
  HIDE_LOADER,
  HIDE_ALERT,
  SHOW_ALERT,
  CLEAR_TOKEN,
  SET_COUNT,
} from "./appConst";

export type TAppReducer = {
  token: string | null;
  isLoading: boolean;
  isAlert: boolean;
  alertText: string;
  count: number;
};

const initialState: TAppReducer = {
  token: null,
  isLoading: false,
  isAlert: false,
  alertText: "",
  count: 1,
};

export const appReducer: Reducer<TAppReducer> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case CLEAR_TOKEN:
      return {
        ...state,
        token: null,
      };
    case SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    case SHOW_ALERT:
      return {
        ...state,
        isAlert: true,
        alertText: action.text,
      };
    case HIDE_ALERT:
      return {
        ...state,
        isAlert: false,
        alertText: "",
    };
    case SET_COUNT:
      return {
        ...state,
        count: state.count + 1,
    };
    default:
      return state;
  };
};
