import { IPhoto } from "./createList";

export function setLikeBtn(arr: IPhoto[], n: number) {
  for (let photo in arr) {
    if (+photo === n) {
      arr[photo].liked_by_user = true;
    }
  }
  return arr;
}
