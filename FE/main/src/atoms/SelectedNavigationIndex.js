import { atom } from 'recoil';
//Header 버튼에서 발생하는 상태관리
export const selectedNavigationIndex = atom({
  key: 'selectedNavigationIndex',
  default:null,
});