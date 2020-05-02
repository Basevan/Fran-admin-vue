import { getMenu } from '@/api/system/menu/index';

const processModule = {
  namespaced: true,
  state: {
    menuList: []
  },
  mutations: {},
  actions: {

    async getMenu({state, commit, dispatch}, payload) {

      const { data } = await getMenu(payload);


      console.log(data);
      if (data.code === 200) {
        state.menuList = data.menus;
      }

    }


  },
  getters: {}
};

export default processModule;
