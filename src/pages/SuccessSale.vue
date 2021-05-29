<template>
  <div>
    <section class="loading" v-show="showLoad">
      <div class="loader">Loading...</div>
    </section>

    <div v-if="dataSale" class="success-sale">
      <h2>Parabéns, compra efetuada com sucesso!</h2>

      <h3>N° PEDIDO: <strong>{{dataSale.id}}</strong></h3>
      <h3>VALOR TOTAL: <strong>{{dataSale.total | priceNumber}}</strong></h3>
      <h3>QUANTIDADE: <strong>{{dataSale.products[0].qty}}</strong></h3>

      <router-link :to="{ path: '/dashboard' }" title="Ir para Página de Dashboard">IR PARA MEU PAINEL</router-link>
    </div>

    <div v-else>
      <h2>Você não efetuou nenhuma compra!</h2>
    </div>
  </div>
</template>

<script>
import { apiToken } from '@/services.js'

export default {
  name: "SuccessSale",
  data() {
    return {
      showLoad: false,
      idUser: this.$store.state.user.id,
      tokenUser: this.$store.state.user.token,
      dataSale: null,
    };
  },
  methods: {
    getSale: async function() {
      this.showLoad = true;

      try {
        apiToken.get(`/user/${this.idUser}/orders/`, this.tokenUser).then((r) => {
          const arr = [r.data.body];
          const lastItem = arr[0][arr[0].length - 1];
          this.dataSale = lastItem;

          //this.dataSale = r.data.body[0];
        });
      } catch(error) {
        this.$router.push('/');
      } finally {
        this.showLoad = false;
      }
    },
  },
  created() {
    if(!this.$store.state.login) {
      this.$router.push('/');
    }
    this.getSale();
  }
}
</script>

<style>
@import '../assets/styles/loader.scss';

.success-sale {
  text-align: center;
  min-height: 450px;
  max-height: 900px;
}

.success-sale h2 {
  color: #00796B;
  font-weight: 700;
  font-size: 30px;
  margin-bottom: 35px;
}

.success-sale h3 strong {
  font-weight: 700;
  color: #00796B;
}

.success-sale h3 {
  font-size: 20px;
  margin-top: 5px;
}

.success-sale a {
  display: block;
  margin-top: 40px;
  text-decoration: underline;
  font-weight: 700;
}
</style>