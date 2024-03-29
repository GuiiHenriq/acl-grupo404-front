<template>
  <div>
    <section class="loading" v-show="showLoad">
      <div class="loader">Loading...</div>
    </section>

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

        <label for="sku_product">SKU:</label>
        <input id="sku_product" name="sku_product" required="required" type="text" placeholder="K55TR12TUT" v-model="product.sku"/>

        <label for="code_product">Código:</label>
        <input id="code_product" name="code_product" required="required" type="number" placeholder="008883333" v-model="product.code"/>
        
        <label for="description_product">Descrição:</label>
        <textarea id="description_product" name="description_product" required="required" placeholder="1234" v-model="product.description"></textarea>
        
        <div class="button">
          <input type="submit" value="Adicionar Produto" @click.prevent="addProduct()"/> 
        </div>
      </form>
      <p class="disclaimer">
        <b>OBS:</b> Não é aceito produtos em duplicidade, caso seu produto tiver o <b>NOME</b>, <b>SKU</b> ou <b>CÓDIGO</b> igual a outros Produtos, o mesmo não será aceito.
      </p>
    </section>

    <section class="products">
      <h2>Meus Produtos</h2>
      
      <ul v-if="userProduct">
        <li v-for="(product, index) in userProduct" :key="index">
          <div class="product">
            <div class="photo">
              <img class="thumbnail" :src="urlAPI + '/' + product.productImages[0].path" alt="">
            </div>
            <div class="infos">
              <p class="price">{{product.price | priceNumber}}</p>
              <router-link :to="{ path: `/product/${product.id}` }" title="Ir para Página do Produto"><h3 class="name">{{product.name}}</h3></router-link>
              <p class="description">{{product.description}}</p>

              <button class="delete" @click="deleteProduct(product.id)">
                <img src="../../public/assets/icon-delete.svg" alt="Ilustração Deletar">
              </button>
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
import { apiToken } from '@/services.js'

export default {
  name: "AddProduct",
  data() {
    return {
      showLoad: false,
      idUser: this.$store.state.user.id,
      tokenUser: this.$store.state.user.token,
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
      urlAPI: process.env.VUE_APP_URL_API,
    };
  },
  methods: {
    addProduct: async function() {
      const formData = new FormData();
      const photos = this.$refs.photos.files;

      if (
        (this.product.name === "" || !this.product.name) &&
        (this.product.price === "" || !this.product.price) &&
        (photos[0] === "" || !photos[0]) &&
        (this.product.amount === "" || !this.product.amount) &&
        (this.product.sku === "" || !this.product.sku) &&
        (this.product.code === "" || !this.product.code) &&
        (this.product.description === "" || !this.product.description)
      ) return alert('Preencha as Informações do Produto');
      if(this.product.name === "" || !this.product.name) return alert('Preencha o Nome do Produto');
      if(this.product.price === "" || !this.product.price) return alert('Preencha o Valor do Produto');
      if(photos[0] === "" || !photos[0]) return alert('Insira uma Imagem do Produto');
      if(this.product.amount === "" || !this.product.amount) return alert('Preencha a Quantidade do Produto');
      if(this.product.sku === "" || !this.product.sku) return alert('Preencha o SKU do Produto');
      if(this.product.code === "" || !this.product.code) return alert('Preencha o Código do Produto');
      if(this.product.description === "" || !this.product.description) return alert('Preencha a Descrição do Produto');

      const slugUrl = this.product.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w]+/g, '-').toLowerCase();

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

      this.showLoad = true;

      try {
        apiToken.post(`/product`, formData, this.tokenUser).then(() => {
          alert('Produto Cadastrado');
          this.getProductUser();

          this.product.name = "";
          this.product.price = "";
          this.product.amount = "";
          this.product.sku = "";
          this.product.code = "";
          this.product.description = "";
        });
      } catch(error) {
        alert('Falha ao cadastrar produto...');
      } finally {
        this.showLoad = false;
      }
    },
    getProductUser: async function() {
      this.showLoad = true;

      try {
        apiToken.get(`/user/${this.idUser}`, this.tokenUser).then((r) => {
          if(r.data.body[0].products.lenght < 0) return;
          this.userProduct = r.data.body[0].products;
        });
      } catch(error) {
        alert('Falha ao localizar Produtos...');
      } finally {
        this.showLoad = false;
      }
    },
    deleteProduct: async function(idProduct) {
      const confirm = window.confirm('Deseja deletar esse produto?');

      if(!confirm) return; 

      this.showLoad = true;
      
      try {
        apiToken.delete(`/product/${idProduct}`, this.tokenUser).then(() => {
          this.getProductUser();
        });
      } catch(error) {
        alert('Falha ao deletar produto...');
      } finally {
        this.showLoad = false;
      }
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

.content button {
  position: absolute;
}

.add-product {
  margin-bottom: 60px;
}

.add-product .disclaimer {
  text-align: center;
}

.add-product .disclaimer b {
  font-weight: 700;
}

.form-login {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
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
  padding-bottom: 20px;
  margin-top: 20px;
  position: relative;
  border-bottom: 1px solid #ccc;
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
  .form-login {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .form-login textarea {
    width: 90%;
  }

  .product {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }

  .product .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>