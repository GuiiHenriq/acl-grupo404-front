<template>
  <div class="error-404">
    <router-link :to="{ path: '/' }" title="Ir para Página Inicial">VOLTAR PARA HOME</router-link>

    <img src="../../public/assets/404-error.svg" alt="Imagem Ilustrativa de Não Encontrado">
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
    };
  },
  methods: {
  },
  created() {
  }
}
</script>

<style scoped>
.error-404 {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error-404 a {
  font-weight: bold;
  text-decoration: underline;
  color: #C2185B;
}

.error-404 img {
  max-width: 600px;
}
</style>
