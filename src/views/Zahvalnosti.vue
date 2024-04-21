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
        <h4 class="naslov">Sve moje zahvalnosti</h4>
        <div class="content">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Zahvalnost</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(entry, index) in dnevnikEntries" :key="index">
                  <td>{{ formatDate(entry.datum) }}</td>
                  <td>{{ entry.zahvalnost }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="button-group">
            <button class="note-button rounded-button" @click="navigateTo('Biljeske')">Moje bilješke</button>
            <button class="quote-button rounded-button" @click="navigateTo('MojiCitati')">Moji citati</button>
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
  import { getFirestore, collection, getDocs } from "firebase/firestore";
  
  export default {
    data() {
      return {
        dnevnikEntries: [], 
      };
    },
    async mounted() {
      await this.loadDnevnikEntries();
    },
    methods: {
      async loadDnevnikEntries() {
        try {
          const auth = getAuth();
          const user = auth.currentUser;
          if (user) {
            const db = getFirestore();
            const userDataRef = collection(db, "userData"); 
            const userDataSnapshot = await getDocs(userDataRef);
            this.dnevnikEntries = userDataSnapshot.docs.map(doc => doc.data());
          }
        } catch (error) {
          console.error("Greška prilikom dohvaćanja unosa userData:", error.message);
        }
      },
      async navigateTo(route) {
        this.$router.push(route);
      },
      formatDate(dateString) {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString("hr-HR", options);
      },
    },
  };
  </script>
  
  <style scoped>
  .background {
    background-color: #c9e3fe;
  }
  
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .header {
    background-color: #509ff4;
    padding: 10px;
  }
  
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  
  .icon {
    margin: 0 10px;
    cursor: pointer;
    font-size: 20px;
    color: white;
  }
  
  .naslov {
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
    color: #509ff4;
  }
  
  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .form-container {
    width: 80%;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .rounded-button {
    padding: 10px 20px;
    background-color: #509ff4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 10px;
  }
  
  .rounded-button:hover {
    background-color: #3c88d1;
  }
  
  .table-container {
    width: 80%;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th, .table td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  .table th {
    background-color: #f2f2f2;
  }
  
  .footer {
    background-color: #509ff4;
    width: 100%;
    padding: 10px 0;
    text-align: center;
  }
  
  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-text {
    color: #145c7b;
    font-weight: bold;
    font-size: 20px;
  }
  </style>
  