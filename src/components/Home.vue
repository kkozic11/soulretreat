<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Prijavite se ili registrirajte kako biste započeli svoje putovanje prema unutarnjoj ravnoteži.
    </p>

    <h4 class="goredesno">Odmorite dušu i pronađite unutarnji mir.</h4>
     <button @click="goToLogin">Prijava</button>
 
    <button @click="goToRegistration">Registracija</button>

  </div>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  methods:{
    goToLogin(){
      this.$router.push('/login');
    },
    goToRegistration(){
      this.$router.push('/registration');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.goredesno {
  position: absolute;
  top: 0;
  right: 0;
  margin: 30px;
}

body {
  background-image: url('../assets/pozadina.jpg');
}
h3 {
  margin: 40px 0 0;
}
p {
  margin: 250px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
