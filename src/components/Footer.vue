<template>
  <footer class="footer">
    <p>
      Loja 404
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
  background: #C2185B;
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