<template>
  <div class="background">
    <div class="container">
      <div class="header">
        <div class="button-container">
          <span class="icon" @click="navigateTo('Slike')">Slike</span>
          <span class="icon" @click="navigateTo('Videi')">Videi</span>
          <span class="icon" @click="navigateTo('Citati')">Citati</span>
          <span class="icon" @click="navigateTo('Glazba')">Glazba</span>
          <span class="icon-active" @click="navigateTo('Profil')">Profil</span>
          <span class="icon" @click="navigateTo('Odjava')">Odjava</span>
        </div>
      </div>
      <h4 class="naslov">Profil</h4>
      <div class="content">
        <div class="form-container">
          <div class="profile-form">
            <form @submit.prevent="saveProfileChanges">
              <div class="grid-container">
                <div class="profile-picture">
                  <div class="image-container">
                    <div v-if="!imagePreview" class="placeholder"></div>
                    <img v-else :src="imagePreview" alt="Profile Image" class="profile-preview">
                  </div>
                  <div class="button-below-image">
                    <label for="file-upload" class="profile-image-label" @click="openFileUploadDialog">Odaberite sliku</label>
                    <input type="file" id="file-upload" accept="image/*" style="display: none;" @change="previewImage">
                  </div>
                </div>
                <div class="profile-data">
                  <div class="form-group">
                    <label class="input-label" for="username">Korisničko ime:</label>
                    <input type="text" id="username" name="username" class="rounded-input" :value="userData && userData.korisnickoIme ? userData.korisnickoIme : ''" :readonly="!oMeniEditMode" autocomplete="username">
                    
                    <label class="input-label" for="name">Ime:</label>
                    <input type="text" id="name" name="name" class="rounded-input" :value="userData && userData.ime ? userData.ime : ''" :readonly="!oMeniEditMode" autocomplete="given-name">
                    
                    <label class="input-label" for="surname">Prezime:</label>
                    <input type="text" id="surname" name="surname" class="rounded-input" :value="userData && userData.prezime ? userData.prezime : ''" :readonly="!oMeniEditMode" autocomplete="family-name">
                    
                    <label class="input-label" for="email">Email:</label>
                    <input type="email" id="email" name="email" class="rounded-input" :value="userData && userData.email ? userData.email : ''" :readonly="!oMeniEditMode" autocomplete="email">
                    
                    <label class="input-label" for="omeni">O meni:</label>
                    <input type="text" id="omeni" name="omeni" class="rounded-input-omeni" v-if="!oMeniEditMode" v-model="oMeni" autocomplete="description" :readonly="!oMeniEditMode">
                    <textarea v-else class="textarea large-textarea" id="aboutme" name="aboutme" rows="8" v-model="oMeni" autocomplete="description"></textarea>
                  </div>
                  <div class="button-group">
                    <button v-if="!oMeniEditMode" type="button" class="edit-button rounded-button" @click="toggleOMeniEditMode">Uredi</button>
                    <button v-else type="submit" class="save-button">Spremi</button>
                    <button class="note-button rounded-button" @click="navigateTo('Biljeske')">Moje bilješke</button>
                    <button class="gratitude-button rounded-button" @click="navigateTo('Dnevnik')">Moj dnevnik zahvalnosti</button>
                    <button class="quote-button rounded-button" @click="navigateTo('MojiCitati')">Moji citati</button>
                  </div>
                  <div v-if="isLoggedIn" class="content">
                   Korisnik je prijavljen.S
                  </div>
                  <div v-if="!isLoggedIn" class="login-message">
                    Korisnik nije prijavljen.
                  </div>
                </div>
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
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { computed } from "vue";

export default {
  data() {
    return {
      imagePreview: null,
      userData: null,
      oMeni: '', 
      oMeniEditMode: false,
      status: null
    };
  },
  mounted() {
    this.loadUserData();
    this.checkLoginStatus();
  },
  computed: {
    isLoggedIn() {
      const auth = getAuth();
      const user = auth.currentUser;
      return !!user; 
    }
  },
  methods: {
    async loadUserData() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userData = await this.getUserData(user.uid);
          if (userData) {
            this.userData = userData;
            this.oMeni = userData.oMeni || ''; 
          } else {
            console.error('Podaci korisnika ne postoje.');
          }
        } else {
          console.error('Korisnik nije prijavljen.');
        }
      } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka korisnika:', error.message);
      }
    },
    async getUserData(uid) {
      try {
        const db = getFirestore();
        const userRef = doc(db, 'userData', uid); 
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          return userDoc.data();
        } else {
          console.error('Podaci korisnika ne postoje.');
          return null;
        }
      } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka korisnika:', error.message);
        return null;
      }
    },
    async saveProfileChanges() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userRef = doc(db, 'userData', user.uid); 
          await setDoc(userRef, {
            korisnickoIme: this.userData ? this.userData.korisnickoIme : '',
            ime: this.userData ? this.userData.ime : '',
            prezime: this.userData ? this.userData.prezime : '',
            email: this.userData ? this.userData.email : '',
            oMeni: this.oMeni
          }, { merge: true });

          await updateProfile(user, {
            displayName: this.userData ? this.userData.korisnickoIme : '',
            photoURL: '' 
          });

          console.log('Podaci profila su ažurirani.');
          this.oMeniEditMode = false; 
        }
      } catch (error) {
        console.error('Greška prilikom ažuriranja podataka profila:', error.message);
      }
    },
    toggleOMeniEditMode() {
      this.oMeniEditMode = !this.oMeniEditMode;
    },
    navigateTo(route) {
      if (route === 'Slike') {
        this.$router.push('/slike');
      } else if (route === 'Videi') {
        this.$router.push('/videi');
      } else if (route === 'Biljeske') {
        this.$router.push('/biljeske');
      } else if (route === 'Dnevnik') {
        this.$router.push('/dnevnik');
      } else if (route === 'MojiCitati') {
        this.$router.push('/mojicitati');
      } else {
        this.$router.push(`/${route}`);
      }
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    openFileUploadDialog() {
      document.getElementById('file-upload').click();
    }
  }
};
</script>

<style scoped>

.background {
  background-color: #c9e3fe;
}

.form-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-top: -80px;
}

.rounded-input,
.textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #509ff4;
  border-radius: 5px;
  box-sizing: border-box;
}

.rounded-input-omeni{
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #509ff4;
  border-radius: 5px;
  box-sizing: border-box;
}
.large-textarea {
  height: 120px; 
}

.rounded-button {
  padding: 10px 20px;
  background-color: #509ff4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px; 
}

.rounded-button:hover {
  background-color: #3c88d1;
}

.input-label {
  display: block;
  margin-bottom: 5px;
  color: #509ff4;
  text-align: left;
}

.input-label + .rounded-input,
.input-label + .textarea {
  margin-top: 5px;
}

.profile-data {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
}

.placeholder {
  width: 100%;
  height: 100%;
  background-color: #a9ccf0; 
}

.profile-preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-image-label {
  cursor: pointer;
  background-color: #509ff4;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.profile-image-label:hover {
  background-color: #3c88d1;
}

.naslov {
  font-weight: bold;
  text-align: left;
  margin-top: -20px;
  color: #509ff4;
}

.icon-active {
  text-decoration: white;
  font-size: 20px;
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

