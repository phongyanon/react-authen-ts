import { atom, selector } from "recoil";
import { IUserInfo } from "../types/user.type";
import { IAnchor } from "../types/anchor.type";

export const userState = atom<IUserInfo | undefined>({
    key: "current_user",
    default: undefined
})

export const anchorState = atom<IAnchor[]>({
    key: "anchor",
    default: []
})

// export const getAnchorState = selector({
//     key: "getAnchor",
//     get: ({ get }) => {
//       return get(anchorState);
//     },
// });