<template scoped>
  <div class="row">
    <div class="col-75">
      <div class="container">
        <form action="/action_page.php">
          <div class="row">
            <div class="col-50">
              <h3>Billing Address</h3>
              <label for="fname"><i class="fa fa-user"></i> Full Name</label>
              <input type="text" id="fname" name="firstname" placeholder="John M. Doe..." v-model="fullName" required>
              <small v-if="!fullName && formSubmitted" class="text-danger">Please enter your full name</small>
              <label for="email"><i class="fa fa-envelope"></i> Email</label>
              <input type="text" id="email" name="email" placeholder="john@example.com..." v-model="email" required>
              <small v-if="!email && formSubmitted" class="text-danger">Please enter your email</small>
              <label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
              <input type="text" id="adr" name="address" placeholder="542 W. 15th Street..." v-model="address" required>
              <small v-if="!address && formSubmitted" class="text-danger">Please enter your address</small>
              <label for="city"><i class="fa fa-institution"></i> City</label>
              <input type="text" id="city" name="city" placeholder="Cape Town..." v-model="city" required>
              <small v-if="!city && formSubmitted" class="text-danger">Please enter your city</small>

              <div class="row">
                <div class="col-50">
                  <label for="province">Province</label>
                  <input type="text" id="province" name="province" placeholder="Western Cape..." v-model="province" required>
                  <small v-if="!province && formSubmitted" class="text-danger">Please enter your province</small>
                </div>
                <div class="col-50">
                  <label for="zip">Postal code</label>
                  <input type="text" id="postal-code" name="postal code" placeholder="10001..." v-model="zip" required>
                  <small v-if="!zip && formSubmitted" class="text-danger">Please enter your postal code...</small>
                </div>
              </div>
            </div>

            <div class="col-50">
              <h3>Payment</h3>
              <label for="fname">Accepted Cards</label>
              <div class="icon-container">
                <i class="fa fa-cc-visa" style="color:navy;"></i>
                <i class="fa fa-cc-amex" style="color:blue;"></i>
                <i class="fa fa-cc-mastercard" style="color:red;"></i>
                <i class="fa fa-cc-discover" style="color:orange;"></i>
              </div>
              <label for="cname">Name on Card</label>
              <input type="text" id="cname" name="cardname" placeholder="John More Doe..." v-model="cardName" required>
              <small v-if="!cardName && formSubmitted" class="text-danger">Please enter the name on your card</small>
              <label for="ccnum">Credit card number</label>
              <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444..." v-model="cardNumber" required>
              <small v-if="!cardNumber && formSubmitted" class="text-danger">Please enter your credit card number</small>
              <label for="expmonth">Exp Month</label>
              <input type="text" id="expmonth" name="expmonth" placeholder="September..." v-model="expMonth" required>
              <small v-if="!expMonth && formSubmitted" class="text-danger">Please enter the expiration month</small>

              <div class="row">
                <div class="col-50">
                  <label for="expyear">Exp Year</label>
                  <input type="text" id="expyear" name="expyear" placeholder="2018..." v-model="expYear" required>
                  <small v-if="!expYear && formSubmitted" class="text-danger">Please enter the expiration year</small>
                </div>
                <div class="col-50">
                  <label for="cvv">CVV</label>
                  <input type="text" id="cvv" name="cvv" placeholder="352..." v-model="cvv" required>
                  <small v-if="!cvv && formSubmitted" class="text-danger">Please enter your CVV</small>
                </div>
              </div>
            </div>

        </div>
        <label>
    <input type="checkbox" name="sameadr" v-model="sameadr"> Shipping address same as billing
  </label>
        <input type="submit" value="Continue to checkout" class="btn" @click.prevent="proceedToPayment">
      </form>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      product: null,
      fullName: '',
      email: '',
      address: '',
      city: '',
      province: '',
      zip: '',
      cardName: '',
      cardNumber: '',
      expMonth: '',
      expYear: '',
      cvv: '',
      sameadr: false,
      formSubmitted: false,
    }
  },
  mounted() {
    this.product = this.$route.params.product;
  },
  methods: {
    proceedToPayment() {
    this.formSubmitted = true;
    if (!this.fullName || !this.email || !this.address || !this.city || !this.province || !this.zip || !this.cardName || !this.cardNumber || !this.expMonth || !this.expYear || !this.cvv) {
      // Remove the alert and instead, do nothing or add a custom error message
    } else if (!this.sameadr) {
      alert('Please check the checkbox to confirm shipping address is the same as billing');
    } else {
      this.$router.push({ name: 'thankyou', params: { prodID: this.prodID } })
    }

    }
  }
}
</script>
<style scoped>
.row {
  display: -ms-flexbox; 
  display: flex;
  -ms-flex-wrap: wrap; 
  flex-wrap: wrap;
  margin: 0 -16px;
}

.col-25 {
  -ms-flex: 25%; 
  flex: 25%;
}

.col-50 {
  -ms-flex: 50%; 
  flex: 50%;
}

.col-75 {
  -ms-flex: 75%; 
  flex: 75%;
}

.col-25,
.col-50,
.col-75 {
  padding: 0 16px;
}

.container {
  background-color: #f2f2f2;
  padding: 5px 20px 15px 20px;
  border: 1px solid rgb(148, 118, 103);
  border-radius: 3px;
  margin-top: 40px;
  margin-bottom: 40px;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 1100;
  font-style: bolder;
  font-size: bolder;
}

label {
  margin-bottom: 10px;
  display: block;
  font-weight: bold; 
  color: #333; 
}

input[type=text] {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid rgb(148, 118, 103);
  border-radius: 3px;
  font-style: italic;
}

label {
  margin-bottom: 10px;
  display: block;
}

.icon-container {
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
}

.btn {
  background-color: rgb(148, 118, 103);
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 200px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
}

.btn:hover {
  background-color: white;
  color: rgb(148, 118, 103);
}

span.price {
  float: right;
  color: black;
}


@media (max-width: 800px) {
  .row {
    flex-direction: column-reverse;
  }
  .col-25 {
    margin-bottom: 20px;
  }
}
    
</style>