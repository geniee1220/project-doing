import { atom } from "recoil";
import { GroupModel } from "../apis/groups";
import { CommentModel } from "../apis/comments";

export const groupsState = atom<GroupModel[]>({
  key: "groupsState",
  default: [],
});

export const groupsLoadingState = atom<boolean>({
  key: "groupsLoadingState",
  default: false,
});

export const commentState = atom<CommentModel[]>({
  key: "commentState",
  default: [],
});

export const commentLoadingState = atom<boolean>({
  key: "commentLoadingState",
  default: false,
});
