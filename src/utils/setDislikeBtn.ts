import { IPhoto } from "./createList";

export function setDislikeBtn(arr: IPhoto[], n: number) {
  for (let photo in arr) {
    if (+photo === n) {
      arr[photo].liked_by_user = false;
    }
  }
  return arr;
};