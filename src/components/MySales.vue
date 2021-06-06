<template>
  <div>
    <section class="loading" v-show="showLoad">
      <div class="loader">Loading...</div>
    </section>

    <h2>Minhas Vendas</h2>

    <section v-if="mySales">
      <div class="product" v-for="sale in mySales" :key="sale.id" v-show="sale.user_id === 18">
        {{sale}}
        <div class="info">
          <p class="price">{{sale.total | priceNumber}}</p>
          <router-link :to="{ path: `/product/${sale.products[0].product_id}` }" title="Ir para Página do Produto"><h3 class="title">teste</h3></router-link>
          <p class="qty">Quantidade: {{sale.products[0].qty}}</p>
          <p class="qty">Cliente: XXXX</p>
          <p class="qty">Telefone: XXXX</p>
          <p class="qty">E-mail: XXXX</p>
          <p class="qty">Endereço: XXXX</p>
        </div>
      </div>
    </section>

    <section v-else>
      <h2>Você não efetuou nenhuma compra ainda...</h2>
    </section>
  </div>
</template>

<script>
import { apiToken } from '@/services.js'

export default {
  name: "MySales",
  data() {
    return {
      showLoad: false,
      idUser: this.$store.state.user.id,
      tokenUser: this.$store.state.user.token,
      mySales: null,
    };
  },
  methods: {
    getMySales: async function() {
      this.showLoad = true;

      try {
        apiToken.get(`/order`, this.tokenUser).then((r) => {
          this.mySales = r.data.body.items;
          console.log(r.data);
        });
      } catch(error) {
        this.mySales = false;
      } finally {
        this.showLoad = false;
      }  
    },
  },
  created() {
    if(!this.$store.state.login) {
      this.$router.push('/');
    }
    this.getMySales();
  }
}
</script>

<style scoped>
@import '../assets/styles/loader.scss';

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content h2 {
  font-weight: 700;
  color: #C2185B;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-size: 24px;
}

.product {
  display: grid;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  padding: 30px 0;
}

.product:first-of-type {
  padding-top: 0;
}

.product:last-of-type {
  border: none;
}

.product a {
  text-decoration: underline;
  color: #C2185B;
}

.product .title {
  font-size: 24px;
  color: #C2185B;
  font-weight: 700;
  margin: 7px 0;
}
</style>