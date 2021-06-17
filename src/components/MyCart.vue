<template>
  <div>
    <section class="loading" v-show="showLoad">
      <div class="loader">Loading...</div>
    </section>

    <h2>Minhas Compras</h2>

    <section v-if="myCart">
      <div class="cart" v-for="(product, index) in myCart" :key="index">
        <div class="info">
          <router-link :to="{ path: `/product/${product.products[0].product_id}` }" title="Ir para Página do Produto"><h3 class="title">{{product.products[0].product.name}}</h3></router-link>
          <p class="id"><b>Número do Pedido:</b> {{product.id}}</p>
          <p class="price"><b>Valor da Compra:</b> {{product.total | priceNumber}}</p>
          <p class="qty"><b>Quantidade:</b> {{product.products[0].qty}}</p>

          <div class="address" v-if="product.user_address">  
            <p>
              <b>Endereço de Entrega:</b>
              <span v-if="product.user_address.complement">
                {{product.user_address.street}}, {{product.user_address.number}} {{product.user_address.complement}} - {{product.user_address.district}}<br />
                CEP: {{product.user_address.cep}} - {{product.user_address.city}}/{{product.user_address.state}}
              </span>
              <span v-else>
                {{product.user_address.street}}, {{product.user_address.number}} - {{product.user_address.district}}<br />
                CEP: {{product.user_address.cep}} - {{product.user_address.city}}/{{product.user_address.state}}
              </span>
            </p>
          </div>

          <div class="seller" v-if="product.user_seller">
            <p class="client"><b>Vendedor:</b> {{product.user_seller.name}}</p>
            <p class="phone"><b>Telefone:</b> <a :href="'tel:+55' + product.user_seller.phone">{{product.user_seller.phone}}</a></p>
            <p class="mail"><b>E-mail:</b> <a :href="'mailto:' + product.user_seller.email">{{product.user_seller.email}}</a></p>
          </div>
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
      showLoad: false,
      idUser: this.$store.state.user.id,
      tokenUser: this.$store.state.user.token,
      myCart: null,
    };
  },
  methods: {
    getMyCart: async function() {
      this.showLoad = true;

      try {
        apiToken.get(`/user/${this.idUser}/orders`, this.tokenUser).then((r) => {
          this.myCart = r.data.body;
        });
      } catch(error) {
        this.myCart = false;
      } finally {
        this.showLoad = false;
      }  
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

.cart .title {
  font-size: 24px;
  color: #C2185B;
  font-weight: 700;
  margin: 7px 0;
}

.cart {
  display: grid;
  border-bottom: 1px solid #ccc;
  padding: 30px 0;
}

.cart a {
  text-decoration: underline;
  color: #C2185B;
}

.cart p {
  margin-bottom: 10px;
}

.cart p > b{
  font-weight: 700;
}

.cart .title {
  font-size: 24px;
  color: #C2185B;
  font-weight: 700;
  margin: 7px 0;
}
</style>