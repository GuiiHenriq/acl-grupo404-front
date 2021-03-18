<template>
  <div class="content">
    <form class="form-login">
      <h2>Registro</h2>

      <p> 
        <label for="name_login">Nome:</label>
        <input id="name_login" name="name_login" required="required" type="text" placeholder="Gabriel" v-model="name"/>
      </p>

      <p> 
        <label for="email_login">E-mail:</label>
        <input id="email_login" name="email_login" required="required" type="email" placeholder="meuemail@gmail.com" v-model="email"/>
      </p>

      <p> 
        <label for="phone_login">Telefone:</label>
        <input id="phone_login" name="phone_login" required="required" type="phone" placeholder="11912341234" v-model="phone"/>
      </p>

      <p> 
        <label for="user_login">Usuário:</label>
        <input id="user_login" name="user_login" required="required" type="text" placeholder="gabriel" v-model="user"/>
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

    <div class="alert-sucess" v-show="active">
      <section>
        <h2>USUÁRIO CADASTRADO</h2>
        <router-link :to="{ path: '/login' }" title="Ir para Página de Cadastro">Faça o Login</router-link>
        <button @click="active = false">X</button>
      </section>
    </div>
  </div>
</template>

<script>
import { api } from '@/services.js'

export default {
  name: 'RegisterUser',
  data() {
    return {
      active: false,
      name: null,
      email: null,
      phone: null,
      user: null,
      pass: null,
    };
  },
  methods: {
    createUser() {
      if(this.name == null || this.name.length < 3) return alert('Nome inválido!');
      if(this.email == null) return alert('E-mail inválido');
      if(this.phone == null) return alert('Telefone inválido');
      if(this.pass == null || this.pass.length < 4) return alert('Sua senha deve ter pelo menos 4 caracteres!');

      const dataUser = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        login: this.user,
        password: this.pass,
        enabled: 1
      };

      console.log(dataUser);
      
      return api.post(`/user`, dataUser).then(() => {
        console.log('Criado!');
        this.active = true;
      }, (error) => {
        if (error.response.status === 400) {
          alert('Falha no cadastro!')
        }
      });
    }
  },
  created() {
    if(this.$store.state.login) {
      this.$router.push('/dashboard');
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

.alert-sucess {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.alert-sucess section {
  position: relative;
  width: 40%;
  height: 40vh;
  background: rgba(0,0,0,0.9);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.alert-sucess h2 {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
}

.alert-sucess a {
  text-decoration: underline;
  font-weight: 300;
}

.alert-sucess button{
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
}
</style>
