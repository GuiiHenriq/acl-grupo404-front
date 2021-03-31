<template>
  <header class="header">
    <h1>
      <router-link :to="{ path: '/' }" title="Ir para Página Inicial">LOJA</router-link>
    </h1>

    <p v-if="getNameUser">
      <router-link :to="{ path: '/dashboard' }" title="Ir para Página de Dashboard">{{getNameUser}}</router-link>
    </p>

    <p v-else>
      <router-link :to="{ path: '/login' }" title="Ir para Página de Login">LOGIN</router-link>
    </p>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
    };
  },
  computed: {
    getNameUser() {
      return this.$store.state.user.name;
    }
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 100px;
  box-shadow: 0 2px 4px rgb(30, 60, 90, 0.1);
}

.header h1 {
  color: #E91E63;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -3px;
}

.header p {
  color: #E91E63;
  font-weight: 300;
  text-decoration: underline;
}

.header p a{
  text-transform: uppercase;
  font-weight: bold;
}

/* ============= RESPONSIVE ============= */
@media only screen and (max-width: 768px) {
  .header {
    padding: 15px;
    margin-bottom: 50px;
  }
}
</style>