<template>
  <div class="background">
    <div class="container">
      <div class="header">
        <div class="button-container">
          <span class="icon" @click="navigateTo('Slike')">Slike</span>
          <span class="icon" @click="navigateTo('Videi')">Videi</span>
          <span class="icon" @click="navigateTo('Citati')">Citati</span>
          <span class="icon" @click="navigateTo('Glazba')">Glazba</span>
          <span class="icon" @click="navigateTo('Profil')">Profil</span>
          <span class="icon" @click="navigateTo('Odjava')">Odjava</span>
        </div>
      </div>
      <h4 class="naslov">Moj dnevnik zahvalnosti</h4>
      <div class="date-container">
        <p class="date-text">Današnji datum:</p>
        <input type="text" class="datum-input" v-model="datum" readonly>
      </div>
      <div class="content">
        <div class="form-container">
          <div class="profile-form">
            <form @submit.prevent="saveDnevnik">
              <div class="note-container">
                <textarea v-model="dnevnik" :readonly="!editMode" class="textarea" id="notes" name="notes" rows="8" placeholder="Ovdje zapiši zahvalnosti dana"></textarea>
              </div>
              <div class="button-group">
                <button v-if="!editMode" @click="editMode = true" class="edit-button rounded-button">Uredi</button>
                <button v-else type="submit" class="save-button">Spremi</button>
                <button class="note-button rounded-button" @click="navigateTo('Biljeske')">Moje bilješke</button>
                <button class="quote-button rounded-button" @click="navigateTo('MojiCitati')">Moji citati</button>
                <button class="quote-button rounded-button" @click="navigateTo('Zahvalnosti')">Sve moje zahvalnosti</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-inner">
          <div class="footer-text"><router-link to="/basepage">SoulRetreat.</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, orderBy, limit, getDocs, setDoc, doc } from "firebase/firestore";

export default {
  data() {
    return {
      dnevnik: "", 
      datum: new Date().toISOString().slice(0, 10), 
      editMode: false,
      datumValid: true 
    };
  },
  async mounted() {
    await this.loadDnevnik();
  },
  methods: {
    async loadDnevnik() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userDnevnikRef = collection(db, "users", user.uid, "dnevnik");
          const dnevnikQuery = query(userDnevnikRef, orderBy("datum", "desc"), limit(1));
          const dnevnikSnapshot = await getDocs(dnevnikQuery);
          dnevnikSnapshot.forEach((doc) => {
            this.dnevnik = doc.data().dnevnik;
            this.datum = doc.data().datum;
          });
        }
      } catch (error) {
        console.error("Greška prilikom dohvaćanja dnevnika:", error.message);
      }
    },
    async saveDnevnik() {
      try {
        if (!this.datum) {
          this.datumValid = false;
          return; 
        }

        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userDnevnikRef = collection(db, "users", user.uid, "dnevnik");
          const newDnevnikEntry = {
            dnevnik: this.dnevnik,
            datum: this.datum
          };
          await setDoc(doc(userDnevnikRef, this.generateRandomId()), newDnevnikEntry);
          console.log("Dnevnik je uspješno spremljen u Firestore.");
          alert("Dnevnik je uspješno spremljen!");
          this.editMode = false; 
        }
      } catch (error) {
        console.error("Greška prilikom spremanja dnevnika:", error.message);
        alert("Došlo je do greške prilikom spremanja dnevnika.");
      }
    },
    generateRandomId() {
      return Math.random().toString(36).substr(2, 9);
    },
    async navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>


<style scoped>
.datum-input{
  margin-right: 70%;
}
.date-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-text {
  font-size: 19px;
  color: #509ff4;
}

.date-input {
  padding: 8px;
  border: 1px solid #509ff4;
  border-radius: 5px;
  
}


.note-container {
  margin-bottom: 20px;
}

.textarea {
  width: 100%;
  height: 400px;
  padding: 10px;
  border: 1px solid #509ff4;
  border-radius: 5px;
  box-sizing: border-box;
  resize: vertical;
}

.background {
  background-color: #c9e3fe;
}

.form-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-top: -80px;
  width: 200%;
  height: 500px;
}

.rounded-button {
  padding: 10px 20px;
  background-color: #509ff4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.rounded-button:hover {
  background-color: #3c88d1;
}

.naslov {
  font-weight: bold;
  text-align: left;
  margin-top: 5px;
  color: #509ff4;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.button-container {
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
}

.content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer {
  background-color: #509ff4;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 7px;
  display: flex;
  align-items: center;
}

.footer-text {
  color: #145c7b;
  margin-left: auto;
  font-weight: bold;
  font-size: 20px;
}

.icon {
  margin: 0 10px;
  cursor: pointer;
  font-size: 20px;
  color:#509ff4;
}

.save-button {
  padding: 10px 20px;
  background-color: #509ff4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #3c88d1;
}

.error-message {
  color: red;
}
</style>
