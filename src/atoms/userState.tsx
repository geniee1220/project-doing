import { atom } from "recoil";

export interface UserParams {
  email: string;
  nickname: string;
  selfIntroduction?: string;
}

export const userState = atom<UserParams>({
  key: "userState",
  default: {
    email: "",
    nickname: "",
    selfIntroduction: "",
  },
});

export const isAuthenticatedState = atom({
  key: "isAuthenticatedState",
  default: false,
});
