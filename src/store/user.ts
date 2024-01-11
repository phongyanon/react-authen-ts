import { atom, selector } from "recoil";
import { IUserInfo, IUserForm } from "../types/user.type";
import { IAnchor } from "../types/anchor.type";

export const userState = atom<IUserInfo | undefined>({
    key: "current_user",
    default: undefined
})

export const anchorState = atom<IAnchor[]>({
    key: "anchor",
    default: []
})

export const userFormState = atom<IUserForm | undefined>({
    key: "current_user_form",
    default: undefined
})

// export const getAnchorState = selector({
//     key: "getAnchor",
//     get: ({ get }) => {
//       return get(anchorState);
//     },
// });