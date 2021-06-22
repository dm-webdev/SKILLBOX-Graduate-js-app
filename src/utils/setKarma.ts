import { IPhoto } from "./createList";

export function setKarma(arr: IPhoto[], n: number, isLiked: boolean) {
  for (let photo in arr) {
    if (+photo === n) {
      arr[photo].liked_by_user = isLiked;
    }
  }
  return arr;
};
