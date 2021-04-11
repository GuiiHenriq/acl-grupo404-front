<template>
  <div class="content">
    <form class="form-login"> 
      <h2>Login</h2> 

      <p> 
        <label for="email_login">E-mail:</label>
        <input id="email_login" name="email_login" required="required" type="email" placeholder="meuemail@gmail.com" v-model="email"/>
      </p>
           
      <p> 
        <label for="pass_login">Senha:</label>
        <input id="pass_login" name="pass_login" required="required" type="password" placeholder="1234" v-model="pass"/> 
      </p>
           
      <p> 
        <input type="submit" value="Logar" @click.prevent="loginUser()"/> 
      </p>
           
      <p class="link">
        Ainda não tem conta?
        <router-link :to="{ path: '/register' }" title="Ir para Página de Cadastro">Cadastre-se</router-link>
      </p>
    </form>
  </div>
</template>

<script>
//import { api } from '@/services.js'

export default {
  name: 'LoginUser',
  data() {
    return {
      email: null,
      pass: null,
    };
  },
  methods: {
    async loginUser() {
      if(this.email == null) return alert('E-mail inválido');
      if(this.pass == null || this.pass.length < 4) return alert('Sua senha deve ter pelo menos 4 caracteres!');

      const dataUser = {
        email: this.email,
        password: this.pass
      };

      try {
        await this.$store.dispatch("getUsuario", dataUser);
        await this.$router.push({ name: 'Dashboard'});
      } catch(error){
        console.log(error);
      }
      
      /*return api.post(`/user/login`, dataUser).then((r) => {
        const dataUser = {
          id: r.data.id,
          name: r.data.name,
          email: r.data.email,
        };

        if(r.data.login) {
          console.log('Logado!')
          this.$router.push({ name: 'Dashboard', params: { data: dataUser } })
          window.localStorage.setItem('user', JSON.stringify(dataUser));
        } else {
          console.log('Usuário não encontrado!');
        }
      });*/
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
  border-radius: 4px;
  border: 1px solid #fff;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.10);
  transition: all .3s;
  font-size: 1rem;
  font-family: Avenir,Helvetica,Arial,sans-serif;
  margin-bottom: 15px;
  width: 100%;
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

/* ============= RESPONSIVE ============= */
@media only screen and (max-width: 768px) {
  .form-login {
    padding: 0;
    box-shadow: none;
    background: none;
    max-width: initial;
  }

  .form-login input {
    margin-bottom: 35px;
  }
}
</style>
