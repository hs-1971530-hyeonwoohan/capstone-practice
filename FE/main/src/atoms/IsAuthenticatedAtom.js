import { atom } from 'recoil';
// 로그인 유무를 제공하기 위한 atom
export const isAuthenticatedAtom = atom({
    key: 'isAuthenticated',
    default: true,
  });