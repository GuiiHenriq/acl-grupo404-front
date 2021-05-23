<template>
  <div>
    <h2>Minhas Compras</h2>

    <section v-if="myCart">
      <div class="product" v-for="(product, index) in myCart" :key="index">
        <div class="info">
          <p class="price">{{product.total | priceNumber}}</p>
          <router-link :to="{ path: `/product/${product.products[0].product_id}` }" title="Ir para Página do Produto"><h3 class="title">{{product.products[0].product.name}}</h3></router-link>
          <p class="qty">Quantidade: {{product.products[0].qty}}</p>
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
  name: "MyCart",
  data() {
    return {
      idUser: this.$store.state.user.id,
      tokenUser: this.$store.state.user.token,
      myCart: null,
    };
  },
  methods: {
    getMyCart() {
      apiToken.get(`/user/${this.idUser}/orders`, this.tokenUser).then((r) => {
          this.myCart = r.data.body;
      }, (error) => {
        if (error.response.status === 400) {
          this.myCart = false;
        }
      });
    },
  },
  created() {
    if(!this.$store.state.login) {
      this.$router.push('/');
    }
    this.getMyCart();
  }
}
</script>

<style scoped>
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