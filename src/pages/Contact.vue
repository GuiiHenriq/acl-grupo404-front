<template>
  <div class="contact">
    <h2 class="title">Contato</h2>

    <div class="email">
      <img src="../../public/assets/icon-email.svg" alt="Ícone E-mail">
      <a href="mailto:contato@loja404.com.br">contato@loja404.com.br</a>
    </div>

    <div class="phone">
      <img src="../../public/assets/icon-phone.svg" alt="Ícone E-mail">
      <a href="tel:+5566060331">(11) 6606-0331</a>
    </div>
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
.contact {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.contact .title {
  text-align: center;
  font-weight: 700;
  color: #C2185B;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-size: 24px;
}

.contact img {
  width: 30px;
}

.contact .email,
.contact .phone {
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact .email {
  margin-bottom: 20px;
}

.contact .email a,
.contact .phone a {
  font-size: 20px;
  margin-left: 15px;
  text-decoration: underline;
}
</style>
