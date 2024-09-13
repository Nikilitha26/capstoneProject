<template>
  <div class="home">
    <div class="top-row" :style="{ backgroundImage: `url(${imageUrl})` }">
      <div class="left-column">
        <h1 class="welcome-heading">Welcome to MindWell!</h1>
        <p class="welcome-paragraph"> We are dedicated to providing compassionate,
           evidence-based mental health care to individuals and families across South Africa. Whether you are
           located in Cape Town, Durban, Johannesburg, or Pretoria, our team of experienced psychologists and 
           counselors is here to help you find the support and guidance you need to achieve optimal well-being. 
           With a wide range of expertise in areas such as anxiety, depression, addiction, and relationship issues, 
           we are committed to helping our clients reach their personal goals and live their best lives. Thank you 
           for choosing MindWell as your partner on your journey towards mental health and wellness.
        </p>
        <button class="explore-button" @click="$router.push('/products')">Explore More</button>
      </div>
      <div class="right-column">
        <div class="image-container">
          <div v-for="(image, index) in images" :key="index" class="image-wrapper">
            <img :src="image.src" :class="{ active: currentIndex === index }" />
            <div class="image-title-container">
              <h2 class="image-title">{{ image.title }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>

        <div class="middle-row">
      <div class="lefts-column">
        <img src="https://nikilitha26.github.io/capstoneImages/OIP.jpeg" alt="Image 1">
      </div>
      <div class="middles-column">
        <h3 class="middles-paragraph">FEELING STRESSED/ANXIOUS?</h3>
        <p class="word">The MindWell Anxiety and Depression Resource Guide is a comprehensive resource designed 
          to help you better understand and cope with these complex and challenging conditions. This guide provides
           a wealth of information on the causes, symptoms, and treatments for anxiety and depression, as well as
            practical strategies for managing stress, improving communication, and improving overall well-being. 
            Whether you are seeking to better understand your own experience with anxiety or depression, or are 
            looking to support a loved one, this guide can help you take the first steps towards a happier, healthier life.</p>
        <button class="pdf-button" @click="downloadPdf">View and Download PDF</button>
      </div>
      <div class="rights-column">
        <img src="https://nikilitha26.github.io/capstoneImages/OIP%20(1).jpeg" alt="Image 2">
      </div>
    </div>

    <div class="bottom-row">
  <h3 class="avail">AVAILABLE SERVICES:</h3>

  <div class="d-flex flex-wrap">
    <div class="col-md-6">
      <h3 class="category-title">CLINICAL PSYCHOLOGISTS</h3>
      <div class="card-container">
        <div class="card-slider">
          <div v-for="(card, index) in cards" :key="index" class="card" :class="{ active: currentIndex === index }">
            <img :src="card.image" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ card.title }}</h5>
              <p class="card-text">{{ card.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h3 id="cat" class="category-title">COUNSELLORS</h3>
      <div class="card-container">
        <div class="card-slider">
          <div v-for="(counsellor, index) in counsellors" :key="index" class="card" :class="{ active: counsellorIndex === index }">
            <img :src="counsellor.image" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ counsellor.title }}</h5>
              <p class="card-text">{{ counsellor.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-grid gap-2 d-md-flex justify-content-md-center">
    <button class="btn1" @click="$router.push('/products')">View More Products</button>
  </div>
</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: 'https://nikilitha26.github.io/capstoneImages/pic.jpg',
      images: [
        { src: 'https://nikilitha26.github.io/capstoneImages/Dr%20Caitelin%20Dalwai.jpg', title: 'Dr. Caitelin Dalwai' },
        { src: 'https://nikilitha26.github.io/capstoneImages/Dr%20Frank%20Abudue.jpg', title: 'Dr. Frank Abudue' },
        { src: 'https://nikilitha26.github.io/capstoneImages/Dr%20Candice%20Hendicks.jpg', title: 'Dr. Candice Hendicks' },
        { src: 'https://nikilitha26.github.io/capstoneImages/Dr%20Richard%20Sterling.jpg', title: 'Dr. Richard Sterling' },
        { src: 'https://nikilitha26.github.io/capstoneImages/Dr%20Chandre%20Davids.jpg', title: 'Dr. Chandre Davids' },
        { src: 'https://nikilitha26.github.io/capstoneImages/Prof%20Charles%20Bennet.jpg', title: 'Prof. Charles Bennet' },
        { src: 'https://nikilitha26.github.io/capstoneImages/Dr%20Kylie%20Keet.jpg', title: 'Dr. Kylie Keet' },
        { src: 'https://nikilitha26.github.io/capstoneImages/Dr%20Tyra%20Parring.jpg', title: 'Dr. Tyra Parring' },
      ],
      currentIndex: 0,
      cards: [
        { image: 'https://nikilitha26.github.io/capstoneImages/Dr%20Caitelin%20Dalwai.jpg', title: 'Dr. Caitelin Dalwai', price: 'R800' },
        { image: 'https://nikilitha26.github.io/capstoneImages/Dr%20Frank%20Abudue.jpg', title: 'Dr. Frank Abudue', price: 'R900' },
        { image: 'https://nikilitha26.github.io/capstoneImages/Dr%20Candice%20Hendicks.jpg', title: 'Dr. Candice Hendicks', price: 'R1000' },
        { image: 'https://nikilitha26.github.io/capstoneImages/Dr%20Chandre%20Davids.jpg', title: 'Dr. Chandre Davids', price: 'R1300'},
      ],
      currentIndex: 0,
      counsellors: [
      { image: 'https://nikilitha26.github.io/capstoneImages/Prof%20Charles%20Bennet.jpg', title: 'Dr. Charles Bennet', price: 'R750' },
      { image: 'https://nikilitha26.github.io/capstoneImages/Dr%20Kylie%20Keet.jpg', title: 'Dr. Kylie Keet', price: 'R800' },
      { image: 'https://nikilitha26.github.io/capstoneImages/Dr%20Richard%20Sterling.jpg', title: 'Dr. Richard Sterling', price: 'R800' },
      { image: 'https://nikilitha26.github.io/capstoneImages/Dr%20Tyra%20Parring.jpg', title: 'Dr. Tyra Parring', price: 'R1000' },
    ],
    counsellorIndex: 0,
    }
  },
  methods: {
    downloadPdf() {
    console.log('downloadPdf method called');
    console.log('isLoggedIn:', this.$store.state.isLoggedIn);
    console.log('User data:', this.$store.state.user);
    if (!this.$store.state.user || !this.$store.state.user.length > 0) { 
      console.log('User is not logged in, redirecting to login page');
      this.$router.push('/login'); 
      return;
    }
    console.log('User is logged in, downloading PDF');
    const pdfUrl = 'https://nikilitha26.github.io/capstoneImages/GuidelinesontheManagementofDepression[1].pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'pdf-file.pdf';
    link.click();
  }
},

  mounted() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
    }, 2500) 
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.cards.length
    }, 2500) 
    setInterval(() => {
    this.counsellorIndex = (this.counsellorIndex + 1) % this.counsellors.length
  }, 2500)
  }
}
</script>
<style scoped>
.home {
  height: auto;
  display: flex;
  width: auto;
  flex-direction: column;
}

