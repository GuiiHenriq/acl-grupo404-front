<template>
  <main class="dashboard">
    <h2>Olá, <strong>{{this.$store.state.user.name}}</strong></h2>

    <div class="content" v-if="this.$store.state.user">
      <nav>
        <button @click="addProduct = true;myCharts = false;mySales = false;myCart = false;myAddress = false;editUser = false;myInformation = false">CADASTRAR PRODUTO</button>
        <button @click="myCart = true;myCharts = false;addProduct = false;mySales = false;myAddress = false;editUser = false;myInformation = false">MINHAS COMPRAS</button>
        <button @click="mySales = true;myCart = false;myCharts = false;addProduct = false;myAddress = false;editUser = false;myInformation = false">MINHAS VENDAS</button>
        <button @click="myAddress = true;myCharts = false;addProduct = false;mySales = false;myCart = false;editUser = false;myInformation = false;">MEUS ENDEREÇOS</button>
        <button @click="myCharts = true;myCart = false;addProduct = false;mySales = false;myAddress = false;editUser = false;myInformation = false">GRÁFICOS DE VENDA</button>
        <button @click="editUser = true;myCharts = false;addProduct = false;mySales = false;myCart = false;myAddress = false;myInformation = false">EDITAR USUÁRIO</button>
        <button @click="myInformation = true;addProduct = false;mySales = false;myAddress = false;myCart = false;editUser = false;myCharts = false">CÓDIGO DE CONDUTA</button>
        <button @click="logOut()">SAIR</button>
      </nav>

      <section>
        <AddProduct v-if="addProduct" />
        <MyCart v-if="myCart" />
        <MySales v-if="mySales" />
        <MyCharts v-if="myCharts" />
        <MyAddress v-if="myAddress" />
        <MyInformation v-if="myInformation" />
        <EditUser v-if="editUser" />
      </section>
    </div>
  </main>
</template>

<script>
import AddProduct from '@/components/AddProduct';
import MyCart from '@/components/MyCart';
import MySales from '@/components/MySales';
import MyCharts from '@/components/MyCharts';
import MyAddress from '@/components/MyAddress';
import MyInformation from '@/components/MyInformation';
import EditUser from '@/components/EditUser';

export default {
  name: "Dashboard",
  components: {
    AddProduct,
    MyCart,
    MySales,
    MyCharts,
    MyAddress,
    MyInformation,
    EditUser,
  },
  data() {
    return {
      addProduct: true,
      myCart: false,
      mySales: false,
      myCharts: false,
      myAddress: false,
      myInformation: false,
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

body {
  background-color:rgb(247, 246, 243);
}

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