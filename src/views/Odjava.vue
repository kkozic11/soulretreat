<template>
  <div class="home">
    <div class="content">
      <h1 class="welcome"> Uspješno ste se odjavili iz SoulRetreata. </h1>

      <div class="buttons">
         <button class ="login" @click="goToLogin"> Ponovna prijava </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    goToLogin(){
      this.$router.push('/login');
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
  font-size: 27px;
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

</style>