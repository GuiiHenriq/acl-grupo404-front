<template>
  <div class="content">
    <form class="form-login">
      <h2>Registro</h2>

      <label for="name_login">Nome:</label>
      <input id="name_login" name="name_login" required="required" type="text" placeholder="Gabriel" v-model="name"/>

      <label for="email_login">E-mail:</label>
      <input id="email_login" name="email_login" required="required" type="email" placeholder="meuemail@gmail.com" v-model="email"/>

      <label for="phone_login">Telefone:</label>
      <input id="phone_login" name="phone_login" required="required" type="phone" placeholder="11912341234" v-model="phone"/>

      <label for="user_login">Usuário:</label>
      <input id="user_login" name="user_login" required="required" type="text" placeholder="gabriel" v-model="user"/>

      <label for="pass_login">Senha:</label>
      <input id="pass_login" name="pass_login" required="required" type="password" placeholder="4321" v-model="pass"/>

      <label for="typeAddress_login">Tipo de Endereço:</label>
      <input id="typeAddress_login" name="typeAddress_login" required="required" type="text" placeholder="Trabalho" v-model="typeAddress"/> 

      <label for="zipcode_login">Cep:</label>
      <input id="zipcode_login" name="zipcode_login" required="required" type="number" placeholder="04660-006" v-model="zipCode" @keyup="getCep()"/> 

      <label for="street_login">Rua:</label>
      <input id="street_login" name="street_login" required="required" type="text" placeholder="Avenida Interlagos" v-model="street"/> 

      <label for="number_login">Numero:</label>
      <input id="number_login" name="number_login" required="required" type="text" placeholder="3172" v-model="number"/>

      <label for="complement_login">Complemento:</label>
      <input id="complement_login" name="complement_login" required="required" type="text" placeholder="Ap 35" v-model="complement"/> 

      <label for="district_login">Bairro:</label>
      <input id="district_login" name="district_login" required="required" type="text" placeholder="Interlagos" v-model="district"/> 

      <label for="city_login">Cidade:</label>
      <input id="city_login" name="city_login" required="required" type="text" placeholder="São Paulo" v-model="city"/> 

      <label for="state_login">Estado:</label>
      <input id="state_login" name="state_login" required="required" type="text" placeholder="SP" v-model="state"/>
           
      <div class="button">
        <input type="submit" value="Cadastrar" @click.prevent="createUser()"/> 
      </div>
           
      <p class="link">
        Já tem uma conta?
        <router-link :to="{ path: '/login' }" title="Ir para Página de Cadastro">Faça o Login</router-link>
      </p>
    </form>

    <div class="alert-sucess" v-if="active">
      <section>
        <h2>USUÁRIO CADASTRADO</h2>
        <router-link :to="{ path: '/login' }" title="Ir para Página de Cadastro">Faça o Login</router-link>
        <button @click="active = false">X</button>
      </section>
    </div>
  </div>
</template>

<script>
import { api, getCep } from '@/services.js'

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
      typeAddress: null,
      zipCode: null,
      street: null,
      number: null,
      complement: null,
      district: null,
      city: null,
      state: null,
    };
  },
  methods: {
    getCep() {
      const zipCode = this.zipCode.replace(/\D/g, "");
      if(zipCode.length === 8) {
        getCep(zipCode).then(r => {
          this.street = r.data.logradouro;
          this.district = r.data.bairro;
          this.city = r.data.localidade;
          this.state = r.data.uf;
        })
      }
    },
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
        enabled: 1,
        user_address: [
          {
            type_name: this.typeAddress,
            cep: this.zipCode,
            street: this.street,
            number: this.number,
            complement: this.complement,
            district: this.district,
            city: this.city,
            state: this.state
          }
        ]
      };

      console.log(dataUser)
      
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
  text-align: center;
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

.form-login .link {
  text-align: center;
}

.alert-sucess {
  background: rgba(0,0,0,0.9);
  position: fixed;
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
