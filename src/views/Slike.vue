<template>
<div class="background">
 <div class="container">
    <div class="header">
    <div class= "button-container">
        <span class="icon-active" @click="navigateTo('slike')">Slike</span>
        <span class="icon" @click="navigateTo('videi')">Videi</span>
        <span class="icon" @click="navigateTo('citati')">Citati</span>
        <span class="icon" @click="navigateTo('glazba')">Glazba</span>
        <span class="icon" @click="navigateTo('profil')">Profil</span>
        <span class="icon" @click="navigateTo('odjava')">Odjava</span>
    </div>
    </div>
    <div class="slideshow-container">
    <div id="slideshow" class="slideshow">
     <img src="../assets/opustanje1.jpg" alt="Slika 1">
     <img src="../assets/opustanje2.jpg" alt="Slika 2">
     <img src="../assets/opustanje3.jpg" alt="Slika 3">
     <img src="../assets/opustanje4.jpg" alt="Slika 4">
    </div>
    </div>
    </div>
 </div>
    <div class ="footer">
        <div class ="footer-inner">
             <div class="footer-text"><router-link to="/basepage">SoulRetreat.</router-link></div>
        </div>
     </div>
</template>

<script>
export default {
     methods: {
        navigateTo(route){
            this.$router.push('/${route}');
        }
     },
mounted(){
let currentImageIndex = 0;
const images = document.querySelectorAll('#slideshow img');

function showNextImage() {
  images[currentImageIndex].classList.remove('active');
  currentImageIndex = (currentImageIndex + 1) % images.length;
  images[currentImageIndex].classList.add('active');
}

setInterval(showNextImage, 5000);
}
}
</script>

<style scoped>
.icon-active{
    text-decoration: underline;
}

.slideshow{
    width: 100vw;
    margin: 0 -50vw;
    padding: 0 50vw;
    overflow: hidden;
}


#slideshow img{
    position:absolute;
    top: 8;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1s ease;
}

#slideshow img.active{
    opacity: 1;
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
</style>