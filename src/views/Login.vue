<template>
  <div class="about">
    <h1 class="naslov">Prijava u SoulRetreat</h1>
    <form @submit.prevent="submitForm" class="login-form">
      <div class="input-group"> 
        <label class="label" for="email">E-mail adresa:</label>
        <input type="email" v-model="email" class="input-field" id="email" autocomplete="email" aria-describedby="Unesi e-mail adresu"/>
      </div>
      <div class="input-group"> 
        <label class="label" for="lozinka">Lozinka:</label>
        <input type="password" v-model="lozinka" class="input-field" id="lozinka" autocomplete="current-password" aria-describedby="Unesi lozinku"/>
      </div>
      <button type="submit">Prijava</button>
      <p class="reg-text">Niste registrirani? <router-link to="/registration" class="register">Registriraj se.</router-link></p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';

export default {
  data() {
    return {
      email: "",
      lozinka: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitForm(event) {
      event.preventDefault(); 
      
      console.log("Pokušaj prijave...");

      if (!this.email || !this.lozinka) {
        this.errorMessage = "Molimo unesite e-mail adresu i lozinku.";
        return;
      }

      try {
        const auth = getAuth(app); 
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.lozinka);
        console.log("Uspešna prijava. Korisnički ID:", userCredential.user.uid);
  
        localStorage.setItem('userStatus', '1');
        
        this.$router.push('/basepage');
      } catch (error) {
        console.error("Greška prilikom prijave:", error.message);

        let errorMessage = "";
        if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
          errorMessage = "Pogrešno korisničko ime ili lozinka.";
        } else {
          errorMessage = "Došlo je do greške prilikom prijave. Molimo pokušajte ponovo.";
        }
        this.errorMessage = errorMessage;
      }
    },
  },
};
</script>


<style scoped>
.about {
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

.reg-text {
  font-size: 20px;
  margin-top: 5px;
}

.register {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  margin-top: 5px;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  font-size: 20px;
  padding: 8px 12px;
  color: white;
  width: 200px;
  margin-right: 20px;
  text-align: right;
}

.input-field {
  border: none;
  border-radius: 20px;
  background-color: #03a3a3;
  color: white;
  padding: 8px 12px;
  width: 250px;
  margin-left: 20px;
}

.login-form button {
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

.naslov {
  font-size: 40px;
  margin-bottom: 80px;
  font-weight: bold;
  color: #03a3a3;
}

.error-message {
  color: white;
  font-size: 16px;
  margin-top: 10px;
}
</style>
