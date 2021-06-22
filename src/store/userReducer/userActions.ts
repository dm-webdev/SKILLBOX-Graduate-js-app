import Axios from "axios";
import { hideLoader, showAlert, showLoader } from "../appReducer/actionApp";
import { CLEAR_USERDATA, GET_USERDATA } from "./userDataConst";
import { ThunkAction } from "redux-thunk";
import { TRootReducer } from "../rootReducer";
import { Action } from "redux";

export const getUserDate = ():ThunkAction<void, TRootReducer, unknown, Action<string>> => (dispatch, getState) => {
  dispatch(showLoader());
  Axios.get("https://api.unsplash.com/me/", {
      headers: { Authorization: `Bearer ${getState().app.token}` },
    })
    .then(resp => {
      dispatch({
        type: GET_USERDATA,
        numeric_id: resp.data.numeric_id,
        name: resp.data.name,
        username: resp.data.username,
        profile_image: resp.data.profile_image,
      });
    })
    .catch(er => {
      dispatch(showAlert(`Что то пошло не так, попробуйте зайти в приложение позднее. ${er.response?.data}`));
    })
    .finally( () => dispatch(hideLoader()));
}

export function clearUserData() {
  return {
    type: CLEAR_USERDATA,
  };
}
