<template>
  <main>
    <div class="dashboard" v-if="this.$store.state.user">
      <h2>Olá, <strong>{{this.$store.state.user.name}}</strong></h2>

      <button @click="logOut()">SAIR</button>
    </div>
  </main>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
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
.dashboard {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.dashboard h2 {
  font-size: 36px;
}

.dashboard h2 strong {
  font-weight: bold;
}

.dashboard button {
  margin-top: 20px;
  background-color: #333;
  padding: 10px 20px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.dashboard button:hover {
  background-color: #000;
}
</style>