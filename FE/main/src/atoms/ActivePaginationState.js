import { atom } from "recoil";
//NavBar에서 발생하는 상태 관리
export const activePaginationState = atom({
    key:"ActivePaginationState",
    default:1,
});