<template>
  <div class="registracija">
    <h1 class="naslov">Registracija u SoulRetreat</h1>
    <form @submit.prevent="submitForm" class="login-form" action="">
      <div class="input-group">
        <label for="ime" class="label"> Ime: </label>
        <input type="text" v-model="ime" class="input-field" id="ime" autocomplete="given-name" aria-describedby="Unesi svoje ime"/>
      </div>
      <div class="input-group">
        <label for="prezime" class="label"> Prezime:</label>
        <input type="text" v-model="prezime" class="input-field" id="prezime" autocomplete="family-name"/>
      </div>
      <div class="input-group">
        <label for="korisnickoIme" class="label"> Korisničko ime:</label>
        <input type="text" v-model="korisnickoIme" class="input-field" id="korisnickoIme" autocomplete="username" @change="checkIfUserExists"/>
        <p v-if="usernameExists" class="error-message">Korisnik s ovim korisničkim imenom ili mailom već postoji.</p>
      </div>
      <div class="input-group">
        <label for="email" class="label" id="email-label">Email:</label>
        <input type="email" v-model="email" class="input-field" id="email" autocomplete="email" aria-labelledby="email-label" aria-describedby="email-error" @change="checkIfUserExists"/>
        <p v-if="email && emailError" class="error-message" id="email-error">{{ emailError }}</p>
      </div>
      <div class="input-group">
        <label for="lozinka" class="label"> Lozinka:</label>
        <input type="password" v-model="lozinka" class="input-field" id="lozinka" autocomplete="new-password"/>
      </div>
      <div class="input-group">
        <label for="potvrdaLozinke" class="label"> Potvrdi lozinku:</label>
        <input type="password" v-model="potvrdaLozinke" class="input-field" id="potvrdaLozinke" autocomplete="new-password"/>
      </div>
      <button type="submit" :disabled="usernameExists" @click="goToLoginPage">Registriraj me</button>
      <p class="reg-text">Korisnički račun već imate? <router-link to="/login" class="login">Prijavite se.</router-link></p>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export default {
  data() {
    return {
      ime: '',
      prezime: '',
      korisnickoIme: '',
      email: '',
      lozinka: '',
      potvrdaLozinke: '',
      errorMessage: '',
      usernameExists: false,
      emailError: ''
    };
  },
  methods: {
    async submitForm() {
      event.preventDefault();
      console.log('Pokušaj registracije...');

 
      this.errorMessage = '';
      this.emailError = '';
      this.usernameExists = false;

      if (!this.areAllFieldsFilled()) {
        this.errorMessage = 'Molimo ispunite sva polja.';
        console.log('Nisu ispunjena sva polja.');
        return;
      }

      if (this.lozinka.length < 6) {
        this.errorMessage = 'Lozinka mora sadržavati najmanje 6 znakova.';
        console.log('Lozinka mora sadržavati najmanje 6 znakova.');
        return;
      }

      if (this.lozinka !== this.potvrdaLozinke) {
        this.errorMessage = 'Lozinke se ne podudaraju.';
        console.log('Lozinke se ne podudaraju.');
        return;
      }

      try {
        const auth = getAuth();

        // Provjera postoji li korisnik s ovom e-mail adresom
        const emailExists = await fetchSignInMethodsForEmail(auth, this.email);
        if (emailExists.length > 0) {
          this.errorMessage = 'Korisnik s ovom e-mail adresom već postoji.';
          console.log('Korisnik s ovom e-mail adresom već postoji.');
          return;
        }

        const usernameExists = await this.fetchUserByUsername(this.korisnickoIme);
        console.log('Provjerava postojanje korisničkog imena...');
        console.log('Korisničko ime postoji:', usernameExists);

        if (usernameExists) {
          console.log('Korisnik s ovim korisničkim imenom već postoji.');
          this.usernameExists = true;
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.lozinka);
        console.log('Registracija uspješna. Korisnički ID:', userCredential.user.uid);

        await this.saveUserData(userCredential.user.uid);

        this.goToLoginPage();
        
      } catch (error) {
        console.error('Greška prilikom registracije:', error.message);

        let errorMessage = '';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email adresa je već u upotrebi.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Lozinka mora sadržavati najmanje 6 znakova.';
        } else {
          errorMessage = 'Došlo je do greške prilikom registracije. Molimo pokušajte ponovno.';
        }
        this.errorMessage = errorMessage;
      }

    },
    async fetchUserByUsername(username) {
      try {
        const db = getFirestore();
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('korisnickoIme', '==', username));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
      } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika:', error.message);
        return false;
      }
    },
    async saveUserData(uid) {
      try {
        const db = getFirestore();
        const usersRef = collection(db, 'users');
        await addDoc(usersRef, {
          uid: uid,
          ime: this.ime,
          prezime: this.prezime,
          korisnickoIme: this.korisnickoIme,
          email: this.email,
        });
        console.log('Podaci korisnika spremljeni.');
      } catch (error) {
        console.error('Greška prilikom spremanja podataka korisnika:', error.message);
        let errorMessage = 'Došlo je do greške prilikom spremanja podataka korisnika.';
        this.errorMessage = errorMessage;
      }
    },
    async checkIfUserExists() {
      if (!this.areAllFieldsFilled()) {
        return;
      }

      if (!this.isValidEmail(this.email)) {
        this.emailError = 'Unesite ispravnu e-mail adresu.';
        return;
      }

      const emailExists = await fetchSignInMethodsForEmail(getAuth(), this.email);
      const usernameExists = await this.fetchUserByUsername(this.korisnickoIme);
      
      if (emailExists.length > 0 || usernameExists) {
        this.usernameExists = true;
      } else {
        this.usernameExists = false;
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    areAllFieldsFilled() {
      return this.ime && this.prezime && this.korisnickoIme && this.email && this.lozinka && this.potvrdaLozinke;
    },
    goToLoginPage() {
      this.$router.push('/login');
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

.error-message {
  color: red;
  font-size: 16px; 
  margin-left: 20px; 
}
</style>
