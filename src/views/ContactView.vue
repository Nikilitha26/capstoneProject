<template>
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h2 class="contact">Contact Us</h2>
          <div style="margin-bottom: 40px;"></div>
          <ul class="list-unstyled">
            <li>
  <i class="fas fa-phone animate__animated animate__headShake animate__infinite "></i>
  <span>+27 82 402 1820</span>
</li>
            <li>
                <i class="fab fa-instagram"></i>
              <span>mindwell_scent_official</span>
            </li>
            <li>
                <i class="fab fa-facebook"></i>
              <span>mindwell_scent_official</span>
            </li>
            <li>
                <i class="fas fa-map-marker-alt"></i>
              <span>Lansdowne, Cape Town, Western Cape, 7744</span>
            </li>
          </ul>
        </div>
        <div class="col-md-8">
          <h2 id="get">Get in Touch</h2>
          <form>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" placeholder="Enter your name..." style="width: 70%">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" placeholder="Enter your email..." style="width: 70%">
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea class="form-control" id="message" placeholder="Enter your message..." style="width: 70%"></textarea>
            </div>
            <button type="submit" class="btn0">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactForm"
  }
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
  }
  
  .container {
    width: 900px;
    margin: 40px auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: "Cormorant", serif;
    font-optical-sizing: auto;
    font-weight: 800;
    font-style: normal;
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .col-md-4 {
    width: 50%;
  }
  
  .col-md-8 {
    width: 50%;
  }
  
  /* Social Media Icons */
  .contact{
    position: relative;
    right: 100px;
  }
  ul {
    list-style: none;
    padding: 20px;
    margin: 0;
  }
  
  li {
    margin-bottom: 50px;
    display: flex;
    align-items: center;
  }
  
  i {
    font-size: 24px;
    color: rgb(148, 118, 103);
    margin-right: 10px;
  }
  
  span {
    color: #333;
  }
  
  /* Form Styles */
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: rgb(148, 118, 103); /* close to rgb(148, 118, 103) */
  }
  
  input, textarea {
    padding: 10px;
    border: none;
    border-bottom: 1px solid rgb(148, 118, 103);
    background-color: transparent;
    position: relative;
    left: 100px;
    font-style: italic;
    font-weight: 600;
  }
  
  input:focus, textarea:focus {
    border-color: rgb(148, 118, 103); /* close to rgb(148, 118, 103) */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  button[type="submit"] {
    background-color: rgb(148, 118, 103); /* close to rgb(148, 118, 103) */
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    left: 40px;
  }
  
  button[type="submit"]:hover {
    background-color: #fff;
    color: #786953; /* darker version of the color */
  }

  /* @media (max-width: 600px) {
    .row {
      flex-direction: column;
    }
    .col-md-4, .col-md-8 {
      width: 70%;
    }
    .container{
        width: auto;
    }
  } */

  @media (max-width: 600px) {
    .row {
      flex-direction: column;
    }
    .col-md-4, .col-md-8 {
      width: 100%;
    }
    .container{
        width: 80%;
        font-size: 14px;
         
  padding: 20px 30px; 
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
    }
    .contact{
        position: relative;
        left: 10px;
    } 
    ul{
        position: relative;
        left: 5px;
    }
    label{
        position: relative;
        left: 20px;
    }
    .col-md-8{
        position: relative;
        right: 30px;
    }
    .col-md-4{
        position: relative;
        right: 20px;
    }
    #get{
        position: relative;
        left: 30px;
    }
    .form-control{
        position: relative;
        left: 60px;
        margin-top: 20px;
    }
    .btn0{
        position: relative;
        right: 30px;
    }
  }

  @media (min-width: 601px) and (max-width: 767px) {
  .row {
    flex-direction: row;
  }
  .col-md-4, .col-md-8 {
    width: 80%;
  }
  .container {
    width: 80%;
    padding: 20px 30px;
  }

  .col-md-4{
    position: relative;
    left: 90px;
  }

  .contact {
    font-size: 28px;
    margin-bottom: 15px;
    position: relative;
    right: 100px;
  }
  ul {
    padding: 15px;
  }
  li {
    margin-bottom: 25px;
  }
  label {
    font-size: 14px;
  }
  input, textarea {
    font-size: 18px;
    font-weight: bold;
    position: relative;
    left: 70px;
  }
  button[type="submit"] {
    font-size: 12px;
    padding: 6px 12px;
  }
}
  

  /* @media (max-width: 400px) {
  .row {
    flex-direction: column;
  }
  .col-md-4, .col-md-8 {
    width: 90%;
  }
  .container {
    width: 90%;
    padding: 15px 20px;
  }
  .contact {
    font-size: 18px;
    margin-bottom: 20px;
  }
  ul {
    padding: 10px;
  }
  li {
    margin-bottom: 30px;
  }
  label {
    font-size: 16px;
  }
  input, textarea {
    font-size: 14px;
  }
  button[type="submit"] {
    font-size: 14px;
    padding: 8px 15px;
  }
} */
  </style>