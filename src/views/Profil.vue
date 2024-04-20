<template>
  <div class="background">
    <div class="container">
      <div class="header">
        <div class="button-container">
          <router-link :to="{ name: 'Slike' }" class="icon">Slike</router-link>
          <router-link :to="{ name: 'Videi' }" class="icon">Videi</router-link>
          <router-link :to="{ name: 'Citati' }" class="icon">Citati</router-link>
          <router-link :to="{ name: 'Glazba' }" class="icon">Glazba</router-link>
          <router-link :to="{ name: 'Profil' }" class="icon-active">Profil</router-link>
          <router-link :to="{ name: 'Odjava' }" class="icon">Odjava</router-link>
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
                    <label for="file-upload" class="profile-image-label">Odaberite sliku</label>
                    <input type="file" id="file-upload" accept="image/*" style="display: none;" ref="fileInput" @change="previewImage">
                  </div>
                </div>

                <div class="profile-data">
                  <div class="form-group">
                    <label class="input-label" for="username">Korisničko ime:</label>
                    <input type="text" id="username" name="username" class="rounded-input" v-model="userData.korisnickoIme" readonly autocomplete="username">
                    <label class="input-label" for="name">Ime:</label>
                    <input type="text" id="name" name="name" class="rounded-input" v-model="userData.ime" :readonly="!isEditMode" autocomplete="given-name">
                    <label class="input-label" for="surname">Prezime:</label>
                    <input type="text" id="surname" name="surname" class="rounded-input" v-model="userData.prezime" :readonly="!isEditMode" autocomplete="family-name">
                    <label class="input-label" for="about">O meni:</label>
                    <textarea id="about" name="about" class="rounded-textarea" v-model="userData.oMeni" :readonly="!isEditMode" autocomplete="off"></textarea>
                  </div>
                  <div class="button-group">
                    <router-link :to="{ name: 'Biljeske' }" class="note-button rounded-button">Moje bilješke</router-link>
                    <router-link :to="{ name: 'Dnevnik' }" class="gratitude-button rounded-button">Moj dnevnik zahvalnosti</router-link>
                    <router-link :to="{ name: 'MojiCitati' }" class="quote-button rounded-button">Moji citati</router-link>
                
                    <button v-if="!isEditMode" type="button" class="edit-button rounded-button" @click="toggleEditMode">Uredi</button>
                    <button v-else type="submit" class="save-button rounded-button">Spremi promjene</button>
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
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

export default {
  data() {
    return {
      userData: {
        korisnickoIme: '',
        ime: '',
        prezime: '',
        oMeni: '',
        profileImage: ''
      },
      isEditMode: false,
      imagePreview: ''
    };
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    async loadUserData() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const usersCollection = collection(db, 'users');
          const q = query(usersCollection, where('email', '==', user.identifer));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            this.userData = {
              korisnickoIme: userData.korisnickoIme || 'kkozic',
              ime: userData.ime || 'Katarina',
              prezime: userData.prezime || 'Kozić',
              oMeni: userData.oMeni || 'Studentica Fakulteta informatike u Puli. Nastavni smjer informatike.',
              profileImage: userData.profileImage || '../assets/pozadina.jpg'
            };
            this.imagePreview = userData.profileImage || '';
          } else {
            console.error('Korisnik s ovim emailom ne postoji u bazi.');
          }
        } else {
          console.error('Korisnik nije prijavljen.');
        }
      } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka korisnika:', error.message);
      }
    },
    async saveProfileChanges() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userRef = doc(db, 'users', user.identifer);
          await setDoc(userRef, {
            ime: this.userData.ime,
            prezime: this.userData.prezime,
            korisnickoIme: this.userData.korisnickoIme,
            oMeni: this.userData.oMeni,
            profileImage: this.userData.profileImage,
          });
          console.log('Podaci profila su ažurirani.');
          this.isEditMode = false;
        }
      } catch (error) {
        console.error('Greška prilikom ažuriranja podataka profila:', error.message);
      }
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },
    async previewImage(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const auth = getAuth();
          const user = auth.currentUser;
          if (user) {
            const storage = getStorage();
            const storageRef = ref(storage, `profile_images/${user.uid}/${file.name}`);
            await uploadString(storageRef, reader.result, 'data_url');
            const imageUrl = await getDownloadURL(storageRef);
            this.userData.profileImage = imageUrl;
            this.imagePreview = imageUrl;
          }
        } catch (error) {
          console.error('Greška prilikom spremanja slike:', error.message);
        }
      };
      reader.readAsDataURL(file);
    },
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

.rounded-textarea {
  padding: 10px;
  border: 1px solid #509ff4;
  border-radius: 5px;
  margin-top: 5px;
  height: auto;
  width: 100%;
  min-height: 120px;
  background-color: #f9f9f9;
}
</style>
