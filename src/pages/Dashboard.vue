<template>
  <main class="dashboard">
    <h2>Olá, <strong>{{this.$store.state.user.name}}</strong></h2>

    <div class="content" v-if="this.$store.state.user">
      <nav>
        <button @click="addProduct = true;mySales = false;myCart = false;editUser = false">CADASTRAR PRODUTO</button>
        <button @click="mySales = true;addProduct = false;myCart = false;editUser = false">MINHAS VENDAS</button>
        <button @click="myCart = true;addProduct = false;mySales = false;editUser = false">MINHAS COMPRAS</button>
        <button @click="editUser = true;addProduct = false;mySales = false;myCart = false">EDITAR USUÁRIO</button>
        <button @click="logOut()">SAIR</button>
      </nav>

      <section>
        <AddProduct v-show="addProduct" />
        <MySales v-show="mySales" />
        <MyCart v-show="myCart" />
        <EditUser v-show="editUser" />
      </section>
    </div>
  </main>
</template>

<script>
import AddProduct from '@/components/AddProduct';
import MySales from '@/components/MySales';
import MyCart from '@/components/MyCart';
import EditUser from '@/components/EditUser';

export default {
  name: "Dashboard",
  components: {
    AddProduct,
    MySales,
    MyCart,
    EditUser,
  },
  data() {
    return {
      addProduct: true,
      mySales: false,
      myCart: false,
      editUser: false,
    };
  },
  props: ["data"],
  methods: {
    logOut() {
      window.localStorage.removeItem('user');
      this.$store.dispatch("deslogarUsuario");
      this.$router.push('/login');
    }
  },
  created() {
    if(!this.$store.state.login) {
      this.$router.push('/');
    }
  },
}
</script>

<style>
.dashboard h2 {
  font-size: 36px;
  text-align: center;
}

.dashboard h2 strong {
  font-weight: bold;
}

.content {
  display: grid;
  grid-template-columns: minmax(140px,200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  grid-gap: 30px;
  padding: 20px;
}

.content nav {
  display: flex;
  flex-direction: column;
}

.content button {
  margin-top: 20px;
  background-color: #C2185B;
  padding: 10px 20px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.content button:hover {
  background-color: #000;
}

.content button:first-of-type {
  margin-top: 0;
}

/* ============= RESPONSIVE ============= */
@media only screen and (max-width: 768px) {
  .content {
    grid-template-columns: 1fr;
    margin: 0 auto;
  }
}
</style>