import { atom } from "recoil";

const paginationState = atom({
  key: "paginationState",
  default: 1, // 기본 인덱스 값 설정
});

export default paginationState;