.top-row {
  background-size: cover; 
  background-position: center; 
  height: 90vh;
  position: relative; 
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  /* z-index: -1;  */
}

.top-row::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* semi-transparent black overlay */
  z-index: 1;
}

.left-column {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: 20px;
}

.right-column {
  grid-column: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; 
}

.image-container {
    position: relative;
    width: 400px;
    height: 300px; 
    left: 120px;
    padding: 0;
  }

  .image-container img {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 85%; 
    max-height: 85%; 
    object-fit: cover;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 2s, transform 2s;
    border-radius: 10px; 
  }

.image-container img.active {
  opacity: 1;
  transform: scale(1);
}

.image-title-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    color: #fff;
    padding: 10px;
  }

  .image-title {
    font-size: 24px; 
    font-weight: bold;
    margin-bottom: 10px;
    transition: opacity 2s;
    opacity: 0;
    position: relative;
    right: 70px;
  }

.welcome-heading {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 40px;
  color: #fff; 
  position: relative;
  left: 40px;
}

.image-container img.active + .image-title-container .image-title {
    opacity: 1; 
  }


.welcome-paragraph {
  font-size: 20px;
  margin-bottom: 40px;
  color: #fff; 
  position: relative;
  left: 50px;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 1000;
  font-style: normal;
}

