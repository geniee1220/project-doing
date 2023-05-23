import { atom } from "recoil";

export interface UserParams {
  email: string;
  nickname: string;
}

export const userState = atom<UserParams>({
  key: "userState",
  default: {
    email: "",
    nickname: "",
  },
});

export const isAuthenticatedState = atom({
  key: "isAuthenticatedState",
  default: false,
});
