<template>
<div class="background">
 <div class="container">
    <div class="header">
    <div class= "button-container">
        <span class="icon" @click="navigateTo('Slike')">Slike</span>
        <span class="icon" @click="navigateTo('Videi')">Videi</span>
        <span class="icon" @click="navigateTo('Citati')">Citati</span>
        <span class="icon" @click="navigateTo('Glazba')">Glazba</span>
        <span class="icon-active" @click="navigateTo('Profil')">Profil</span>
        <span class="icon" @click="navigateTo('Odjava')">Odjava</span>
    </div>
    </div>
    
    <div class="content">
        <div class="elipsa">
             <div class="sredina">
                <div class="icon-container" @click="navigateTo('Slike')"><img src="../assets/icon photo.png" style="width: 150px"></div>
                 <div class="spacer"></div>
                <div class="icon-container" @click="navigateTo('Videi')"><img src="../assets/icon video.png" style="width: 150px"></div>
                <div class="spacer"></div>
                <div class="icon-container" @click="navigateTo('Glazba')"><img src="../assets/icon music.png" style="width: 150px"></div>
                 <div class="spacer"></div>
                <div class="icon-container" @click="navigateTo('Citati')"><img src="../assets/icon quotes.png" style="width: 150px" ></div>
                 <div class="spacer"></div>
    </div>  
     <div class="text-container">
            <div class="text">Slike</div> 
            <div class="spacer"></div>
            <div class="text">Videi</div>
            <div class="spacer"></div>
            <div class="text">Glazba</div>
            <div class="spacer"></div>
            <div class="text">Citati</div>
    </div>    
    </div>
 </div>
    <div class ="footer">
        <div class ="footer-inner">
            <div class="footer-text"> SoulRetreat.</div>
        </div>
     </div>
  </div>
</div>
</template>

<script>
export default {
     methods: {
        navigateTo(route){
             if (route === 'Slike') {
                this.$router.push('/Slike'); // Navigacija na stranicu 'slike' ako je ikona 'Slike' kliknuta
            } else if (route === 'Videi') {
        this.$router.push('/videi');
    } else {
        this.$router.push('/${route}');
    }
        }
 }
}
</script>

<style scoped>
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
</style>