.explore-button {
  background-color: rgb(148, 118, 103);
  color: #fff; 
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  top: 20px;
  margin-left: 100px;
  border-radius: 5px;
}

.explore-button:hover {
  background-color: white !important; 
  color: rgb(148, 118, 103);
}

/* middle */

.middle-row {
    background-color: rgb(148, 118, 103);
    height: auto;
    flex-shrink: 0;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-gap: 20px;
    padding: 20px;
  }

  .lefts-column {
    grid-column: 1;
  }

  .lefts-column img {
  max-width: 250px;
  max-height: 250px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #fff;
  padding: 10px;
  margin-top: 80px;
  position: relative;
  right: 100px;
  margin-bottom: 50px;
}

  .middles-column {
    grid-column: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .rights-column {
    grid-column: 3;
  }

  .rights-column img {
  max-width: 250px;
  max-height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 80px;
  position: relative;
  left: 74px;
}

  .middles-paragraph {
    position: relative;
    bottom: 70px;
    margin-top: 30px;
    color: #fff;
  }

  .word{
    font-size: 15px;
    color: #fff;
    position: relative;
    bottom: 30px;
  }

  .pdf-button {
    background-color: white;
    color: rgb(148, 118, 103);
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
  }

  .pdf-button:hover {
    background-color: rgb(149, 96, 70);
    color: white;
  }

  /* bottom */
  
.bottom-row {
  background-color: white;
  height:auto;
  flex-shrink: 0; 
}

.avail {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 60px;
  margin-top: 40px;
  text-align: center;
  color: #333; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); 
}

.category-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); 
  text-align: center;
}

.category-title::after {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  background-color: #333; 
  margin: 10px auto;
}


  .card {
  width: 300px; 
  margin: 10px;
  position: relative;
  left: 50px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(to bottom, #f7f7f7, #e7e7e7);
  background-size: 100% 200px;
  background-position: 0% 100%;
  transition: background-position 0.3s ease-out;
}

.card:hover {
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
  transition: all 0.3s ease-out;
  background-position: 100% 100%;
}


.card-img-top {
  width: 100%; 
  height: 270px; 
  object-fit: cover;
  border-radius: 10px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.card-text {
  font-size: 16px;
  color: #666;
}

.card-container {
  position: relative;
  width: 300px;
  height: 400px;
  overflow: hidden;
  position: relative;
  left: 220px !important;
  margin: 20px;
}

.card-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 0;
}

.card-slider .card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 2s, transform 2s;
}

.card-slider .card.active {
  opacity: 1;
  transform: translateX(0);
}

.card-slider .card:not(.active) {
  transform: translateX(-100%);
}

.btn1{
  background: rgb(149, 96, 70);
  color: white;
  padding: 8px;
  border-radius: 5px;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
}

.btn1:hover{
  background: white;
  color:rgb(148, 118, 103);
  transform: scale(1.05); 
}

.btn1:active {
  transform: scale(1.1); 
  color: rgb(148, 118, 103);
  background-color: white;
}

