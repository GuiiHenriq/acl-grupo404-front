import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter("priceNumber", valor => {
  valor = Number(valor);
  if(!isNaN(valor)) {
    return valor.toLocaleString("pt-Br", {
      style: "currency",
      currency: "BRL"
    });
  } else {
    return "";
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')