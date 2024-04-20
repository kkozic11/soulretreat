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
  
        <div class="content">
          <div class="elipsa">
            <div class="sredina">
                <div class="icon-container" @click="navigateTo('Slike')">
                <img src="@/assets/icon photo.png" style="width: 150px" alt="Slike">
                <div class="icon-text">Slike</div>
                </div>
                <div class="spacer"></div>

                <div class="icon-container" @click="navigateTo('Videi')">
                <img src="@/assets/icon video.png" style="width: 150px" alt="Videi">
                <div class="icon-text">Videi</div>
                </div>
                <div class="spacer"></div>

                <div class="icon-container" @click="navigateTo('Glazba')">
                <img src="@/assets/icon music.png" style="width: 150px" alt="Glazba">
                <div class="icon-text">Glazba</div>
                </div>
                <div class="spacer"></div>

                <div class="icon-container" @click="navigateTo('Citati')">
                <img src="@/assets/icon quotes.png" style="width: 150px" alt="Citati">
                <div class="icon-text">Citati</div>
                </div>
              <div class="spacer"></div>
            </div>
          </div>
        </div>
  
        <div class="footer">
          <div class="footer-inner">
            <div class="footer-text" @click="navigateTo('BasePage')">SoulRetreat.</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(route) {
        if (route === 'Slike') {
          this.$router.push(`/slike`);
        } else if (route === 'Videi') {
          this.$router.push(`/videi`);
        } else if (route === 'Citati') {
          this.$router.push(`/citati`);
        } else if (route === 'Glazba') {
          this.$router.push(`/glazba`);
        } else if (route === 'Profil') {
          this.$router.push(`/profil`);
        } else if (route === 'Odjava') {
          this.$router.push(`/odjava`);
        } else {
          this.$router.push(`/${route}`);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .background {
    background-image: url('../assets/pozadina.jpg');
    background-size: cover;
    background-position: center;
    height: 900px;
  }

  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .header {
    color: white;
    padding: 10px 20px;
    font-size: 20px;
    margin-top: 5px;
    margin-left: 20%;
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
    margin-left: 20%;
  }

  .footer-text {
    color: #145c7b;
    margin-left: auto;
    font-weight: bold;
    font-size: 25px;
  }

  .icon {
    margin: 0 20px;
    cursor: pointer;
  }

  .content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .elipsa {
    width: 100%;
    max-width: 1200px;
    height: 200px;
    border-radius: 50px;
    background-color: #509ff47d;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    margin: 20px auto;
  }

  .sredina {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 150px;
    position: relative;
    z-index: 1;
  }

  .icon-container {
    cursor: pointer;
    display: flex;
    flex-direction: column; 
    align-items: center;
    margin-bottom: 20px;
  }

  .icon-text {
    margin-top: 5px;
    text-align: center;
    color: white;
    font-size: 16px;
  }

  .text {
    text-align: center;
    margin-left: 0;
    margin-bottom: 20px;
    margin-right: 0;
  }

  .spacer {
    width: 150px;
  }

  @media (max-width: 768px) {
    .elipsa {
      height: auto;
      padding: 20px;
    }

    .sredina {
      flex-direction: column;
      padding: 0;
    }

    .text {
      margin-left: 0;
      margin-right: 0;
    }
  }

  @media (max-width: 480px) {
    .icon-container {
      flex-direction: column;
      margin-bottom: 40px;
    }

    .spacer {
      width: 0;
    }

    .text {
      margin-bottom: 20px;
    }
  }

  @media screen and (max-width: 1100px) {
    .sredina {
      flex-direction: column;
      align-items: center;
    }

    .icon-container {
      margin-bottom: 10px;
    }

    .spacer {
      display: none;
    }

    .text-container {
      display: none;
    }
  }
</style>
