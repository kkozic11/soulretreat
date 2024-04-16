<template>
<div class="background">
 <div class="container">
    <div class="header">
    <div class= "button-container">
        <span class="icon" @click="navigateTo('Slike')">Slike</span>
        <span class="icon-active" @click="navigateTo('Videi')">Videi</span>
        <span class="icon" @click="navigateTo('Citati')">Citati</span>
        <span class="icon" @click="navigateTo('Glazba')">Glazba</span>
        <span class="icon" @click="navigateTo('Profil')">Profil</span>
        <span class="icon" @click="navigateTo('Odjava')">Odjava</span>
    </div>
 </div>
   <div class="grid-container">
  <div class="grid-item">
  <div class="content">
    <div class="video-opis">
    <p class="video-text">Proljeće se budi</p>
    </div>
     <video width="280" height="210" controls>
            <source src="../assets/Video1.mp4" type="video/mp4">
     </video>
  </div>
  </div>
    <div class="grid-item">
        <div class="content">
            <div class="video-opis">
                <p class="video-text">More i mir</p>
            </div>
             <video width="280" height="210" controls>
            <source src="../assets/Video2.mp4" type="video/mp4">
            </video>
        </div>
    </div>
    <div class="grid-item">
        <div class="content">
            <div class="video-opis">
                <p class="video-text">Ljubav je svuda oko nas</p>
            </div>
              <video width="280" height="210" controls>
            <source src="../assets/Video5.mp4" type="video/mp4">
            </video>
        </div>
    </div>
    <div class="grid-item">
        <div class="content">
            <div class="video-opis">
                <p class="video-text">I kiša može popraviti dan</p>
            </div>
              <video width="280" height="210" controls>
            <source src="../assets/Video4.mp4" type="video/mp4">
            </video>
        </div>
    </div>
    <div class="grid-item">
        <div class="content">
            <div class="video-opis">
                <p class="video-text">Toplina srca</p>
            </div>
              <video width="280" height="210" controls>
            <source src="../assets/Video5.mp4" type="video/mp4">
            </video>
        </div>
    </div>

    <div class="grid-item">
        <div class="content">
            <div class="video-opis">
                <p class="video-text">Zelenilo, voda i vibracije</p>
            </div>
             <video width="280" height="210" controls>
            <source src="../assets/Video6.mp4" type="video/mp4">
            </video>
        </div>
    </div>


</div>
      
 </div>
    <div class ="footer">
        <div class ="footer-inner">
            <div class="footer-text" @click="navigateTo('BasePage')"> SoulRetreat.</div>
        </div>
     </div>
  </div>
</template>

<script>
export default {
     methods: {
        navigateTo(route){
             if (route === 'Slike') {
                this.$router.push(`/slike`); 
            } else if (route === 'HomeView') {
        this.$router.push(`/homeview`);
            } else if (route === 'Videi') {
        this.$router.push(`/videi`);
        } else if (route === 'Citati') {
        this.$router.push(`/citati`);
        } else if (route === `Glazba`) {
        this.$router.push(`/glazba`);
        } else if (route === 'Profil') {
        this.$router.push(`/profil`);
        } else if (route === 'Odjava') {
        this.$router.push(`/odjava`);
    } else {
        this.$router.push(`/${route}`);

    }
        }
 }
}
</script>

<style scoped>
.video{
    margin-bottom: 2px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  grid-auto-rows: minmax(5cm, auto); 
  gap: 10px;
  margin-top: 10px; 
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; 
  border-radius: 20px; 
}

.content {
  flex-direction: column;
}

.video-text{
    margin-bottom: 10px;
}

.content iframe {
  border-radius: 10px;
}

.video-text {
  color: #e10996;
  text-size-adjust: 50;
  font-weight: bold;
}

.icon-active{
    text-decoration: white;
}

.background{
    background-image: url('../assets/pozadina.jpg'); 
    background-size: cover;
    background-position: center;
    height: 100vh;
}

.container{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.button-container{
    display: flex;
    justify-content: flex-end;
}

.content{
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.elipsa{
    width: 1450px;
    height: 200px;
    border-radius: 50px;
    background-color:#509ff47d;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: relative;
}

.sredina{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-left: 150px;
    position: relative;
    z-index: 1;
}

.icon-container{
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
}

.header{
    color: white;
    padding: 10px 20px;
    font-size: 20px;
    margin-top: 5px;
    margin-left: 20%;
}

.footer{
    background-color: #509ff4;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}

.footer-inner{
    max-width: 1200px;
    margin: 0 auto;
    padding: 7px;
    display: flex;
    align-items: center;
    margin-left: 20%;
}

.footer-text{
    color: #145c7b;
    margin-left: auto;
    font-weight: bold;
    font-size: 25px;
}

.icon{
    margin: 0 10px;
    cursor: pointer;
}

.text-container{
    flex-direction: row;
    display: flex;
    justify-content: space-between;

}

.text{
    text-align: center;
    margin-left: 80px ;
    margin-bottom: 40px;
    margin-right: 40px;
}


.spacer{
    width: 150px;
}

.grid-container{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(5cm, auto);
    gap: 10px;
    margin-top: 10px;
}

.content iframe,
.content video {
    width: 100%; /* Puni širina unutar roditeljskog elementa */
    height: auto; /* Automatska visina */
    border-radius: 10px;
}

/* Media upiti za responzivnost */
@media screen and (max-width: 768px) {
    .grid-container {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Prilagođeni raspored za manje zaslone */
    }
}

@media screen and (max-width: 480px) {
    .grid-container {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Prilagođeni raspored za još manje zaslone */
    }
}
</style>