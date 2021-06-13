<template>
  <div>
    <section class="loading" v-show="showLoad">
      <div class="loader">Loading...</div>
    </section>

    <h2>Meus Endereços</h2>

    <button class="add" @click="activeAdd = true">ADICIONAR ENDEREÇO</button>

    <div v-if="addressUser" class="address-user">
      <div v-for="(address, index) in dataAddressUser" :key="index">
        <p class="type-address">{{address.type_name}}</p>
        <p class="street-address" v-if="address.complement">{{address.street}}, {{address.number}} {{address.complement}} - {{address.district}}</p>
        <p class="street-address" v-else>{{address.street}}, {{address.number}} - {{address.district}}</p>
        <p class="city-address">{{address.city}}/{{address.state}}</p>

        <button class="edit" @click="activeEdit = true, getAddressUnique(address.id)">EDITAR</button>
        <button class="delete" @click="deleteAddress(address.id)">DELETAR</button>

        <div class="modal-change-address" v-if="activeEdit">
          <section>
            <form class="form-login">
            <label for="typeAddress_user">Tipo de Endereço:</label>
            <input id="typeAddress_user" name="typeAddress_user" required="required" type="text" placeholder="Trabalho" v-model="editAddressUser.typeAddress"/>

            <label for="zipcode_user">Cep:</label>
            <input id="zipcode_user" name="zipcode_user" required="required" type="number" placeholder="04660-006" v-model="editAddressUser.zipCode" @keyup="getCep()"/> 

            <label for="street_user">Rua:</label>
            <input id="street_user" name="street_user" required="required" type="text" placeholder="Avenida Interlagos" v-model="editAddressUser.street"/> 

            <label for="number_user">Numero:</label>
            <input id="number_user" name="number_user" required="required" type="text" placeholder="3172" v-model="editAddressUser.number"/> 

            <label for="complement_user">Complemento:</label>
            <input id="complement_user" name="complement_user" required="required" type="text" placeholder="Ap 35" v-model="editAddressUser.complement"/>

            <label for="district_user">Bairro:</label>
            <input id="district_user" name="district_user" required="required" type="text" placeholder="Interlagos" v-model="editAddressUser.district"/> 

            <label for="city_user">Cidade:</label>
            <input id="city_user" name="city_user" required="required" type="text" placeholder="São Paulo" v-model="editAddressUser.city"/> 

            <label for="state_user">Estado:</label>
            <input id="state_user" name="state_user" required="required" type="text" placeholder="SP" v-model="editAddressUser.state"/>
            
            <div class="button">
              <input type="submit" value="Salvar Dados" @click.prevent="changeAddress(editAddressUser.id)"/> 
            </div>
          </form>

          <button class="close" @click="activeEdit = false">X</button>
          </section>
        </div>
      </div>
    </div>

    <div v-else>
      <h2>Nenhum endereço cadastrado</h2>
    </div>

    <div class="modal-change-address" v-if="activeAdd">
      <section>
        <form class="form-login">
          <label for="typeAddress_user">Tipo de Endereço:</label>
          <input id="typeAddress_user" name="typeAddress_user" required="required" type="text" placeholder="Trabalho" v-model="addAddressUser.typeAddress"/>

          <label for="zipcode_user">Cep:</label>
          <input id="zipcode_user" name="zipcode_user" required="required" type="number" placeholder="04660-006" v-model="addAddressUser.zipCode" @keyup="getCep()"/> 

          <label for="street_user">Rua:</label>
          <input id="street_user" name="street_user" required="required" type="text" placeholder="Avenida Interlagos" v-model="addAddressUser.street"/> 

          <label for="number_user">Numero:</label>
          <input id="number_user" name="number_user" required="required" type="text" placeholder="3172" v-model="addAddressUser.number"/> 

          <label for="complement_user">Complemento:</label>
          <input id="complement_user" name="complement_user" required="required" type="text" placeholder="Ap 35" v-model="addAddressUser.complement"/>

          <label for="district_user">Bairro:</label>
          <input id="district_user" name="district_user" required="required" type="text" placeholder="Interlagos" v-model="addAddressUser.district"/> 

          <label for="city_user">Cidade:</label>
          <input id="city_user" name="city_user" required="required" type="text" placeholder="São Paulo" v-model="addAddressUser.city"/> 

          <label for="state_user">Estado:</label>
          <input id="state_user" name="state_user" required="required" type="text" placeholder="SP" v-model="addAddressUser.state"/>
            
          <div class="button">
            <input type="submit" value="Salvar Dados" @click.prevent="addAddress()"/> 
          </div>
        </form>

        <button class="close" @click="activeAdd = false">X</button>
        </section>
      </div>
  </div>
</template>

<script>
import { apiToken, getCep } from '@/services.js';

