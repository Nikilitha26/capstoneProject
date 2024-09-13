<template>
    <div>
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <h5 id="follow">Follow us:</h5>
              <div class="follow-container">
              <div class="social-media">
                <img id="mg1" src="https://nikilitha26.github.io/capstoneImages/instagram-removebg-preview.png" alt="icon" class="img-fluid border-5 rounded-circle custom-image">
                <p id="maj">mindwell_scent_official</p>
              </div>
              <div class="social-media">
                <img id="mg2" src="https://nikilitha26.github.io/capstoneImages/facebook-removebg-preview.png" alt="icon" class="img-fluid border-5 rounded-circle custom-image2">
                <p id="maj1">mindwell_scent_official</p>
              </div>
            </div>
            </div>

            <div class="col-md-4">
              <h5 id="shop">Shop:</h5>
              <ul>
                <div class="shop">
  <li id="about"><router-link to="/about">About</router-link></li>
  <li id="product"><router-link to="/products">Products</router-link></li>
  <li id="admin"><router-link to="/admin">Admin</router-link></li>
  <li id="contact"><router-link to="/contact">Contact</router-link></li>
</div>
</ul>
            </div>
            <div class="col-md-4">
            <h5 id="acc">Accepted card payments:</h5>
            <div class="accepted-cards">
              <img id="visa" src="https://nikilitha26.github.io/nodejsImages/imgbin-visa-credit-card-debit-card-visa-CVupnbKnhhXkYdQ3EY1sZ3ErQ-removebg-preview.png" alt="visa" class="img-fluid">
              <img id="mastercard" src="https://nikilitha26.github.io/nodejsImages/png-transparent-card-master-master-card-master-card-new-logo-method-new-logo-payment-logos-icon-thumbnail-removebg-preview.png" alt="mastercard" class="img-fluid">
              <img id="applepay" src="https://nikilitha26.github.io/nodejsImages/png-transparent-apple-pay-mobile-payment-apple-wallet-apple-text-service-rectangle-removebg-preview.png" alt="applepay" class="img-fluid">
              <img id="maestro" src="https://nikilitha26.github.io/nodejsImages/png-transparent-maestro-payment-method-icon-removebg-preview.png" alt="maestro" class="img-fluid">
            </div>
          </div>
        </div>
          
          <p class="foot" > Copyright &copy; MindWell  {{ currentYear }} Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    }
  }
  </script>
  <style >
 .footer {
  background-color: rgb(148, 118, 103);
  color: #fff;
  padding: 30px;
  display: flex;
  justify-content: space-between;
}

.row {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.col-md-4 {
  flex: 1;
  margin: 0 10px;
  min-width: 200px;
  flex: 1 1 200px !important;
}

.follow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-media {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.social-media img {
  width: 40px;
  height: 30px;
  margin-right: 10px;
}

#maj, #maj1 {
  margin-left: 10px;
  position: relative;
  top: 8px;
}

.accepted-cards {
  display: flex;
  justify-content: space-between;
}

.accepted-cards img {
  width: 40px;
  height: 40px;
  margin: 0 10px;
}

.foot {
  margin-top: 30px;
  text-align: center;
}
  a {
        text-decoration: none !important;
        list-style: none !important
        ;
        color: #fff !important; 
    }

    a:hover {
      color: rgb(148, 118, 103) !important;
      background-color: #ffffff !important; 
    }
    ul {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #fff;
}



.accepted-cards{
    position: relative;
    top: 40px;
}

.shop{
    position: relative;
    top: 20px;
    right: 10px;
}

.shop li {
    margin-bottom: 10px; 
  }

#mg2{
    width: 50px;
    height: 50px;
}

#mg1{
  width: 40px;
  height: 40px;
}

.follow-container{
    position: relative;
    top: 20px;
}

@media (max-width: 300px) {
  .footer {
  background-color: rgb(148, 118, 103);
  color: #fff;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  width: 300px;
}
.follow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

#follow{
  color: white;
}

.social-media {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.social-media img {
  width: 40px;
  height: 30px;
  margin-bottom: 10px;
}

#maj, #maj1 {
  margin-left: 0;
  position: relative;
  top: 0;
  color: #fff !important;
}
a:hover {
      color: rgb(148, 118, 103);
      background-color: #ffffff; 
    }
    .social-media img {
      left: 0;
    }

    .accepted-cards {
      grid-template-columns: repeat(2, 1fr);
      grid-row-gap: 5px;
      display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
    }
    .accepted-cards img {
      margin-bottom: 40px;
      width: 30px;
      height: 30px;
    }
    #acc{
      position: relative;
      left: -10px;
      color: white;
      top: 20px;
    }
    #shop{
      margin-left: -10px;
      color: white;
    }

   ul {
    position: relative ;
    left: -10px;
  }

 #about{
 margin-right: 10px;
 }
 /* #about{
  position: relative;
  left: 30px;
 } */
 .foot{
  position: relative;
  left: 0px;
 }
 .footer {
      background-color: rgb(148, 118, 103);
      color: #fff;
      padding: 30px;
      width: 300px;
  }
  }
  </style>