@media only screen and (max-width: 400px) {
  .top-row {
    grid-template-columns: 1fr;
    height: auto;
    padding-bottom: 20px;
    margin-bottom: 0;
  }
  .left-column {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: 0 !important;
  position: relative;
  right: 70px;
  text-align: justify;
}
  .right-column {
    grid-column: 1;
    grid-row: 2;
    position: relative;
    right: 20px;
    height: 100%;
    padding: 0px;
    width: 300px;
  }
  .welcome-paragraph {
    font-size: 16px;
    width: 100vw; 
    line-height: 1.2;
    padding: 6px ;
    position: relative;
    left: 70px;
    font-family: "Cormorant", serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
  }

.welcome-heading {
  position: relative;
  left: 60px;
  font-size: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 1000;
  font-style: normal;
  
  }
  .explore-button {
    position: relative;
    top: -20px;
    margin-left: 130px;
    padding: 5px;
  }
  .explore-button:hover{
    background-color: white !important;
    color: rgb(148, 118, 103) !important;
  }
  .image-container {
    position: relative;
    top: 130px; 
    left: 30px;
    width: 250px;
    height: 250px;
    padding: 0;
    margin-right: 10px;
  }
  .image-container img {
  position: absolute;
  top: -120px;
  left: 20px;
  max-width: 85%;
  max-height: 85%;
  object-fit: cover;
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 2s, transform 2s;
  border-radius: 10px;
}

.image-title-container {
  position: absolute;
  bottom: 0;
  top: 100px;
  left: 0;
  width: 100%;
  color: #fff;
  padding: 0;
  text-align: center; 
}

.image-title {
  font-size: 18px;
  font-weight: bold;
  /* margin-top: 40px; */
  transition: opacity 2s;
  opacity: 0;
  position: relative;
  right: 20px;
  top: 0px;
}
.image-container img.active + .image-title-container .image-title {
  opacity: 1;
}

/* middle-row */

.middle-row {
  flex-direction: column;
  align-items: center;
  width: auto !important;
  height: auto;
  overflow: hidden;
  padding: 0;
  margin-top: 0;
}

.middles-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  padding: 20px;
}
.middles-paragraph {
    font-size: 18px;
    position: relative;
    right: 310px;
    top: 0px;
    /* margin-bottom: 50px; */
  }
  .lefts-column {
    margin-top: 0;
  }
  .lefts-column img {
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
    border-radius: 10px;
    border: 2px solid #fff;
    padding: 10px;
    position: relative;
    bottom: 40px;
    left: 10px;
    margin: 10px auto;
  }
  .rights-column {
    grid-column: 1;
    margin-top: 200px;
    margin-right: 30px;

  }
  .rights-column img{
    position: relative;
    left: 25px;
    margin: 10px auto;
    bottom: 10px;
  }

  .word {
    width: 90vw;
    position: relative;
    top: 290px; 
    right: 300px;
    margin-bottom: 50px;
    font-family: "Cormorant", serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    }
    .pdf-button {
      position: relative;
      top: 260px; 
      right: 310px;
      font-size: 15px;
      margin-bottom: 20px;
      padding: 7px;
    }

    /* bottom-row */
    .avail {
    font-size: 24px;
  }
  .category-title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .col-md-6 {
    width: 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }
  .card-container {
    width: 100%;
    margin: 10px;
    left: -10px !important;
  }
  .card-slider {
    flex-direction: column;
  }
  .card-slider {
    overflow-x: hidden; 
  }
  .card-slider .card {
    transform: translateX(0); 
  }
  .card {
    width: 150px; 
    height: 300px; 
    margin: 10px;
    padding: 10px;
    background-image: none;
    background-color: #fff; 
  }
  .card-img-top {
    height: 150px; 
  }
  .card-title {
    font-size: 14px;
  }
  .card-text {
    font-size: 12px;
  }
  .card-body{
    height: 50px;
  }
  .btn1 {
    width: 50%;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 15px;
    position: relative;
    left: 80px;
  }
  #cat{
    margin-top: 20px;
  }
  }

  @media only screen and (min-width: 400px) and (max-width: 700px) {
  .top-row {
    grid-template-columns: 1fr;
    height: auto;
    padding-bottom: 20px;
    margin-bottom: 0;
  }
  .left-column {
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    padding: 20px;
  }
  .right-column {
    grid-column: 1;
    grid-row: 2;
    position: relative;
    right: 20px;
    height: 100%;
    padding: 20px;
  }
  .welcome-paragraph {
    font-size: 18px;
    width: 90vw;
    line-height: 1.2;
    padding: 10px;
    position: relative;
    left: 20px;
    font-family: "Cormorant", serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
  }
  .welcome-heading {
    position: relative;
    left: 20px;
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: "Cormorant", serif;
    font-optical-sizing: auto;
    font-weight: 1000;
    font-style: normal;
  }
  .explore-button {
    position: relative;
    top: -20px;
    margin-left: 150px;
    padding: 10px;
  }
  .image-container {
    position: relative;
    top: 150px;
    left: 50px;
    width: 300px;
    height: 250px;
    padding: 0;
  }
  .image-container img {
    position: absolute;
    top: -120px;
    left: 20px;
    max-width: 85%;
    max-height: 85%;
    object-fit: cover;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 2s, transform 2s;
    border-radius: 10px;
  }
  .image-title-container {
    position: absolute;
    bottom: 0;
    top: 100px;
    left: 0;
    width: 100%;
    color: #fff;
    padding: 10px;
    text-align: center;
  }
  .image-title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 0px;
    transition: opacity 2s;
    opacity: 0;
    position: relative;
    right: 20px;
    top: 0px;
  }
  .image-container img.active + .image-title-container .image-title {
    opacity: 1;
  }
  /* middle-row */
  .middle-row {
    flex-direction: column;
    align-items: center;
    width: auto;
    height: auto;
    overflow: hidden;
    padding: 20px;
    /* margin-top: 20px; */
  }

  .middles-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    padding: 20px;
  }

  .lefts-column, .middles-column, .rights-column {
    grid-column: 1;
    margin-top: 0;
  }

  .lefts-column img, .rights-column img {
    max-width: 250px;
    max-height: 250px;
    object-fit: cover;
    border-radius: 10px;
    border: 2px solid #fff;
    padding: 10px;
    margin: 10px auto;
    position: relative;
    left: -30px;
  }

  .middles-paragraph {
    font-size: 18px;
    margin-bottom: 20px;
    position: relative;
    right: 20px;
  }

  .word {
    width: 90vw;
    margin-bottom: 20px;
    position: relative;
    right: 20px;
  }

  .pdf-button {
    margin-bottom: 20px;
    position: relative;
    right: 25px;
  }
  .bottom-row {
    background-color: white;
    height: auto;
    flex-shrink: 0;
    padding: 20px;
  }
  .avail {
    font-size: 24px;
  }
  .category-title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .col-md-6 {
    width: 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }
  .card-container {
    width: 100%;
    margin: 10px;
    left: -10px !important;
  }
  .card-slider {
    flex-direction: column;
  }
  .card-slider {
    overflow-x: hidden;
  }
  .card-slider .card {
    transform: translateX(0);
  }
  .card {
    width: 150px;
    height: 300px;
    margin: 10px;
    padding: 10px;
    background-image: none;
    background-color: #fff;
  }
  .card-img-top {
    height: 150px;
  }
  .card-title {
    font-size: 14px;
  }
  .card-text {
    font-size: 12px;
  }
  .card-body {
    height: 50px;
  }
  .btn1 {
    width: 50%;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 15px;
    position: relative;
    left: 80px;
  }
  #cat {
    margin-top: 20px;
  }
}

