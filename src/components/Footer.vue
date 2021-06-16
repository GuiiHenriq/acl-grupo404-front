<template>
  <footer class="footer">
    <div class="infos">
      <router-link :to="{ path: '/' }" title="Ir para Página Inicial">LOJA 404</router-link>
      <p>-</p>
      <router-link :to="{ path: '/contato' }" title="Ir para Página Contato">CONTATO</router-link>
    </div>

    <div class="social">
      <a href="https://www.facebook.com/" target="_blank">
        <img src="../../public/assets/icon-facebook.svg" alt="Ícone Facebook">
      </a>

      <a href="https://twitter.com/" target="_blank">
        <img src="../../public/assets/icon-twitter.svg" alt="Ícone Twitter">
      </a>

      <a href="https://www.instagram.com/" target="_blank">
        <img src="../../public/assets/icon-instagram.svg" alt="Ícone Instagram">
      </a>
    </div>
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
  min-height: 90px;
  padding: 15px 20px;
  background: #C2185B;
  margin-top: 100px;
  position: relative;
}

.footer .infos a {
  font-size: 18px;
  font-weight: 300;
  color: #fff;
  text-decoration: underline;
}

.footer .infos p {
  font-size: 18px;
  font-weight: 300;
  color: #fff;
  margin: 0 8px;
}

.footer img {
  width: 30px;
}

.footer .infos {
  display: flex;
  flex-direction: row;
}

.footer .social {
  position: absolute;
  right: 20px;
}

.footer .social a {
  margin-left: 8px;
}

.footer .social a:first-child {
  margin-left: 0;
}

/* =========== RESPONSIVE =========== */
@media only screen and (max-width: 768px) {
  .footer {
    padding: 15px 0;
    position: initial;
    flex-direction: column;
  }

  .footer .infos a {
    text-align: center;
    font-size: 16px;
  }

  .footer .social {
    margin-top: 20px;
    position: initial;
    right: 0;
  }
}
</style>