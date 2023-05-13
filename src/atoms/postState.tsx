import { atom } from "recoil";
import { PostModel } from "../apis/posts";

export const postsState = atom<PostModel[]>({
  key: "postsState",
  default: [],
});

export const postsLoadingState = atom<boolean>({
  key: "postsLoadingState",
  default: false,
});
