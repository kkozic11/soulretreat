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
      <h4 class="naslov">Moje bilješke</h4>
      <div class="content">
        <div class="form-container">
          <div class="profile-form">
            <form @submit.prevent="saveNotes">
              <div class="note-container">
                <textarea
                  v-model="notes"
                  class="textarea"
                  id="notes"
                  name="notes"
                  rows="8"
                  :readonly="!editMode"
                  placeholder="Upišite svoje dnevne bilješke, inspiracije i pozitivne misli svakoga dana..."
                ></textarea>
              </div>
              <div class="button-group">
                <button v-if="!editMode" @click="editMode = true" class="edit-button rounded-button">Uredi</button>
                <button v-else type="submit" class="save-button">Spremi</button>
                <button class="gratitude-button rounded-button" @click="navigateTo('Dnevnik')">Moj dnevnik zahvalnosti</button>
                <button class="quote-button rounded-button" @click="navigateTo('MojiCitati')">Moji citati</button>
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
      notes: "",
      editMode: false,
    };
  },
  async mounted() {
    await this.loadNotes();
  },
  methods: {
    async navigateTo(route) {
      if (route === "Slike") {
        this.$router.push("/Slike");
      } else if (route === "Videi") {
        this.$router.push("/videi");
      } else if (route === "MojiCitati") {
        this.$router.push("/mojicitati");
      } else if (route === "Dnevnik") {
        this.$router.push("/dnevnik");
      } else {
        this.$router.push(`/${route}`);
      }
    },
    async loadNotes() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userRef = doc(db, "users", user.uid);
          const userData = await getDoc(userRef);
          if (userData.exists()) {
            const userDataObject = userData.data();
            if (userDataObject && userDataObject.userData && userDataObject.userData.notes) {
              this.notes = userDataObject.userData.notes;
            }
          }
        }
      } catch (error) {
        console.error("Greška prilikom dohvaćanja bilješki:", error.message);
      }
    },
    async saveNotes() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userRef = doc(db, "users", user.uid);
          await setDoc(userRef, {
            userData: {
              notes: this.notes,
            },
          });
          console.log("Bilješke su uspješno spremljene u Firestore.");
          alert("Bilješke su uspješno spremljene!");
        }
      } catch (error) {
        console.error("Greška prilikom spremanja bilješki:", error.message);
        alert("Došlo je do greške prilikom spremanja bilješki.");
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
