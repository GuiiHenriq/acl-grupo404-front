<template>
  <div>
    <section class="loading" v-show="showLoad">
      <div class="loader">Loading...</div>
    </section>

    <h2>Minhas Vendas</h2>

    <section v-if="mySales">
      <div class="sales" v-for="sale in mySales" :key="sale.id" v-show="sale.products[0].product.user_id === idUser">
        <div class="info">
          <router-link :to="{ path: `/product/${sale.products[0].product.id}` }" title="Ir para Página do Produto"><h3 class="title">{{sale.products[0].product.name}}</h3></router-link>
          <p class="id"><b>Número do Pedido:</b> {{sale.id}}</p>
          <p class="price"><b>Valor da Compra:</b> {{sale.total | priceNumber}}</p>
          <p class="qty"><b>Quantidade:</b> {{sale.products[0].qty}}</p>
          <p class="client"><b>Cliente:</b> {{sale.user_order.name}}</p>
          <p class="phone"><b>Telefone:</b> <a :href="'tel:+55' + sale.user_order.phone">{{sale.user_order.phone}}</a></p>
          <p class="mail"><b>E-mail:</b> <a :href="'mailto:' + sale.user_order.email">{{sale.user_order.email}}</a></p>

          <div class="address" v-for="address in addressPurchaser" :key="address.id">
            <p v-if="address.id === sale.user_address_id">
              <b>Endereço:</b>
              <span v-if="address.complement">
                {{address.street}}, {{address.number}} {{address.complement}} - {{address.district}}<br />
                CEP: {{address.cep}} - {{address.city}}/{{address.state}}
              </span>
              <span v-else>
                {{address.street}}, {{address.number}} - {{address.district}}<br />
                CEP: {{address.cep}} - {{address.city}}/{{address.state}}
              </span>
            </p>
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
  name: "MySales",
  data() {
    return {
      showLoad: false,
      idUser: this.$store.state.user.id,
      tokenUser: this.$store.state.user.token,
      mySales: null,
      addressPurchaser: null,
    };
  },
  methods: {
    getMySales: async function() {
      this.showLoad = true;

      try {
        apiToken.get(`/order`, this.tokenUser).then((r) => {
          this.mySales = r.data.body.items;
          this.getAddressPurchaser();
        });
      } catch(error) {
        this.mySales = false;
      } finally {
        this.showLoad = false;
      }  
    },
    getAddressPurchaser: async function() {
      this.showLoad = true;

      try {
        apiToken.get(`/user/${this.idUser}`, this.tokenUser).then((r) => {
          this.addressPurchaser = r.data.body[0].user_address;
          console.log(r.data.body[0].user_address);
        });
      } catch(error) {
        alert('Falha ao localizar endereço...');
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
  },
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

.sales {
  display: grid;
  border-bottom: 1px solid #ccc;
  padding: 30px 0;
}

.sales:first-of-type {
  padding-top: 0;
}

.sales:last-of-type {
  border: none;
}

.sales a {
  text-decoration: underline;
  color: #C2185B;
}

.sales p {
  margin-bottom: 10px;
}

.sales p > b{
  font-weight: 700;
}

.sales .title {
  font-size: 24px;
  color: #C2185B;
  font-weight: 700;
  margin: 7px 0;
}
</style>