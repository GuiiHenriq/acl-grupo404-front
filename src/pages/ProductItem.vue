<template>
  <div class="products-container">
    <section v-if="dataProduct">
      <div class="product" v-for="(product, index) in dataProduct" :key="index">
        <ul class="photos">
          <li><img class="thumbnail" src="../assets/thumbnail.jpg" alt=""></li>
        </ul>
        <div class="info">
          <h2 class="name">{{product.name}}</h2>
          <h3 class="price">{{product.price | priceNumber}}</h3>
          <p class="description">{{product.description}}</p>
          <button class="btn" @click="buyItem()">Comprar</button>

          <div>
            <input type="checkbox" id="change_address" name="change_address" v-model="checked">
            <label class="checkbox-address" for="change_address">Mudar endereço de entrega?</label>
          </div>

          <div v-show="checked">
            <form class="form-login">
              <label for="zipcode_login">Cep:</label>
              <input id="zipcode_login" name="zipcode_login" required="required" type="number" placeholder="04660-006" v-model="addressUser.zipCode" @keyup="getCep()"/> 

              <label for="street_login">Rua:</label>
              <input id="street_login" name="street_login" required="required" type="text" placeholder="Avenida Interlagos" v-model="addressUser.street"/> 

              <label for="number_login">Numero:</label>
              <input id="number_login" name="number_login" required="required" type="text" placeholder="3172" v-model="addressUser.number"/> 

              <label for="district_login">Bairro:</label>
              <input id="district_login" name="district_login" required="required" type="text" placeholder="Interlagos" v-model="addressUser.district"/> 

              <label for="city_login">Cidade:</label>
              <input id="city_login" name="city_login" required="required" type="text" placeholder="São Paulo" v-model="addressUser.city"/> 

              <label for="state_login">Estado:</label>
              <input id="state_login" name="state_login" required="required" type="text" placeholder="SP" v-model="addressUser.state"/>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { api, getCep } from '@/services.js'

export default {
  name: "ProductItem",
  props: ["id"],
  data() {
    return {
      checked: false,
      teste: null,
      dataProduct: "",
      addressUser: {
        zipCode: null,
        street: null,
        number: null,
        district: null,
        city: null,
        state: null,
      }
    };
  },
  methods: {
    getProduct() {
      return api.get(`/product/${this.id}`).then((r) => {
        this.dataProduct = r.data.body;
      }, (error) => {
        if (error.response.status === 400) {
          alert('Falha ao cadastrar produto!')
        }
      });
    },
    changeAddress() {
      const addressUser = {
        zipCode: this.addressUser.zipCode,
        street: this.addressUser.street,
        number: this.addressUser.number,
        district: this.addressUser.district,
        city: this.addressUser.city,
        state: this.addressUser.state,
      }

      console.log(addressUser);
    },
    buyItem() {
      const dataProduct = this.dataProduct;
      let qtyProduct = 0;

      for(let i = 0; i < dataProduct.length; i++) qtyProduct = dataProduct[i].qty = dataProduct[i].qty - 1;

      if(qtyProduct <= 0) return alert('Produto Esgotou') ;

      console.log(qtyProduct);
      console.log(this.dataProduct);

      if(this.checked) return this.changeAddress();
    },
    getCep() {
      const zipCode = this.addressUser.zipCode.replace(/\D/g, "");
      if(zipCode.length === 8) {
        getCep(zipCode).then(r => {
          this.addressUser.street = r.data.logradouro;
          this.addressUser.district = r.data.bairro;
          this.addressUser.city = r.data.localidade;
          this.addressUser.state = r.data.uf;
        })
      }
    },
  },
  created() {
    this.getProduct();
  }
}
</script>

<style scoped>
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

.checkbox-address {
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