@media only screen and (min-width: 701px) and (max-width: 900px) {
  .top-row {
    grid-template-columns: 1fr 1fr;
    height: auto;
    padding-bottom: 20px;
    margin-bottom: 0;
    overflow: hidden;
  }
  .left-column {
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    padding: 20px;
  }
  .right-column {
  grid-column: 1;
  grid-row: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
  .welcome-paragraph {
    font-size: 20px;
    width: 80vw;
    line-height: 1.2;
    padding: 10px;
    position: relative;
    left: 20px;
    font-family: "Cormorant", serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
  }
  .welcome-heading {
    position: relative;
    left: 20px;
    font-size: 36px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: "Cormorant", serif;
    font-optical-sizing: auto;
    font-weight: 1000;
    font-style: normal;
  }
  .explore-button {
    position: relative;
    top: -20px;
    margin-left: 120px;
    padding: 10px;
  }
  .image-container {
    position: relative;
    top: 150px;
    left: 50px;
    width: 400px;
    height: 300px;
    padding: 0;
  }
  .image-container img {
    position: absolute;
    top: -170px;
    left: 70px;
    max-width: 85%;
    max-height: 85%;
    object-fit: cover;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 2s, transform 2s;
    border-radius: 10px;
  }
  .image-title-container {
    position: absolute;
    bottom: 0;
    top: 100px;
    left: 0;
    width: 100%;
    color: #fff;
    padding: 10px;
    text-align: center;
  }
  .image-title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0px;
    transition: opacity 2s;
    opacity: 0;
    position: relative;
    right: 20px;
    top: 0px;
  }
  .image-container img.active + .image-title-container .image-title {
    opacity: 1;
  }
  /* middle-row */
  .middle-row {
    flex-direction: row;
    align-items: center;
    width: auto;
    height: auto;
    overflow: hidden;
    padding: 20px;
  }
  .middles-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    padding: 20px;
  }
  .lefts-column, .middles-column, .rights-column {
    grid-column: 1;
    margin-top: 0;
  }
  .lefts-column img, .rights-column img {
    max-width: 300px;
    max-height: 300px;
    object-fit: cover;
    border-radius: 10px;
    border: 2px solid #fff;
    padding: 10px;
    margin: 10px auto;
    position: relative;
    left: 30px;
  }
  .middles-paragraph {
    font-size: 24px;
    margin-bottom: 20px;
    position: relative;
    left: 20px;
  }
  .word {
    width: 80vw;
    margin-bottom: 20px;
  }
  .pdf-button {
    margin-bottom: 20px;
    position: relative;
    left: 30px;
  }
  .bottom-row {
    background-color: white;
    height: auto;
    flex-shrink: 0;
    padding: 20px;
  }
  .avail {
    font-size: 36px;
  }
  .category-title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  .col-md-6 {
    width: 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
  .card-container {
  position: relative;
  width: 300px;
  height: 400px;
  overflow: hidden;
  margin: 20px;
}

.card {
  width: 300px; 
  margin: 10px;
  position: relative;
  /* left: -400px;  */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(to bottom, #f7f7f7, #e7e7e7);
  background-size: 100% 200px;
  background-position: 0% 100%;
  transition: background-position 0.3s ease-out;
}

  .card:hover {
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
    transition: all 0.3s ease-out;
    background-position: 100% 100%;
  }

  .card-img-top {
    width: 100%; 
    height: 270px; 
    object-fit: cover;
    border-radius: 10px;
  }

  .card-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
  }

  .card-text {
    font-size: 16px;
    color: #666;
  }

  .card-container {
    position: relative;
    width: 300px;
    height: 400px;
    overflow: hidden;
    position: relative;
    left: 0px !important;
    margin: 20px;
  }

  .card-slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    padding: 0;
  }

  .card-slider .card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: translateX(100%);
    transition: opacity 2s, transform 2s;
  }

  .card-slider .card.active {
    opacity: 1;
    transform: translateX(0);
  }

  .card-slider .card:not(.active) {
    transform: translateX(-100%);
  }

  .btn1{
    background: rgb(149, 96, 70);
    color: white;
    padding: 8px;
    border-radius: 5px;
    border: none;
    margin-top: 30px;
    margin-bottom: 30px;
    width: 200px;
    margin-left: 240px;
  }

  .btn1:hover{
    background: white;
    color:rgb(148, 118, 103);
    transform: scale(1.05); 
  }

  .btn1:active {
    transform: scale(1.1); 
    color: rgb(148, 118, 103);
    background-color: white;
  }
}

