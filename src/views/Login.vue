<template>
 <div class="about">
  <h1 class="naslov">Prijava u SoulRetreat</h1>
   <form @submit.prevent="submitForm" class="login-form">
     <div class="input-group"> 
      <label class="label"> Korisničko ime: </label>
      <input type="text" v-model="username" class="input-field" id="username" aria-describedby="Unesi korisničko ime"/>
     </div>
      <div class="input-group">
      <label class="label"> Lozinka:</label>
      <input type="password" v-model="password" class="input-field" id="password"/>
    </div>
     <button type="submit" @click="redirectToBasePage">Prijava</button>
     <p class="reg-text">Niste registrirani? <router-link to="/registration" class="register">Registriraj se. </router-link></p>
   </form>
 </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
    },
    redirectToBasePage(){
      this.$router.push('/basepage');
    }
  }
};
</script>

<style scoped>

.about{
    background-image: url('../assets/pozadina2.jpg');
    background-size: cover;
    background-position: center;
    padding: 20px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.reg-text{
  font-size: 20px;
  margin-top: 5px;
}

.register{
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  margin-top: 5px;
}

.input-group{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label{
  font-size: 20px;
  padding: 8px 12px;
  color: white;
  width: 200px;
  margin-right: 20px;
  text-align: right;
}

.input-field{
  border: none;
  border-radius: 20px;
  background-color: #03a3a3;
  color: white;
  padding: 8px 12px;
  width: 250px;
  margin-left: 20px;
}

.login-form button{
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  background-color: #03a3a3;
  margin-bottom: 20px;
  color: #ffff;
  cursor: pointer;
  margin-left: 40px;
  margin-top: 30px;
}

.naslov{
  font-size: 40px;
  margin-bottom: 80px;
  font-weight: bold;
  color: #03a3a3;
}

</style>