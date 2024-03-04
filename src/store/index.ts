import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Store = {
  isLogin: boolean;
  userState: {
    username: string;
    jwt: string;
  };
  setUser: (data: Store['userState']) => void;
  loginAction: () => void;
  logoutAction: () => void;
};

// const useStore = create<Store>(set => ({
//   isLogin: false,
//   loginAction: () => set(() => ({isLogin: true})),
//   logoutAction: () => set(() => ({isLogin: false})),
// }));
const useStore = create<Store>()(
  persist(
    set => ({
      isLogin: false,
      userState: {
        username: '',
        jwt: '',
      },
      setUser: (data: Store['userState']) =>
        set({userState: data, isLogin: true}),
      loginAction: () => set(() => ({isLogin: true})),
      logoutAction: () => set(() => ({isLogin: false})),
    }),
    {
      name: 'custom-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useStore;
