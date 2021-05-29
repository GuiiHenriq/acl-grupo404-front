<template>
  <div class="products-container">
    <section class="loading" v-show="showLoad">
      <div class="loader">Loading...</div>
    </section>

    <section v-if="dataProduct">
      <div class="product" v-for="(product, index) in dataProduct" :key="index" :data-id="product.id" :data-qty="product.qty" ref="item">
        <ul class="photos">
          <li><img class="thumbnail" :src="'http://18.229.144.246:2000/' + product.productImages[0].path" alt=""></li>
        </ul>
        <div class="info">
          <h2 class="name">{{product.name}}</h2>
          <h3 class="price" :data-price="product.price" ref="price">{{product.price | priceNumber}}</h3>
          <p class="description">{{product.description}}</p>

          <div class="quantity-toggle">
            <button @click="decrement()">&mdash;</button>
            <input type="text" :value="quantity">
            <button @click="increment()">&#xff0b;</button>
          </div>
          <p class="qty">Quantidade Disponível: {{product.qty}}</p>


          <button class="btn" @click="buyItem()">Comprar</button>

          <div v-if="userStore" class="address-user">
            <h3>Selecione seu Endereço</h3>
            <div v-for="(address, index) in addressUser" :key="index">
              <input type="radio" :id="address.id" :name="address.id" :value="address.id" v-model="addressId">
              <label :for="address.id">{{address.type_name}}</label>
              <p>{{address.street}}, {{address.number}} - {{address.district}}</p>
              <p>{{address.city}}/{{address.state}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { api, apiToken, getCep } from '@/services.js'

export default {
  name: "ProductItem",
  props: ["id"],
  data() {
    return {
      showLoad: false,
      checked: false,
      dataProduct: "",
      userStore: this.$store.state.login,
      idUser: this.$store.state.user.id,
      tokenUser: this.$store.state.user.token,
      quantity: 1,
      newAddressUser: {
        typeAddress: null,
        zipCode: null,
        street: null,
        number: null,
        complement: null,
        district: null,
        city: null,
        state: null,
      },
      addressUser: null,
      addressId: 0,
    };
  },
  methods: {
    increment () {
      this.quantity++;
    },
    decrement () {
      if(this.quantity === 1) {
        alert('Informe uma quantidade válida!')
      } else {
        this.quantity--;
      }
    },
    getProduct: async function() {
      this.showLoad = true;

      try {
        api.get(`/product/${this.id}`).then((r) => {
          this.dataProduct = r.data.body;
        });
      } catch(error) {
        alert('Falha ao localizar Produto...');
      } finally {
        this.showLoad = false;
      }
    },
    changeAddress: async function() {
      const addressUser = {
        user_id: this.idUser,
        type_name: this.newAddressUser.zipCode,
        cep: this.newAddressUser.zipCode,
        street: this.newAddressUser.street,
        complement: this.newAddressUser.complement,
        number: this.newAddressUser.number,
        district: this.newAddressUser.district,
        city: this.newAddressUser.city,
        state: this.newAddressUser.state,
      }

      this.showLoad = true;

      try {
        apiToken.post(`/user/address`, addressUser, this.tokenUser).then(() => {
          alert('Endereço Cadastrado');
        });
      } catch(error) {
        alert('Falha ao cadastrar Endereço...');
      } finally {
        this.showLoad = false;
      }
    },
    buyItem() {
      const qtyBuy = Number(this.$refs.item[0].dataset.qty);
      const qtyItem = this.quantity;
      const calcQty = qtyBuy - qtyItem;

      if(!this.userStore) return this.$router.push('/login');

      if(this.addressId == 0) return alert('Escolha seu endereço');

      if(calcQty > 0 || calcQty == 0) {
        this.updateQty(calcQty);
      } else {
        return alert('Quantidade Indisponível');
      }

      if(this.changeAddress == 'newAddress') this.changeAddress();

      this.dataItem();
    },
    getCep() {
      const zipCode = this.newAddressUser.zipCode.replace(/\D/g, "");
      if(zipCode.length === 8) {
        getCep(zipCode).then(r => {
          this.newAddressUser.street = r.data.logradouro;
          this.newAddressUser.district = r.data.bairro;
          this.newAddressUser.city = r.data.localidade;
          this.newAddressUser.state = r.data.uf;
        })
      }
    },
    getAddressUser: async function() {
      this.showLoad = true;

      try {
        apiToken.get(`/user/${this.idUser}`, this.tokenUser).then((r) => {
          this.addressUser = r.data.body[0].user_address;
        });
      } catch(error) {
        alert('Falha ao localizar endereço...');
      } finally {
        this.showLoad = false;
      }
    },
    dataItem: async function() {
      const priceItem = this.$refs.price[0].dataset.price;
      const idItem = this.$refs.item[0].dataset.id;

      const dataItem = {
        user_id: this.idUser,
        status_id: 1,
        user_address_id: this.addressId,
        total: priceItem * this.quantity,
        products: [
            {
              product_id: idItem,
              qty: this.quantity
            }
        ]
      }

      this.showLoad = true;

      try {
        apiToken.post(`/order`, dataItem, this.tokenUser).then(() => {
          this.$router.push('/success');
        });
      } catch(error) {
        alert('Falha ao comprar produto...');
      } finally {
        this.showLoad = false;
      }
    },
    updateQty: async function(qtyValue) {
      const idItem = this.$refs.item[0].dataset.id;

      const qtyItem = {
        qty: qtyValue
      }

      this.showLoad = true;

      try {
        apiToken.put(`/product/${idItem}`, qtyItem, this.tokenUser).then(() => {
          console.log('Quantidade Atualizado');
        });
      } catch(error) {
        alert('Falha ao atualizar quantidade...');
      } finally {
        this.showLoad = false;
      }
    }
  },
  created() {
    if(this.$store.state.login) {
      this.getAddressUser();
    }
    this.getProduct();
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

.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  padding: 60px 20px;
  margin: 0 auto;
}

.product .photos {
  grid-row: 1/3;
  list-style: none;
}

.product .photos img {
  width: 100%;
}

.product .info {
  position: sticky;
  top: 20px;
}

.product .name {
  font-size: 26px;
  font-weight: bold;
}

.product .price {
  color: #C2185B;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.product .description {
  font-size: 1.2rem;
  text-transform: capitalize;
}

.product .qty {
  margin-top: 5px;
}

.product .btn {
  margin: 60px 0;
  width: 200px;
  padding: 10px 30px;
  background: #C2185B;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.20);
  transition: all .3s;
  border: none;
  cursor: pointer;
}

.quantity-toggle {
  margin-top: 20px;
}

.checkbox-address label {
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
}

.form-login {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.form-login input {
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #fff;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.10);
  transition: all .3s;
  font-size: 1rem;
  font-family: Avenir,Helvetica,Arial,sans-serif;
  margin-bottom: 15px;
  width: 100%;
}

.form-login input[type="submit"] {
  padding: 10px 30px;
  background-color: #C2185B;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

pre {
  background: #eee;
  padding: 1rem;
  border-radius: 5px;
}

.quantity-toggle {
	display: flex;
}

 .quantity-toggle input {
	border: 0;
	border-top: 2px solid #C2185B;
	border-bottom: 2px solid #C2185B;
	width: 2.5rem;
	text-align: center;
	padding: 0 0.5rem;
  font-weight: 700;
}

 .quantity-toggle button {
	border: 2px solid #C2185B;
	padding: 0.6rem;
	background: #C2185B;
	color: #fff;
	font-size: 1rem;
	cursor: pointer;
}

.address-user h3 {
  font-weight: 700;
  color: #C2185B;
  margin-bottom: 30px;
  font-size: 26px;
}

.address-user div {
  border: 2px solid #333;
  border-radius: 4px;
  max-width: 300px;
  width: 100%;
  padding: 40px 20px;
  margin-bottom: 15px;
}

.address-user div label {
  font-weight: 700;
  color: #C2185B;
  margin-bottom: 5px;
  display: inline-block;
}


/* ============= RESPONSIVE ============= */
@media only screen and (max-width: 768px) {
  .product {
    grid-template-columns: 1fr;
  }

  .product .photos {
    grid-row: 2;
  }

  .product .info {
    position: static;
  }
  
  .product .photos img{
    margin-bottom: 30px;
    box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
    border-radius: 4px;
    max-width: 100%;
  }
}
</style>
