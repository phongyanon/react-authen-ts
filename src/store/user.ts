import { atom, selector } from "recoil";
import { IUserInfo, IRegisterState } from "../types/user.type";
import { IAnchor } from "../types/anchor.type";

export const userState = atom<IUserInfo | undefined>({
    key: "current_user",
    default: undefined
})

export const anchorState = atom<IAnchor[]>({
    key: "anchor",
    default: []
})

export const registerState = atom<IRegisterState | undefined>({
    key: "register_state",
    default: undefined
})

// export const getAnchorState = selector({
//     key: "getAnchor",
//     get: ({ get }) => {
//       return get(anchorState);
//     },
// });