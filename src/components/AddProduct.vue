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
        <input id="photos_product" name="photos_product" required="required" type="file" accept="image/x-png,image/gif,image/jpeg" ref="photos"/>

        <label for="amount_product">Quantidade:</label>
        <input id="amount_product" name="amount_product" required="required" type="number" placeholder="10" v-model="product.amount"/>

        <label for="sku_product">Sku:</label>
        <input id="sku_product" name="sku_product" required="required" type="text" placeholder="K55TR12TUT" v-model="product.sku"/>

        <label for="code_product">Code:</label>
        <input id="code_product" name="code_product" required="required" type="number" placeholder="008883333" v-model="product.code"/>
        
        <label for="description_product">Descrição:</label>
        <textarea id="description_product" name="description_product" required="required" placeholder="1234" v-model="product.description"></textarea>
        
        <div class="button">
          <input type="submit" value="Adicionar Produto" @click.prevent="addProduct()"/> 
        </div>
      </form>
    </section>

    <section class="products">
      <h2>Meus Produtos</h2>

      <ul v-if="userProduct">
        <li v-for="(product, index) in userProduct" :key="index">
          <div class="product">
            <div class="photo">
              <img class="thumbnail" :src="'http://localhost:2000/' + product.productImages[0].path" alt="">
            </div>
            <div class="infos">
              <p class="price">{{product.price | priceNumber}}</p>
              <router-link :to="{ path: `/product/${product.id}` }" title="Ir para Página do Produto"><h3 class="name">{{product.name}}</h3></router-link>
              <p class="description">{{product.description}}</p>

              <button class="delete" @click="deleteProduct(product.id)">DELETAR</button>
            </div>
          </div>
        </li>
      </ul>

      <div v-else>
        <h2>Você não tem nenhum produto cadastrado</h2>
      </div>
    </section>
  </div>
</template>

<script>
import { api } from '@/services.js'

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
        sku: null,
        code: null,
        description: null,
      },
      userProduct: null,
    };
  },
  methods: {
    addProduct() {
      const formData = new FormData();
      const slugUrl = this.product.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w]+/g, '-').toLowerCase();
      const photos = this.$refs.photos.files;

      console.log(photos[0])

      formData.append("photos", photos[0]);
      formData.append("user_id", this.idUser);
      formData.append("name", this.product.name);
      formData.append("active", true);
      formData.append("slug_url", slugUrl);
      formData.append("price", this.product.price);
      formData.append("qty", this.product.amount);
      formData.append("sku", this.product.sku);
      formData.append("code", this.product.code);
      formData.append("description", this.product.description);

      return api.post(`/product`, formData).then(() => {
        console.log('Produto Cadastrado!');
        this.getProductUser();
      }, (error) => {
        if (error.response.status === 400) {
          alert('Falha ao cadastrar produto!')
        }
      });

      //let object = {};
      //formData.forEach((value, key) => object[key] = value);
      //var json = JSON.stringify(object);
    },
    getProductUser() {
      return api.get(`/user/${this.idUser}`).then((r) => {
        if(r.data.body[0].products.lenght < 0) return;
        this.userProduct = r.data.body[0].products;
      }, (error) => {
        if (error.response.status === 400) {
          console.log('Nenhum produto cadastrado!')
        }
      });
    },
    deleteProduct(idProduct) {
      const confirm = window.confirm('Deseja deletar esse produto?');

      if(!confirm) return; 
      
      return api.delete(`/product/${idProduct}`).then(() => {
          this.getProductUser();
      }, (error) => {
        if (error.response.status === 400) {
          console.log('Nenhum produto cadastrado!')
        }
      });
    }
  },
  beforeCreate() {
    if(!this.$store.state.login) {
      this.$router.push('/');
    }
  },
  created() {
    this.getProductUser();
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
  resize: none;
}

.form-login textarea {
  width: auto;
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

.product {
  display: grid;
  grid-template-columns: minmax(100px,200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

.product .photo {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}

.product .thumbnail {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.product .infos {
  align-self: center;
}

.product .infos h3 {
  text-decoration: underline;
  color: #C2185B;
}


.product .infos h3 {
  font-weight: 700;
  color: #C2185B;
  margin: 5px 0;
  font-size: 20px;
}

/* ============= RESPONSIVE ============= */
@media only screen and (max-width: 768px) {
  .product {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
}
</style>