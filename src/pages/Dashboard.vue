<template>
  <main>
    <div v-if="dataUserLogged">
      <h2>Bem-vindo <strong>{{dataUserLogged.name}}</strong></h2>
    </div>
  </main>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      dataUserLogged: null
    };
  },
  props: ["data"],
  methods: {
    viewData() {
      console.log(this.data);
      this.dataUserLogged = this.data;
    }
  },
  created() {
    this.viewData();

    if(!this.dataUserLogged) {
      this.$router.push('/');
    }
  },
}
</script>

<style>

</style>