@media only screen and (min-width: 901px) and (max-width: 1250px) {
  .top-row {
    grid-template-columns: 1fr 1fr;
    height: auto;
    padding-bottom: 20px;
    margin-bottom: 0;
  }
  
  .left-column {
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    padding: 20px;
    font-size: 14px;
  }
  .welcome-paragraph{
    font-size: 16px;
  }
  .welcome-heading{
    font-size: 24px;
    position: relative;
    top: 20px;
  }
  .right-column {
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  
  .image-container {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
  }
  
  .image-container img {
    position: absolute;
    top: 110px;
    left: 70px;
    max-width: 300px;
    max-height: 250px;
    object-fit: cover;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 2s, transform 2s;
    border-radius: 10px;
  }
  
  .image-title-container {
    position: absolute;
    bottom: 110px;
    left: 0px;
    width: 100%;
    color: #fff;
    padding: 10px;
    text-align: center;
  }
  
  .image-title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0px;
    transition: opacity 2s;
    opacity: 0;
    position: relative;
    right: 20px;
    top: 0px;
    bottom: 40px;
  }
  
  .image-container img.active + .image-title-container .image-title {
    opacity: 1;
  }
  .explore-button{
    margin-bottom: 80px !important;
  }
  
  /* middle-row */
  .middle-row {
    flex-direction: row;
    align-items: center;
    width: auto;
    height: auto;
    overflow: hidden;
    padding: 20px;
  }
  
  .middles-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    padding: 20px;
  }
  
  .lefts-column, .middles-column, .rights-column {
    grid-column: 1;
    margin-top: 0;
  }
  
  .lefts-column img, .rights-column img {
    max-width: 250px;
    max-height: 250px;
    object-fit: cover;
    border-radius: 10px;
    border: 2px solid #fff;
    padding: 10px;
    margin: 10px auto;
    position: relative;
    left: 30px;
  }
  
  .middles-paragraph {
    font-size: 26px;
    margin-bottom: 20px;
    position: relative;
    left: 20px;
  }
  
  .word {
    width: 80vw;
    margin-bottom: 20px;
  }
  
  .pdf-button {
    margin-bottom: 20px;
    position: relative;
    left: 30px;
  }
  /* bottom-row */

