import { atom } from "recoil";
import { IUserInfo, IRegisterState } from "../types/user.type";
import { IProfile } from "../types/profile.type";
import { IVerification } from "../types/verification.type";
import { IAnchor } from "../types/anchor.type";

export const userState = atom<IUserInfo | undefined>({
    key: "current_user",
    default: undefined
})

export const profileState = atom<IProfile | undefined>({
    key: "current_profile",
    default: undefined
})

export const verifyState = atom<IVerification | undefined>({
    key: "current_veriy",
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