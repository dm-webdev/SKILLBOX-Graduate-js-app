export interface IPhoto {
  id: string;
  alt_description: string;
  created_at: string;
  liked_by_user: boolean
  likes: number;
  urls_full: string;
  urls_regular: string;
  urls_small: string;
  urls_thumb: string;
  author_id: string;
  author_link_html: string;
  author_avatar: string;
  author_username: string;
}

export function createList(json: Array<any>) {
  let photoList: IPhoto[] = [];

  for (let obj of json) {
    const myObj: IPhoto = {
      id: "string",
      alt_description: "string",
      created_at: "2020-11-22T12:31:46-05:00",
      liked_by_user: false,
      likes: 0,
      urls_full: "string",
      urls_regular: "string",
      urls_small: "string",
      urls_thumb: "string",
      author_id: "string",
      author_link_html: "string",
      author_avatar: "string",
      author_username: "string",
    };

    for (const key in obj) {
      switch (key) {
        case "id":
          myObj.id = obj[key];
          break;
        case "alt_description":
          myObj.alt_description = obj[key];
          break;
        case "created_at":
          myObj.created_at = obj[key];
          break;
        case "liked_by_user":
          myObj.liked_by_user = obj[key];
          break;
        case "likes":
          myObj.likes = obj[key];
          break;
        case "urls":
          myObj.urls_full = obj[key].full;
          myObj.urls_regular = obj[key].regular;
          myObj.urls_small = obj[key].small;
          myObj.urls_thumb = obj[key].thumb;
          break;
        case "user":
          myObj.author_id = obj[key].id;
          myObj.author_link_html = obj[key].links.html;
          myObj.author_avatar = obj[key].profile_image.medium;
          myObj.author_username = obj[key].username;
          break;
        default:
          console.log("no entries");
          break;
      }
    }
    photoList.push(myObj);
  }
  return photoList;
}
