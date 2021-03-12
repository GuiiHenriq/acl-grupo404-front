<template>
  <div class="products">
    <h2>Lista de Produtos</h2>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
    };
  },
}
</script>

<style scoped>
.products {
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
}

.products h2 {
  font-weight: 700;
  color: #C2185B;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-size: 24px;
}
</style>
