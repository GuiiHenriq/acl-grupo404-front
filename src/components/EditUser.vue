<template>
  <div>
    <h2>Editar Usuário</h2>

    <form class="form-login" v-show="active">
      <label for="name_login">Nome:</label>
      <input id="name_login" name="name_login" required="required" type="text" placeholder="Gabriel" v-model="user.name"/>

      <label for="email_login">E-mail:</label>
      <input id="email_login" name="email_login" required="required" type="email" placeholder="meuemail@gmail.com" v-model="user.email"/>

      <label for="phone_login">Telefone:</label>
      <input id="phone_login" name="phone_login" required="required" type="phone" placeholder="11912341234" v-model="user.phone"/>

      <label for="user_login">Usuário:</label>
      <input id="user_login" name="user_login" required="required" type="text" placeholder="gabriel" v-model="user.user"/>

      <label for="pass_login">Senha:</label>
      <input id="pass_login" name="pass_login" required="required" type="password" placeholder="1234" v-model="user.pass"/> 

      <label for="zipcode_login">Cep:</label>
      <input id="zipcode_login" name="zipcode_login" required="required" type="text" placeholder="04660-006" v-model="user.zipCode" @keyup="getCep()"/> 

      <label for="street_login">Rua:</label>
      <input id="street_login" name="street_login" required="required" type="text" placeholder="Avenida Interlagos" v-model="user.street"/> 

      <label for="number_login">Numero:</label>
      <input id="number_login" name="number_login" required="required" type="text" placeholder="3172" v-model="user.number"/> 

      <label for="district_login">Bairro:</label>
      <input id="district_login" name="district_login" required="required" type="text" placeholder="Interlagos" v-model="user.district"/> 

      <label for="city_login">Cidade:</label>
      <input id="city_login" name="city_login" required="required" type="text" placeholder="São Paulo" v-model="user.city"/> 

      <label for="state_login">Estado:</label>
      <input id="state_login" name="state_login" required="required" type="text" placeholder="SP" v-model="user.state"/> 
       
      <div class="button">
        <input type="submit" value="Salvar Dados" @click.prevent="updateUser()"/> 
      </div>
           
    </form>
  </div>
</template>

<script>
import { api, getCep } from '@/services.js'

export default {
  name: "EditUser",
  data() {
    return {
      active: false,
      idUser: this.$store.state.user.id,
      user: {
        name: null,
        email: null,
        phone: null,
        user: null,
        pass: null,
        zipCode: null,
        street: null,
        number: null,
        district: null,
        city: null,
        state: null,
      },
    };
  },
  methods: {
    getUser() {
      return api.get(`/user/${this.idUser}`).then((r) => {
        const dataUser = r.data.body[0];

        this.active = true;
        this.user.email = dataUser.email;
        this.user.name = dataUser.name;
        this.user.user = dataUser.login;
        this.user.phone = dataUser.phone;
      }, (error) => {
        if (error.response.status === 400) {
          alert('Usuário não encontrado!')
        }
      });
    },
    getCep() {
      const zipCode = this.user.zipCode.replace(/\D/g, "");
      if(zipCode.length === 8) {
        getCep(zipCode).then(r => {
          this.user.street = r.data.logradouro;
          this.user.district = r.data.bairro;
          this.user.city = r.data.localidade;
          this.user.state = r.data.uf;
        })
      }
    },
    updateUser() {
      const dataUser = {
        id: this.idUser,
        name: this.user.name,
        email: this.user.email,
        phone: this.user.phone,
        login: this.user.user,
      };

      console.log(dataUser)

      return api.put(`/user/${this.idUser}`, dataUser).then(() => {
        console.log('Dados alterados!');
        this.$store.commit("UPDATE_USUARIO", dataUser);
        window.localStorage.setItem('user', JSON.stringify(dataUser));
      }, (error) => {
        if (error.response.status === 400) {
          alert('Falha ao atualizar dados!')
        }
      });
    },
  },
  created() {
    this.getUser();
  }
}
</script>

<style scoped>
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