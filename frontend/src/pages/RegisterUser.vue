<template>
  <div class="content">
    <form class="form-login" method="post" action="">
      <h2>Registro</h2>

      <p> 
        <label for="name_login">Nome:</label>
        <input id="name_login" name="name_login" required="required" type="text" placeholder="Gabriel" v-model="name"/>
      </p>

      <p> 
        <label for="email_login">E-mail:</label>
        <input id="email_login" name="email_login" required="required" type="text" placeholder="meuemail@gmail.com" v-model="email"/>
      </p>
           
      <p> 
        <label for="pass_login">Senha:</label>
        <input id="pass_login" name="pass_login" required="required" type="password" placeholder="1234" v-model="pass"/> 
      </p>
           
      <p> 
        <input type="submit" value="Cadastrar" @click.prevent="createUser()"/> 
      </p>
           
      <p class="link">
        Já tem uma conta?
        <router-link :to="{ path: '/login' }" title="Ir para Página de Cadastro">Faça o Login</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterUser',
  data() {
    return {
      name: null,
      email: null,
      pass: null,
    };
  },
  methods: {
    createUser() {
      const dataUser = {
        name: this.name,
        email: this.email,
        pass: this.pass
      };

      console.log(dataUser)
      
      return alert(`Usuário ${this.name} Cadastrado!!`);
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-login {
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  padding: 50px;
}

.form-login h2 {
  font-weight: 700;
  color: #C2185B;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-size: 24px;
}

.form-login label {
  margin-right: 15px;
}

.form-login input {
  margin-bottom: 15px;
}

.form-login input[type="submit"] {
  padding: 10px 30px;
  background-color: #C2185B;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}

.form-login a {
  text-decoration: underline;
  font-weight: 700;
}
</style>
