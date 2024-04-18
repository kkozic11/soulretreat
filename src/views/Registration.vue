<template>
  <div class="registracija">
    <h1 class="naslov">Registracija u SoulRetreat</h1>
    <form @submit.prevent="submitForm" class="login-form">
      <div class="input-group">
        <label for="ime" class="label"> Ime: </label>
        <input type="text" v-model="ime" class="input-field" id="ime" aria-describedby="Unesi svoje ime"/>
      </div>
      <div class="input-group">
        <label for="prezime" class="label"> Prezime:</label>
        <input type="text" v-model="prezime" class="input-field" id="prezime"/>
      </div>
      <div class="input-group">
        <label for="korisnickoIme" class="label"> Korisničko ime:</label>
        <input type="text" v-model="korisnickoIme" class="input-field" id="korisnickoIme"/>
      </div>
      <div class="input-group">
        <label for="email" class="label"> Email:</label>
        <input type="email" v-model="email" class="input-field" id="email"/>
      </div>
      <div class="input-group">
        <label for="lozinka" class="label"> Lozinka:</label>
        <input type="password" v-model="lozinka" class="input-field" id="lozinka"/>
      </div>
      <div class="input-group">
        <label for="potvrdaLozinke" class="label"> Potvrdi lozinku:</label>
        <input type="password" v-model="potvrdaLozinke" class="input-field" id="potvrdaLozinke"/>
      </div>
      <button type="submit">Registriraj me</button>
      <p class="reg-text">Korisnički račun već imate? <router-link to ="/login" class="login">Prijavite se. </router-link></p>
    </form>
  </div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      ime: '',
      prezime: '',
      korisnickoIme: '',
      email: '',
      lozinka: '',
      potvrdaLozinke: '',
      errorMessage: ''
    };
  },
  methods: {
    async submitForm() {
      if (!this.ime || !this.prezime || !this.korisnickoIme || !this.email || !this.lozinka || !this.potvrdaLozinke) {
        this.errorMessage = 'Molimo ispunite sva polja.';
        return;
      }

      if (this.lozinka !== this.potvrdaLozinke) {
        this.errorMessage = 'Lozinke se ne podudaraju.';
        return;
      }

      try {
        const auth = getAuth();
        const userExists = await fetchSignInMethodsForEmail(auth, this.email);
        if (userExists.length > 0) {
          this.errorMessage = 'Korisnik s ovim e-mailom već postoji.';
          return;
        }

        // Provjeri postoji li korisnik s tim korisničkim imenom
        const usernameExists = await this.fetchUserByUsername(this.korisnickoIme);
        if (usernameExists) {
          this.errorMessage = 'Korisnik s ovim korisničkim imenom već postoji.';
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.lozinka);
        console.log('Registracija uspješna. Korisnički ID:', userCredential.user.uid);
        
        this.$router.push('/login');
      } catch (error) {
        console.error('Greška prilikom registracije:', error.message);
        this.errorMessage = 'Došlo je do greške prilikom registracije. Molimo pokušajte ponovno.';
      }
    },
    async fetchUserByUsername(username) {
      try {
        const db = getFirestore();
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
      } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika:', error.message);
        return false;
      }
    }
  }
};
</script>


<style scoped>
.registracija {
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
  margin-left: 110px;
}

.login {
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
  font-size: 25px;
  /* padding: 8px 12px; Remove padding */
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
  margin-left: 110px;
  margin-top: 30px;
}

.naslov {
  font-size: 40px;
  margin-bottom: 80px;
  font-weight: bold;
  color: #03a3a3;
}
</style>
