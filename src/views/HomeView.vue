<template>
  <div class="home">
    <div class="content">
      <h1 class="welcome"> Dobrodošli u SoulRetreat </h1>
      <p class="tekstispod"> Prijavite se i li se registrirajte kako biste započeli svoje putovanje prema unutarnjoj ravnoteži. </p>
      <div class="buttons">
         <button class ="login" @click="goToLogin"> Prijava </button>
         <button class ="register" @click="goToRegistration"> Registracija </button>
      </div>
    </div>
    <div class="right">
        <h4 class="goredesno"> Odmorite dušu i pronađite unutarnji mir.</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    goToLogin(){
      this.$router.push('/login');
    },
    goToRegistration(){
      this.$router.push('/registration');
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  background-image: url('../assets/pozadina.jpg'); 
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #ffffff;
}

.content{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 50px;
  margin-top: 45vh;
}

.right{
  position: absolute;
  top: 40px;
  right: 50px;
}

.welcome{
  margin-bottom: 20px;
}

.tekstispod{
  margin-bottom: 20px;
}

.goredesno{
  font-size: 18px;
}

.buttons{
  display: flex;
  flex-direction: row;
}

.buttons button{
  margin-top: 10px;
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px;
  color: white;
  border: none;
}
.buttons button.login{
  background-color:rgb(0, 135, 150);
}

.buttons button.register{
  background-color: rgb(16, 163, 82);
}
.buttons button:last-child{
  margin-right: 0;
}
</style>