.bottom-row {
  background-color: white;
  height: auto;
  flex-shrink: 0;
}

.avail {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 60px;
  margin-top: 40px;
  text-align: center;
  color: #333; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); 
}

.category-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); 
  text-align: center;
}

.category-title::after {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  background-color: #333; 
  margin: 10px auto;
}

.card {
  width: 300px; 
  margin: 10px;
  position: relative;
  left: 50px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(to bottom, #f7f7f7, #e7e7e7);
  background-size: 100% 200px;
  background-position: 0% 100%;
  transition: background-position 0.3s ease-out;
}

.card:hover {
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
  transition: all 0.3s ease-out;
  background-position: 100% 100%;
}

.card-img-top {
  width: 100%; 
  height: 270px; 
  object-fit: cover;
  border-radius: 10px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.card-text {
  font-size: 16px;
  color: #666;
}

.card-container {
  position: relative;
  width: 300px;
  height: 400px;
  overflow: hidden;
  position: relative;
  left: 0px !important;
  margin: 20px;
}

.card-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 0;
}

.card-slider .card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 2s, transform 2s;
}

.card-slider .card.active {
  opacity: 1;
  transform: translateX(0);
}

.card-slider .card:not(.active) {
  transform: translateX(-100%);
}

.btn1{
  background: rgb(149, 96, 70);
  color: white;
  padding: 8px;
  border-radius: 5px;
  border: none;
  margin-top: 30px;
  margin-bottom: 30px;
}

.btn1:hover{
  background: white;
  color:rgb(148, 118, 103);
  transform: scale(1.05); 
}

.btn1:active {
  transform: scale(1.1); 
  color: rgb(148, 118, 103);
  background-color: white;
}
}

  @media only screen and (min-width: 1120px) and (max-width: 1250px) {
  .image-title-container {
    position: absolute;
    bottom: 30px;
    right: 20px;
    width: 100%;
    color: #fff;
    padding: 10px;
    text-align: center;
    transform: translateY(-20px);
  }
  .image-container img {
    position: absolute;
    top: 70px;
    left: 160px; 
    max-width: 300px;
    max-height: 250px;
    object-fit: cover;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 2s, transform 2s;
    border-radius: 10px;
  }
  .card-container {
  position: relative;
  width: 300px;
  height: 400px;
  overflow: hidden;
  position: relative;
  left: 190px !important;
  margin: 20px;
}
.card {
  width: 300px; 
  margin: 10px;
  position: relative;
  left: 150px !important;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(to bottom, #f7f7f7, #e7e7e7);
  background-size: 100% 200px;
  background-position: 0% 100%;
  transition: background-position 0.3s ease-out;
}

}
</style>