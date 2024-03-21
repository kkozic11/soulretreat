<template>
<div class="background">
 <div class ="container">
    <div class="header">
    <div class= "button-container">
        <span class="icon" @click="navigateTo('slike')">Slike</span>
        <span class="icon" @click="navigateTo('videi')">Videi</span>
        <span class="icon" @click="navigateTo('citati')">Citati</span>
        <span class="icon" @click="navigateTo('glazba')">Glazba</span>
        <span class="icon" @click="navigateTo('profil')">Profil</span>
        <span class="icon" @click="navigateTo('odjava')">Odjava</span>
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
            this.$router.push('/${route}');
        }
     }
}
</script>

<style scoped>

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

</style>