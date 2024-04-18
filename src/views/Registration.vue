<template>
 <div class="registracija">
  <h1 class="naslov">Registracija u SoulRetreat</h1>
   <form @submit.prevent="submitForm" class="login-form">
     <div class="input-group"> 
      <label class="label"> Ime: </label>
      <input type="text" v-model="ime" class="input-field" id="username" aria-describedby="Unesi svoje ime"/>
     </div>
      <div class="input-group">
      <label class="label"> Prezime:</label>
      <input type="password" v-model="Prezime" class="input-field" id="prezime"/>
    </div>
    <div class="input-group">
      <label class="label"> Korisničko ime:</label>
      <input type="username" v-model="Prezime" class="input-field" id="username"/>
    </div>
    <div class="input-group">
      <label class="label"> Email:</label>
      <input type="email" v-model="Prezime" class="input-field" id="email"/>
    </div>
     <button type="submit">Registriraj me</button>
     <p class="reg-text">Korisnički račun već imate? <router-link to ="/login" class="login">Prijavite se. </router-link></p>
   </form>
 </div>
</template>

<script>
export default {
  data() {
    return {
      ime: '',
      prezime: '',
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.$router.push('/basepage');
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error(errorMessage);
        });
  }
}
};
</script>

<style scoped>

.registracija{
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
  margin-left: 110px;
}

.login{
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
  font-size: 25px;
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
  margin-left: 110px;
  margin-top: 30px;
}

.naslov{
  font-size: 40px;
  margin-bottom: 80px;
  font-weight: bold;
  color: #03a3a3;
}

</style>