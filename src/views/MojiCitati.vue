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
      <h4 class="naslov">Moji citati</h4>
      <div class="content">
        <div class="form-container">
          <div class="profile-form">
            <form @submit.prevent="saveQuotes">
              <div class="note-container">
                <textarea v-model="quotes" :readonly="!editMode" class="textarea" id="quotes" name="quotes" rows="8" placeholder="Ovdje zapišite citate."></textarea>
              </div>
              <div class="button-group">
                <button v-if="!editMode" @click="editMode = true" class="edit-button rounded-button">Uredi</button>
                <button v-else type="submit" class="save-button">Spremi</button>
                <button class="note-button rounded-button" @click="navigateTo('Biljeske')">Moje bilješke</button>
                <button class="gratitude-button rounded-button" @click="navigateTo('Dnevnik')">Moj dnevnik zahvalnosti</button>
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
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      quotes: "",
      editMode: false,
    };
  },
  async mounted() {
    await this.loadQuotes();
  },
  methods: {
    async navigateTo(route) {
      if (route === "Slike") {
        this.$router.push("/Slike");
      } else if (route === "Videi") {
        this.$router.push("/videi");
      } else if (route === "Biljeske") {
        this.$router.push("/biljeske");
      } else if (route === "Dnevnik") {
        this.$router.push("/dnevnik");
      } else {
        this.$router.push(`/${route}`);
      }
    },
    async loadQuotes() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userRef = doc(db, "users", user.uid);
          const userData = await getDoc(userRef);
          if (userData.exists()) {
            const userQuotes = userData.data().userData;
            if (userQuotes && userQuotes.quotes) {
              this.quotes = userQuotes.quotes;
            }
          }
        }
      } catch (error) {
        console.error("Greška prilikom dohvaćanja citata:", error.message);
      }
    },
    async saveQuotes() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userRef = doc(db, "users", user.uid);
          await setDoc(userRef, {
            userData: {
              quotes: this.quotes,
            },
          }, { merge: true });
          console.log("Citati su uspješno spremljeni u Firestore.");
          alert("Citati su uspješno spremljeni!");
          this.editMode = false; 
        }
      } catch (error) {
        console.error("Greška prilikom spremanja citata:", error.message);
        alert("Došlo je do greške prilikom spremanja citata.");
      }
    },
  },
};
</script>

<style scoped>
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
  margin-top: -20px;
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

</style>
