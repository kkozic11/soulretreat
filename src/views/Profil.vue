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
                      <div v-if="!oMeniEditMode && !imagePreview" class="placeholder"></div>
                      <img v-else-if="!oMeniEditMode && imagePreview" :src="imagePreview" alt="Selected Image" class="profile-preview">
                    </div>
                    <div class="button-below-image">
                      <label for="file-upload" class="profile-image-label">Odaberite sliku</label>
                      <input type="file" id="file-upload" accept="image/*" style="display: none;" @change="previewImage" ref="fileInput">
                    </div>
                  </div>
                  <div class="profile-data">
                    <div class="form-group">
                      <label class="input-label" for="username">Korisničko ime:</label>
                      <input type="text" id="username" name="username" class="rounded-input" :value="korisnickoIme" :readonly="!oMeniEditMode" autocomplete="username">

                      <label class="input-label" for="name">Ime:</label>
                      <input type="text" id="name" name="name" class="rounded-input" :value="ime" :readonly="!oMeniEditMode" autocomplete="given-name">

                      <label class="input-label" for="surname">Prezime:</label>
                      <input type="text" id="surname" name="surname" class="rounded-input" :value="prezime" :readonly="!oMeniEditMode" autocomplete="family-name">

                      <label class="input-label" for="email">Email:</label>
                      <input type="email" id="email" name="email" class="rounded-input" :value="userData && userData.email ? userData.email : ''" :readonly="true" autocomplete="email">

                      <label class="input-label" for="omeni">O meni:</label>
                      <input v-if="!oMeniEditMode" type="text" id="omeni" name="omeni" class="rounded-input-omeni" v-model="omeni" autocomplete="description" :readonly="!oMeniEditMode">
                      <textarea v-else class="textarea large-textarea" id="omeni" name="omeni" rows="8" v-model="omeni" autocomplete="description"></textarea>

                    </div>
                    <div class="button-group">
                      <button v-if="!oMeniEditMode" type="button" class="edit-button rounded-button" @click="toggleOMeniEditMode">Uredi</button>
                      <button v-else type="submit" class="save-button">Spremi</button>
                      <button class="note-button rounded-button" @click="navigateTo('Biljeske')">Moje bilješke</button>
                      <button class="gratitude-button rounded-button" @click="navigateTo('Dnevnik')">Moj dnevnik zahvalnosti</button>
                      <button class="quote-button rounded-button" @click="navigateTo('MojiCitati')">Moji citati</button>
                    </div>
                    <div v-if="status === 1" class="content">
                      Korisnik je prijavljen.
                    </div>
                    <div v-if="status === 0" class="login-message">
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
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'vue-router'; 

export default {
  data() {
    return {
      status: 0,
      imagePreview: null,
      userData: {
        korisnickoIme: '',
        ime: '',
        prezime: '',
        email: '',
        omeni: '',
        slika: '' 
      },
      oMeni: '',
      oMeniEditMode: false,
      ime: '',
      prezime: '',
      korisnickoIme: '',
      omeni:'',
      imageFile: null
    };
  },

  mounted() {
    this.checkLoginStatus();
  },

  methods: {
    async checkLoginStatus() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        this.status = 1;
        await this.loadUserData();
      } else {
        this.status = 0;
        this.userData = null;
      }
    },

    async loadUserData() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          let userData = null;
          const storedUserData = localStorage.getItem('userData');
          if (storedUserData) {
            userData = JSON.parse(storedUserData);
          } else {
            userData = await this.getUserData(user.uid);
            localStorage.setItem('userData', JSON.stringify(userData));
          }

          console.log("Podaci korisnika iz Firestore-a:", userData);
          if (userData) {
            this.userData = userData;
            this.omeni = userData.omeni || '';
            this.ime = userData.ime || '';
            this.prezime = userData.prezime || '';
            this.korisnickoIme = userData.korisnickoIme || '';
          } else {
            console.error('Podaci korisnika ne postoje u Firestore bazi.');
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
        const userRef = doc(db, 'users', uid);
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
          const userRef = doc(db, 'users', user.uid);

          let slika = this.userData.slika || ''; 

          await setDoc(userRef, {
            korisnickoIme: this.korisnickoIme,
            ime: this.ime,
            prezime: this.prezime,
            email: user.email,
            omeni: this.omeni,
            slika: slika 
          }, { merge: true });

          await updateProfile(user, {
            displayName: this.korisnickoIme,
            photoURL: slika 
          });

          console.log('Podaci profila su ažurirani.');

          if (this.imageFile) {
            const imageURL = await this.uploadImage(user.uid);
            if (imageURL) {
              console.log('URL slike:', imageURL);

              this.userData.slika = imageURL;

              await setDoc(userRef, {
                slika: imageURL
              }, { merge: true });

              const updatedUserData = {
                korisnickoIme: this.korisnickoIme,
                ime: this.ime,
                prezime: this.prezime,
                email: user.email,
                omeni: this.omeni,
                slika: this.userData.slika 
              };
              localStorage.setItem('userData', JSON.stringify(updatedUserData));

              this.imagePreview = imageURL;
            }
          }

          this.oMeniEditMode = false; 
        }
      } catch (error) {
        console.error('Greška prilikom ažuriranja podataka profila:', error.message);
      }
    },
    async uploadImage(uid) {
      try {
        const storage = getStorage();
        const storageRef = storageRef(storage, `profile_images/${uid}/${this.imageFile.name}`); 

        const snapshot = await uploadBytesResumable(storageRef, this.imageFile); 

        console.log('Slika je uspješno učitana:', snapshot);

        const imageURL = await getDownloadURL(storageRef); 
        console.log('URL slike:', imageURL);

        await this.fetchAndSaveImageURL(uid, imageURL);

        return imageURL;
      } catch (error) {
        console.error('Greška prilikom učitavanja slike:', error.message);
        return '';
      }
    },

    async fetchAndSaveImageURL(uid, imageURL) {
      try {
        const db = getFirestore();
        const userRef = doc(db, 'users', uid);

        await setDoc(userRef, {
          slika: imageURL
        }, { merge: true });

        console.log('URL slike je spremljen u Firestore.');
      } catch (error) {
        console.error('Greška prilikom spremanja URL-a slike:', error.message);
      }
    },

    toggleOMeniEditMode() {
      this.oMeniEditMode = !this.oMeniEditMode;
      if (this.oMeniEditMode) {
        this.imagePreview = null;
        this.$refs.fileInput.value = '';
      }
    },

    async fetchUserFromUID(uid) {
      try {
        const userData = await this.getUserData(uid);
        if (userData) {
          this.userData = userData;
          this.omeni = userData.omeni || '';
          this.ime = userData.ime || '';
          this.prezime = userData.prezime || '';
          this.korisnickoIme = userData.korisnickoIme || '';
        } else {
          console.error('Podaci korisnika ne postoje.');
        }
      } catch (error) {
        console.error('Greška prilikom dohvaćanja korisnika iz UID-a:', error.message);
      }
    },

    navigateTo(route) {
      this.$router.push(route);
    },

    previewImage(event) {
      const file = event.target.files[0];
      this.imageFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    openFileUploadDialog() {
    },
  },

  watch: {
    '$route'(to, from) {
      if (from.name === 'Profil' && to.name !== 'Profil') {
        this.$router.keepAlive = false;
      }
    }
  },
  
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
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
    max-width: 100%;
    max-height: 300px; 
    display: block; 
    margin: 0 auto; 
  }
.selected-image {
    max-width: 100%; 
    max-height: 300px; 
    display: block; 
    margin-top: 10px; 
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
