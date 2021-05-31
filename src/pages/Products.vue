<template>
  <div class="products-container">
    <section class="loading" v-show="showLoad">
      <div class="loader">Loading...</div>
    </section>

    <h2 class="title">Lista de Produtos</h2>

    <div class="products" v-if="dataProduct">
      <div class="product" v-for="(product, index) in dataProduct" :key="index" v-show="product.user_id !== idUser">
        <router-link :to="{name: 'ProductItem', params: {id: product.id}}">
          <img class="thumbnail" :src="urlAPI + '/' + product.productImages[0].path" alt="">
          <p class="price">{{product.price | priceNumber}}</p>
          <h2 class="name">{{product.name}}</h2>
          <p class="description">{{product.description}}</p>
        </router-link>
      </div>
    </div>

    <div class="error" v-else>
      <h3>Nenhum produto encontrado...</h3>
      <img src="../../public/assets/not-found.svg" alt="">
    </div>
  </div>
</template>

<script>
import { api } from '@/services.js'

export default {
  name: "Products",
  data() {
    return {
      showLoad: false,
      idUser: this.$store.state.user.id,
      dataProduct: "",
      urlAPI: process.env.VUE_APP_URL_API,
    };
  },
  methods: {
    getProducts: async function() {
      this.showLoad = true;

      try {
        await api.get(`/product`).then((r) => {
          this.dataProduct = r.data.body.items;
        });
      } catch(error) {
        alert('Falha ao localizar Produtos...');
      } finally {
        this.showLoad = false;
      }
    }
  },
  created() {
    this.getProducts();
  }
}
</script>

<style scoped>
@import '../assets/styles/loader.scss';

.products-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.products-container .title {
  text-align: center;
  font-weight: 700;
  color: #C2185B;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-size: 24px;
}

.products {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 30px;
  margin: 30px;
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.10);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all .2s;
}

.product .thumbnail {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 20px;
}

.product .price {
  color: #C2185B;
  font-weight: 700;
}

.product .name {
  margin: 10px 0;
  font-weight: 700;
  font-size: 24px;
}

.product .description {
  text-transform: capitalize;
}

.error {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-top: 50px;
}

/* ============= RESPONSIVE ============= */
@media only screen and (max-width: 768px) {
  .products {
    grid-template-columns: repeat(1,1fr);
    grid-gap: 10px;
    margin: 10px;
  }
}
</style>
