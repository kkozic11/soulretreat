<template>
  <div class="background">
    <div class="container">
      <div class="header">
        <div class= "button-container">
          <span class="icon" @click="navigateTo('Slike')">Slike</span>
          <span class="icon" @click="navigateTo('Videi')">Videi</span>
          <span class="icon-active" @click="navigateTo('Citati')">Citati</span>
          <span class="icon" @click="navigateTo('Glazba')">Glazba</span>
          <span class="icon" @click="navigateTo('Profil')">Profil</span>
          <span class="icon" @click="navigateTo('Odjava')">Odjava</span>
        </div>
      </div>
      
      <div class="slideshow-container">
        <div v-for="(quote, index) in quotes" :key="index" class="quote-slide fade" :class="{ 'active-slide': slideIndex === index }">
          <div class="quote" :style="{ backgroundColor: quote.backgroundColor }">{{ quote.text }}</div>
        </div>

        <div class="text-box">
          <p class="quote" :style="{ color: 'white' }">{{ quotes[slideIndex].text }}</p>
          <a class="prev" @click="plusSlides(-1)">&#10094;</a>
          <a class="next" @click="plusSlides(1)">&#10095;</a>
          <div class="dots">
            <span v-for="(quote, index) in quotes" :key="index" class="dot" @click="currentSlide(index)" :class="{ 'active': slideIndex === index, 'inactive': slideIndex !== index }"></span>
          </div>
        </div>
      </div>

      <div class ="footer">
        <div class ="footer-inner">
           <div class="footer-text"><router-link to="/basepage">SoulRetreat.</router-link></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideIndex: 0,
      quotes: [
        { text: "“Brod je siguran u luci, ali brod nije izgađen da bi bio u luci…” William H Shedd", backgroundColor: "#145c7b" }, 
        { text: "“Budi promjena koju želiš vidjeti u svijetu.” Gandhi", backgroundColor: "#e76f51" }, 
        { text: "“Cijeli svijet se sklanja s puta čovjeku koji zna kuda ide.” Ralph Waldo Emerson", backgroundColor: "#e3d23c" } 
      ]
    };
  },
  computed: {
    currentBackgroundColor() {
      return this.quotes[this.slideIndex].backgroundColor;
    }
  },
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
    plusSlides(n) {
      this.slideIndex += n;
      if (this.slideIndex >= this.quotes.length) {
        this.slideIndex = 0;
      } else if (this.slideIndex < 0) {
        this.slideIndex = this.quotes.length - 1;
      }
      this.updateBackgroundColor();
    },
    currentSlide(n) {
      this.slideIndex = n;
      this.updateBackgroundColor();
    },
    updateBackgroundColor() {
    const currentQuote = this.quotes[this.slideIndex];
    const textBox = document.querySelector('.text-box');
    if (textBox) {
    textBox.style.backgroundColor = currentQuote.backgroundColor;
  }
}

  }
}
</script>

<style scoped>

.text-box {
  background-color: #145c7b;
  position: relative;
  height: 200px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

.text-box .dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.text-box .prev,
.text-box .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 24px;
  color: black;
  background-color: transparent;
  padding: 10px;
}

.text-box .prev {
  left: 0;
}

.text-box .next {
  right: 0;
}

.dots {
  text-align: center;
  margin-top: 20px;
}

.dot {
  height: 15px;
  width: 15px;
  margin: 0 5px;
  background-color: #5b5a5a;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
}

.icon-active{
  text-decoration: underline 2pt white;
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
.header{
  color: white;
  padding: 10px 20px;
  font-size: 20px;
  margin-top: 5px;
  margin-left: 20%;
  margin-bottom: 100px;
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
  justify-content: center; 
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

.dot.active {
  background-color: black; 
}
.quote-slide {
  padding: 20px; 
}
.active-slide {
  display: block;
}
.fade {
  display: none;
}
</style>