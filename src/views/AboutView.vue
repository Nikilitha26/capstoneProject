<template scoped>
  <div class="about">
    <div class="div" style="background-color: white; padding: 10px; display: flex;">
      <div style="width: 50%; margin-right: 20px;">
        <img id="foto" src="https://nikilitha26.github.io/capstoneImages/landing.jpg" alt="About Us Image" style="width: 100%; height: 480px;">
      </div>
      <div style="width: 50%; color: black; text-align: center;"> 
        <h2 >ABOUT US</h2>
        <p id="parra">MindWell was established in 2024 with the goal of providing easy access to high-quality 
          mental health care across South Africa. Recognizing the barriers to traditional in-person 
          therapy, such as time constraints, location, and cost, MindWell was founded on the belief 
          that everyone should have access to the support they need, regardless of where they live. 
          Today, MindWell has grown to become a leading provider of online mental health services,
           with a team of experienced psychologists and counselors serving clients in Cape Town, 
           Durban, Johannesburg, and Pretoria.
          With a growing network of mental health professionals, MindWell is committed to meeting 
          the diverse needs of our clients, offering services in a variety of therapeutic modalities, 
          including CBT, DBT, mindfulness-based therapies, and psychodynamic therapy. Our team of 
          compassionate and skilled clinicians is dedicated to helping our clients achieve their
           personal goals and find greater emotional well-being. Whether you are struggling with
            anxiety, depression, relationship issues, or other challenges, we invite you to discover
             the peace of mind and support that awaits you at MindWell.
        </p>
      </div>
    </div>
    <div id="back" style="background-color: rgb(181, 139, 102); color: white; padding: 200px; text-align: center;"> 
      <h2 class="title">OUR TEAM</h2>

<div class="our-team" >
  <div class="team-member">
    <img id="piccc" src="https://nikilitha26.github.io/Boot-img/Image/IMG_8063.PNG" alt="Team Member 1">
    <div class="team-info">
      <h3 class="h3">Nikilitha Kakaza</h3>
      <p class="founder">Founder & CEO</p>
      <p class="par">Nikilitha Kakaza, the Founder and CEO of MindWell, is a passionate mental health advocate with a 
        personal connection to the issue. After witnessing the struggles of her own family members to access mental health 
        care in South Africa, Nikilitha was inspired to create a platform that would break down the barriers to traditional
         therapy. With a background in psychology and a deep commitment to making mental health care more accessible, she
          founded MindWell with the goal of connecting individuals and families to high-quality, affordable, and convenient 
          online mental health services.</p>
    </div>
  </div>
  <div class="team-member">
    <img id="piccc" src="https://nikilitha26.github.io/capstoneImages/a9da3df52d836a48a091afb99134cfd6.jpg" alt="Team Member 2">
    <div class="team-info">
      <h3 class="chris">Chris Oasis</h3>
      <p class="founder">Founder & CMO</p>
      <p class="par">Christopher Oasis is the Chief Marketing Officer and Co-Founder of MindWell. With a background in marketing 
        and a personal experience with depression, Christopher has a deep understanding of the importance of mental health care
         and the challenges that can come with seeking help. Committed to helping people find the support they need, Christopher
          co-founded MindWell with Nikilitha Kakaza to create a more accessible and convenient platform for mental health services.
           As the CMO, he is dedicated to spreading awareness about mental health and promoting the services of MindWell to the wider community.</p>
    </div>
  </div>
</div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>
<style scoped>
  .about img {
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
  }

  .about h2 {
    font-size: 40px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
    font-family: 'Playfair Display', serif; 
  }

  .about p {
    font-size: 18px;
    color: #666;
    text-align: justify;
    margin-bottom: 30px;
    font-family: 'Lato', sans-serif; 
    line-height: 1.5;
    font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  }


#back{
  height: 140vh;
}
.founder{
  margin-right: 90px;
}
.our-team {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
}
.tea{
  position: inherit;
  bottom: 150px;
}


.team-member {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
  background-color: rgb(148, 118, 103);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  bottom: 150px;
}

.team-member img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.team-info {
  flex: 1;
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
}

.team-info p {
  font-family: 'Merriweather', serif;
  font-size: 18px;
  color: white;
  padding: 10px;
  border-radius: 10px;
}

.team-info h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-top: 0;
  position: relative;
  right: 50px;
}

.h3 {
  margin-top: 0;
}
.title{
  position: relative;
  bottom: 140px;
}

@media only screen and (max-width: 600px) {
  .about{
    margin: 0 !important;
    height: auto;
  }
  .about > div:first-child {
    display: flex;
    flex-direction: column;
    
  }
  .about > div:first-child > div:first-child {
    order: 2;
  }
  .about > div:first-child > div:last-child {
    order: 1;
  }
  .about h2 {
    font-size: 24px;
    position: relative;
    left: 70px;
    margin-top: 20px;
  }
  .about p {
    font-size: 16px;
    width: 100%; 
    line-height: 1.2;
    padding: 10px ;
    text-align: justify;
  }
  #back{
     width: auto;
     padding: 0px !important;
     height: auto;
  }
  .div{
    padding: 0px !important;
  }
  .our-team{
    position: relative;
    top: 160px;
    text-align: left;
  }
  #foto{
    height: 150px !important;
    position: relative;
    left: 80px;
    margin-bottom: 20px;
  }
  .team-member {
    flex-direction: column;
    margin-bottom: 20px;
    padding: 0px;
  }
  .team-member img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-left: 50px;
    position: relative;
  }
  .team-info {
    margin-top: 20px;
  }
  .title{
    position: relative;
    top: 30px;
    margin: 0px !important;
    margin-right: 140px !important;
    padding: 0px !important;
  }
  h3 {
    margin-left: 0px;
    padding: 0px !important;
    position: relative;
    bottom: 0px;
    left: 0px;
}
  .founder {
    margin-left: 90px;
    padding: 0;
    margin-top: 30px;
  }

#parra{
  /* position: relative;
  right: 50px; */
  width: 100vw;
  padding: 10px;
  margin: 0;
}
.par{
  position: relative;
  left: 0px !important;
}
#piccc{
  margin-right: 50px;
}
.chris{
  position: relative;
  margin-left: 0px;
}

}

@media only screen and (min-width: 601px) and (max-width: 1250px) {
  .about img {
    width: 100% !important; 
    height: 400px !important;
    margin-top: 50px !important;
  }
  .about h2 {
    font-size: 30px;
  }
  .about p {
    font-size: 14px !important; 
  }
  /*  */
  #back{
    height: auto !important;

  }
  .our-team {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    position: relative;
    right: 100px !important;
  }
  .team-member {
    flex-direction: column;
    align-items: center;
  }
  .team-member img {
    width: 100px !important;
    height: 100px !important;
    border-radius: 50%;
    margin: 0 auto;
  }
  .team-info {
    padding: 20px;
    text-align: center;
  }
  .team-info h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  .team-info p {
    font-size: 16px;
    margin-bottom: 20px;
    width: 50vw;
  }
  .founder {
    margin: 20px auto;
  }
}
</style>