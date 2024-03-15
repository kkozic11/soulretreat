<template>
 <div class="about">
  <h1 class="naslov">Prijava u SoulRetreat</h1>
   <form @submit.prevent="submitForm" class="login-form">
     <div class="input-group"> 
      <label class="label"> Korisničko ime: </label>
      <input type="text" v-model="username" id="username" aria-describedby="Unesi korisnicko ime"/>
     </div>
    <div class="input-group">
      <label class="label"> Lozinka:</label>
      <input type="password" v-model="password" id="password"/>
    </div>
     <button type="submit">Prijava</button>
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
      // Logika za obradu forme
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

.login-form{
  padding: 20px;
  border-radius: 10px;
}

.input-group{
  display: flex;
  align-items: center;
}

.label{
  width: 150px;
  font-size: 18px;
  padding: 8px 12px;
}

.input-group{
  border: none;
  border-radius: 20px;
  background-color: aquamarine;
  color: white;
  padding: 8px 12px;
  margin-right: 10px;
}

.input-field:focus{
  outline: none;
}

.login-form input{
  display: block;
  margin-bottom: 10px;
}

.login-form button{
  padding: 10px 20px;
  border: none;
  background-color: aqua;
  color: #ffff;
  border-radius: 5px;
  cursor: pointer; 
}

.login-form button:hover{
  background-color: yellow;
}

.naslov{
  font-size: 40px;
  margin-bottom: 80px;
  font-weight: bold;
  color:rgb(33, 174, 108);
}
</style>