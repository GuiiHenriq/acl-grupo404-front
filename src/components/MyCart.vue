<template>
  <div>
    <h2>Minhas Compras</h2>

    <section v-if="myCart">
      {{myCart}}
      <div class="product" v-for="(product, index) in myCart" :key="index">
        <div class="info">
          <p class="price">{{product.total | priceNumber}}</p>
          <h2 class="title">Câmera</h2>
          <p class="vendedor"><span data-v-17d04760="" data-v-580f677a="">Vendedor:</span>lobo@origamid.com</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { api } from '@/services.js'

export default {
  name: "MyCart",
  data() {
    return {
      idUser: this.$store.state.user.id,
      myCart: null,
    };
  },
  methods: {
    getMyCart() {
      api.get(`/user/${this.idUser}/orders`).then((r) => {
          this.myCart = r.data.body;

          for(let i = 1; i < this.myCart.length; i++) {
            this.getProduct(this.myCart[i].products[0].product_id);
          }
      }, (error) => {
        if (error.response.status === 400) {
          alert('Você não efetuou nenhuma compra')
        }
      });
    },
    getProduct(idProduto) {
      return api.get(`/product/${idProduto}/`).then((r) => {
          let dataProduct = 0;

          console.log(r.data.body.length)

          for(let i = 1; i < r.data.body.length; i++) {
            dataProduct = {
              name: 'teste'
            }
          }

          console.log(dataProduct);
      }, (error) => {
        if (error.response.status === 400) {
          alert('Você não efetuou nenhuma compra')
        }
      });
    }
  },
  created() {
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

.producty {
  display: grid;
  grid-template-columns: minmax(100px,200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}
</style>