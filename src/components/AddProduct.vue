<template>
  <div>
    <section class="add-product">
      <h2>Adicionar Produto</h2>

      <form class="form-login">
        <label for="name_product">Nome:</label>
        <input id="name_product" name="name_product" required="required" type="text" placeholder="Camiseta" v-model="product.name"/>
        
        <label for="price_product">Preço (R$):</label>
        <input id="price_product" name="price_product" required="required" type="number" placeholder="1.200,00" v-model="product.price"/>
        
        <label for="photos_product">Fotos:</label>
        <input id="photos_product" name="photos_product" required="required" type="file" multiple="multiple" ref="photos"/>

        <label for="amount_product">Quantidade:</label>
        <input id="amount_product" name="amount_product" required="required" type="number" placeholder="10" v-model="product.amount"/>
        
        <label for="description_product">Descrição:</label>
        <textarea id="description_product" name="description_product" required="required" placeholder="1234" v-model="product.description"></textarea>
        
        <div class="button">
          <input type="submit" value="Adicionar Produto" @click.prevent="addProduct()"/> 
        </div>
      </form>
    </section>

    <section class="products">
      <h2>Meus Produtos</h2>
    </section>
  </div>
</template>

<script>
//import { api } from '@/services.js'

export default {
  name: "AddProduct",
  data() {
    return {
      idUser: this.$store.state.user.id,
      product: {
        name: null,
        price: null,
        photos: null,
        amount: null,
        description: null,
      }
    };
  },
  methods: {
    addProduct() {
      const form = new FormData();

      const photos = this.$refs.photos.files;
      for(let i = 0; i < photos.length; i++) {
        form.append(photos[i].name, photos[i]);
      }

      console.log(photos)
      console.log(photos.name)

      form.append("name", this.product.name);
      form.append("price", this.product.price);
      form.append("amount", this.product.amount);
      form.append("description", this.product.description);

      let object = {};
      form.forEach((value, key) => object[key] = value);
      //var json = JSON.stringify(object);
      const json = JSON.stringify(object);

      return console.log(json);

      /*const dataProduct = {
        name: this.product.name,
        price: this.product.price,
        photos: this.product.photos,
        amount: this.product.amount,
        description: this.product.description,
      }
      console.log(dataProduct)*/
    }
  },
  created() {
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

.form-login {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.form-login label {
  margin-right: 15px;
}

.form-login input,
.form-login textarea {
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

.form-login input:hover,
.form-login input:focus,
.form-login textarea:hover,
.form-login textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.20);
  border-color: #E91E63;
}

.form-login input[type="submit"] {
  padding: 10px 30px;
  background-color: #C2185B;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.form-login a {
  text-decoration: underline;
  font-weight: 700;
}

.form-login .button {
  grid-column: 2;
  margin-top: 10px;
}
</style>