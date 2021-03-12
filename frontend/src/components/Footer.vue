<template>
  <footer class="footer">
    <p>
      Projeto Desenvolvido por
      <a
        href="https://github.com/guiihenriq"
        target="_blank"
        title="Ir para Github"
        >Guilherme Henrique</a
      >
      para Teste Técnico Keyrus
    </p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 60px;
  padding: 15px 20px;
  background: #e80;
  margin-top: 100px;
}

.footer p {
  font-size: 18px;
  font-weight: 300;
  color: #fff;
}

.footer p a {
  text-decoration: underline;
}

/* =========== RESPONSIVE =========== */
@media only screen and (max-width: 768px) {
  .footer {
    padding: 15px 0;
  }

  .footer p {
    text-align: center;
    padding: 0 20px;
    font-size: 16px;
  }
}
</style>