interface UserType {
  name: string;
  age: number;
}

export { UserType };


import { pageUserVuexPath } from "../store/path-name";

export default (payload: any) => {
  payload.store.registerModule(pageUserVuexPath, {
    namespaced: true,
    state: {
      user: { name: "王星" },
    },
    mutations: {
      setUser: (state: any, data: object) => {
        state.user = data;
      },
    },
    actions: {},
    getters: {},
  });
};
