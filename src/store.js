import Vue from "vue";
import Vuex from "vuex";
import { api } from "@/services.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    user: {
      name: "",
      email: "",
      phone: "",
      login: "",
      password: "",
      enabled: 1
    },
  },
  mutations: {
    UPDATE_USUARIO(state, payload) {
      state.user = Object.assign(state.user, payload);
    },
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
  },
  actions: {
    getUsuario(context, payload) {
      return api.post(`/user/login`, payload).then(r => {
        if(r.data.login) {
          console.log('Logado!');
          context.commit("UPDATE_USUARIO", r.data);
          context.commit("UPDATE_LOGIN", true);
          window.localStorage.setItem('user', JSON.stringify(r.data));
        } else {
          console.log('Usuário não encontrado!');
        }
      });
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        name: "",
        email: "",
        phone: "",
        login: "",
        password: "",
        enabled: ""
      });
      context.commit("UPDATE_LOGIN", false);
    }
  }
});
