<template>
  <div>
    <section class="loading" v-show="showLoad">
      <div class="loader">Loading...</div>
    </section>

    <h2>Editar Usuário</h2>

    <form class="form-login" v-if="active">
      <label for="name_login">Nome:</label>
      <input id="name_login" name="name_login" required="required" type="text" placeholder="Gabriel" v-model="user.name"/>

      <label for="email_login">E-mail:</label>
      <input id="email_login" name="email_login" required="required" type="email" placeholder="meuemail@gmail.com" v-model="user.email"/>

      <label for="phone_login">Telefone:</label>
      <input id="phone_login" name="phone_login" required="required" type="phone" placeholder="11912341234" v-model="user.phone"/>

      <label for="user_login">Usuário:</label>
      <input id="user_login" name="user_login" required="required" type="text" placeholder="gabriel" v-model="user.user"/>
       
      <div class="button">
        <input type="submit" value="Salvar Dados" @click.prevent="updateUser()"/> 
      </div>
    </form>

    <div v-else>
      <h2>Nenhum dado encontrado</h2>
    </div>
  </div>
</template>

<script>
import { apiToken } from '@/services.js'

export default {
  name: "EditUser",
  data() {
    return {
      showLoad: false,
      active: false,
      idUser: this.$store.state.user.id,
      tokenUser: this.$store.state.user.token,
      user: {
        name: null,
        email: null,
        phone: null,
        user: null,
      },
    };
  },
  methods: {
    getUser: async function() {
      this.showLoad = true;

      try {
        apiToken.get(`/user/${this.idUser}`, this.tokenUser).then((r) => {
          const dataUser = r.data.body[0];

          this.active = true;
          this.user.email = dataUser.email;
          this.user.name = dataUser.name;
          this.user.user = dataUser.login;
          this.user.phone = dataUser.phone;

        });
      } catch(error) {
        alert('Falha ao encontrar usuário...');
      } finally {
        this.showLoad = false;
      }
      
    },
    updateUser: async function() {
      const dataUser = {
        id: this.idUser,
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        login: this.user.user,
      };

      this.showLoad = true;

      try {
        apiToken.put(`/user/${this.idUser}`, dataUser, this.tokenUser).then(() => {
          this.$store.commit("UPDATE_USUARIO", dataUser);
          window.localStorage.setItem('user', JSON.stringify(dataUser));
          alert('Dados Alterados!')
        });
      } catch(error) {
        alert('Falha ao atualizar dados...');
      } finally {
        this.showLoad = false;
      }
      
    },
  },
  created() {
    if(!this.$store.state.login) {
      this.$router.push('/');
    }
    this.getUser();
  }
}
</script>

<style scoped>
@import '../assets/styles/loader.scss';

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content h2 {
  font-weight: 700;
  color: #C2185B;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-size: 24px;
}

.form-login {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
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

.form-login input:hover, .form-login input:focus {
  outline: none;
  -webkit-box-shadow: 0 6px 12px rgb(30 60 90 / 20%);
  box-shadow: 0 6px 12px rgb(30 60 90 / 20%);
  border-color: #E91E63;
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

.form-login .button {
  grid-column: 2;
  margin-top: 10px;
}
</style>