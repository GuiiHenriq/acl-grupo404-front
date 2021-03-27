<template>
  <div class="products-container">
    <h2 class="title">Lista de Produtos</h2>

    <div class="products">
      <div class="product">
        <img class="thumbnail" src="../assets/thumbnail.jpg" alt="">
        <p class="price">R$ 2.300,00</p>
        <h2 class="name">Notebook</h2>
        <p class="description">Gostaria de enfatizar que o início da atividade geral de formação de atitudes pode nos levar a considerar.</p>
      </div>

      <div class="product">
        <img class="thumbnail" src="../assets/thumbnail.jpg" alt="">
        <p class="price">R$ 2.300,00</p>
        <h2 class="name">Notebook</h2>
        <p class="description">Gostaria de enfatizar que o início da atividade geral de formação de atitudes pode nos levar a considerar.</p>
      </div>

      <div class="product">
        <img class="thumbnail" src="../assets/thumbnail.jpg" alt="">
        <p class="price">R$ 2.300,00</p>
        <h2 class="name">Notebook</h2>
        <p class="description">Gostaria de enfatizar que o início da atividade geral de formação de atitudes pode nos levar a considerar.</p>
      </div>

      <div class="product">
        <img class="thumbnail" src="../assets/thumbnail.jpg" alt="">
        <p class="price">R$ 2.300,00</p>
        <h2 class="name">Notebook</h2>
        <p class="description">Gostaria de enfatizar que o início da atividade geral de formação de atitudes pode nos levar a considerar.</p>
      </div>

      <div class="product">
        <img class="thumbnail" src="../assets/thumbnail.jpg" alt="">
        <p class="price">R$ 2.300,00</p>
        <h2 class="name">Notebook</h2>
        <p class="description">Gostaria de enfatizar que o início da atividade geral de formação de atitudes pode nos levar a considerar.</p>
      </div>

      <div class="product">
        <img class="thumbnail" src="../assets/thumbnail.jpg" alt="">
        <p class="price">R$ 2.300,00</p>
        <h2 class="name">Notebook</h2>
        <p class="description">Gostaria de enfatizar que o início da atividade geral de formação de atitudes pode nos levar a considerar.</p>
      </div>
    </div>
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
.products-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.products-container .title {
  text-align: center;
  font-weight: 700;
  color: #C2185B;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-size: 24px;
}

.products {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-gap: 30px;
  margin: 30px;
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.10);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all .2s;
}

.product .thumbnail {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 20px;
}

.product .price {
  color: #C2185B;
  font-weight: 700;
}

.product .name {
  margin: 10px 0;
  font-weight: 700;
  font-size: 24px;
}

/* ============= RESPONSIVE ============= */
@media only screen and (max-width: 768px) {
  .products {
    grid-template-columns: repeat(2,1fr);
    grid-gap: 10px;
    margin: 10px;
  }
}
</style>