export default {
  name: "MyAddress",
  data() {
    return {
      showLoad: false,
      activeEdit: false,
      activeAdd: false,
      idUser: this.$store.state.user.id,
      tokenUser: this.$store.state.user.token,
      addressUser: null,
      editAddressUser: {
        typeAddress: null,
        zipCode: null,
        street: null,
        number: null,
        complement: null,
        district: null,
        city: null,
        state: null,
        id: null,
      },
      addAddressUser: {
        typeAddress: null,
        zipCode: null,
        street: null,
        number: null,
        complement: null,
        district: null,
        city: null,
        state: null,
      },
    }
  },
  computed: {
    dataAddressUser() {
      return this.addressUser;
    }
  },
  methods: {
    getAddressUser: async function() {
      this.showLoad = true;

      try {
        apiToken.get(`/user/${this.idUser}`, this.tokenUser).then((r) => {
          this.addressUser = r.data.body[0].user_address;
        });
      } catch(error) {
        alert('Falha ao localizar endereço...');
      } finally {
        this.showLoad = false;
      }
    },
    deleteAddress: async function(idAddress) {
      const confirm = window.confirm('Deseja deletar esse endereço?');

      if(!confirm) return; 

      this.showLoad = true;
      
      try {
        apiToken.delete(`/user/address/${idAddress}`, this.tokenUser).then(() => {
          this.getAddressUser();
        });
      } catch(error) {
        alert('Nenhum endereço localizado...');
      } finally {
        this.showLoad = false;
      }
    },
    getAddressUnique: async function(idAddressUnique) {
      const findIdAddressUnique = function(user_address) {
        return user_address.id === idAddressUnique;
      }

      this.showLoad = true;

      try {
        apiToken.get(`/user/${this.idUser}`, this.tokenUser).then((r) => {
          const obj = r.data.body[0].user_address.find(findIdAddressUnique);

          this.editAddressUser.typeAddress = obj.type_name,
          this.editAddressUser.zipCode = obj.cep,
          this.editAddressUser.street = obj.street,
          this.editAddressUser.complement = obj.complement,
          this.editAddressUser.number = obj.number,
          this.editAddressUser.district = obj.district,
          this.editAddressUser.city = obj.city,
          this.editAddressUser.state = obj.state,
          this.editAddressUser.id = obj.id
        });
      } catch(error) {
        alert('Falha ao localizar usuário...');
      } finally {
        this.showLoad = false;
      }
    },
    getCep() {
      if(this.activeEdit) {
        const zipCode = this.editAddressUser.zipCode.replace(/\D/g, "");
        if(zipCode.length === 8) {
          getCep(zipCode).then(r => {
            this.editAddressUser.street = r.data.logradouro;
            this.editAddressUser.district = r.data.bairro;
            this.editAddressUser.city = r.data.localidade;
            this.editAddressUser.state = r.data.uf;
          });
        } 
      }

      if(this.activeAdd) {
        const zipCode = this.addAddressUser.zipCode.replace(/\D/g, "");
        if(zipCode.length === 8) {
          getCep(zipCode).then(r => {
            this.addAddressUser.street = r.data.logradouro;
            this.addAddressUser.district = r.data.bairro;
            this.addAddressUser.city = r.data.localidade;
            this.addAddressUser.state = r.data.uf;
          });
        }
      }
    },
    changeAddress: async function(idAddress) {
      const addressUser = {
        user_id: this.idUser,
        type_name: this.editAddressUser.typeAddress,
        cep: this.editAddressUser.zipCode,
        street: this.editAddressUser.street,
        complement: this.editAddressUser.complement,
        number: this.editAddressUser.number,
        district: this.editAddressUser.district,
        city: this.editAddressUser.city,
        state: this.editAddressUser.state,
      }

      this.showLoad = true;

      try {
        apiToken.put(`/user/address/${idAddress}`, addressUser, this.tokenUser).then(() => {
          this.getAddressUser();
          this.activeEdit = false;
        });
      } catch(error) {
        alert('Falha ao atualizar endereço...');
      } finally {
        this.showLoad = false;
      }
    },
    addAddress: async function() {
      const addressUser = {
        user_id: this.idUser,
        type_name: this.addAddressUser.typeAddress,
        cep: this.addAddressUser.zipCode,
        street: this.addAddressUser.street,
        complement: this.addAddressUser.complement,
        number: this.addAddressUser.number,
        district: this.addAddressUser.district,
        city: this.addAddressUser.city,
        state: this.addAddressUser.state,
      }

      this.showLoad = true;

      try {
        apiToken.post(`/user/address`, addressUser, this.tokenUser).then(() => {
          this.getAddressUser();
          this.activeAdd = false;
        });
      } catch(error) {
        alert('Falha ao adicionar endereço...');
      } finally {
        this.showLoad = false;
      }
    },
  },
  created() {
    if(!this.$store.state.login) {
      this.$router.push('/');
    }
    this.getAddressUser();
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

.add {
  margin-bottom: 40px;
}

.address-user div {
  margin-bottom: 30px;
}

.address-user div:last-of-type {
  margin-bottom: 0;
}

.address-user .type-address {
  font-weight: 700;
  color: #C2185B;
  font-size: 18px;
}

.address-user .street-address {
  margin: 7px 0;
}

.content button {
  margin-top: 10px;
}

.content button:first-of-type {
  margin-right: 10px;
}

.modal-change-address {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.modal-change-address section {
  position: relative;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  width: 50%;
  border-radius: 8px;
  padding: 50px 0;
}

.modal-change-address .close {
  position: absolute;
  top: 20px;
  right: 20px;
  color: #fff;
  cursor: pointer;
}

.form-login {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.form-login label {
  margin-right: 15px;
  color: #C2185B;
  font-weight: 700;
}

.form-login input,
.form-login textarea {
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
  resize: none;
}

.form-login textarea {
  width: auto;
}

.form-login input:hover,
.form-login input:focus,
.form-login textarea:hover,
.form-login textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.20);
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

/* ============= RESPONSIVE ============= */
@media only screen and (max-width: 768px) {
  .modal-change-address {
    position: fixed;
  }

  .modal-change-address section {
    width: 100%;
  }

  .form-login {
    width: 80%;
  }
}
</style>