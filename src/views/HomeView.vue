<template>
  <div class="home">
    <h1 class="dobrodosli"> {{msg}} </h1>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/Home.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
}

.dobrodosli {
  font-size: 24px;
  color: #ffff;
}
</style>