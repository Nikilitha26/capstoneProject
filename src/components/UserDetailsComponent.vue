<template>
  <div v-if="userLoaded">
    <div v-if="user && user.length > 0">
      <div class="backie" >
        <div class="user-details-container">
  <h2 class="my">My Details</h2><br>
  <p class="text-detail">First Name: {{ user[0].firstName }}</p>
  <p class="text-detail">Last Name: {{ user[0].lastName }}</p>
  <p class="text-detail">Age: {{ user[0].userAge }}</p>
  <p class="text-detail">Gender: {{ user[0].Gender }}</p>
  <p class="text-detail">Email: {{ user[0].emailAdd }}</p>
  <p class="text-detail">Role: {{ user[0].userRole }}</p>
  <button @click="showModal" class="btn11">Edit User</button>
</div>
    </div>
  </div>
    <div v-else>
      <p>User not found</p>
    </div>
  </div>
  <div v-else>
    <p>Loading user details...</p>
  </div>

  <!-- Edit User Modal -->
  <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editUserModalLabel">Edit User Details</h5>
          <button type="button" class="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="firstName" class="form-label">First Name:</label>
              <input type="text" class="form-control" id="firstName" v-model="editUser.firstName">
              <small v-if="!editUser.firstName && proceedToUpdateTriggered" class="text-danger">Please enter your first name</small>
            </div>
            <div class="mb-3">
              <label for="lastName" class="form-label">Last Name:</label>
              <input type="text" class="form-control" id="lastName" v-model="editUser.lastName">
              <small v-if="!editUser.lastName && proceedToUpdateTriggered" class="text-danger">Please enter your last name</small>
            </div>
            <div class="mb-3">
              <label for="userAge" class="form-label">Age:</label>
              <input type="number" class="form-control" id="userAge" v-model="editUser.userAge">
              <small v-if="!editUser.userAge && proceedToUpdateTriggered" class="text-danger">Please enter your age</small>
            </div>
            <div class="mb-3">
              <label for="Gender" class="form-label">Gender:</label>
              <select class="form-select" id="Gender" v-model="editUser.Gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <small v-if="!editUser.Gender && proceedToUpdateTriggered" class="text-danger">Please select your gender</small>
            </div>
            <div class="mb-3">
              <label for="emailAdd" class="form-label">Email:</label>
              <input type="email" class="form-control" id="emailAdd" v-model="editUser.emailAdd">
              <small v-if="!editUser.emailAdd && proceedToUpdateTriggered" class="text-danger">Please enter your email</small>
            </div>
            <div class="mb-3">
              <label for="userRole" class="form-label">Role:</label>
              <select class="form-select" id="userRole" v-model="editUser.userRole">
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              <small v-if="!editUser.userRole && proceedToUpdateTriggered" class="text-danger">Please select your role</small>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn12" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn12" @click="saveChanges">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      userLoaded: false,
      editUser: {
        firstName: '',
        lastName: '',
        userAge: '',
        Gender: '',
        emailAdd: '',
        userRole: '',
      },
      modal: null,
      proceedToUpdateTriggered: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getUserDetails() {
      try {
        const userId = this.$cookies.get('userId');
        console.log('Fetching user data for ID:', userId);
        await this.$store.dispatch('getUserById', userId);
        console.log('User data received:', this.user);
        this.userLoaded = true;
      } catch (error) {
        console.error('Error getting user details:', error);
        this.userLoaded = false;
      }
    },
    showModal() {
      this.editUser = { ...this.user[0] };
      this.modal.show();
    },
    saveChanges() {
      this.proceedToUpdateTriggered = true;
      if (!this.editUser.firstName || !this.editUser.lastName || !this.editUser.userAge || !this.editUser.Gender || !this.editUser.emailAdd || !this.editUser.userRole) {
        return;
      }
      this.$store.dispatch('updateUser', {
        userId: this.$cookies.get('userId'),
        updatedUser: this.editUser,
      });
      this.modal.hide();
    }
  },
  mounted() {
    const userId = this.$cookies.get('userId');
    if (userId) {
      this.getUserDetails();
    } else {
      console.log('User ID not found');
      this.$router.push({ name: 'login' });
    }
    this.modal = new Modal(document.getElementById('editUserModal'));
  },
};
</script>
<style>
/* body{
  background-color: rgb(208, 191, 183);
} */
.my{
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: bolder;
  color: #fff;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.2); 
  border-bottom: 1px solid rgba(255, 255, 255, 0.5); 
  padding-bottom: 10px;
  margin-bottom: 20px;
  background-color: white;
  background-image: linear-gradient(to bottom, white, white);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.text-detail {
  background-color: rgb(148, 118, 103);
  padding: 5px;
  border-radius: 5px;
  color: #fff;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.2); 
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.user-details-container {
  background-color: rgb(148, 118, 103);
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  width: 600px;
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
  left: 450px;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: bolder;
}

.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 1.5rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col-md-4 {
  flex: 0 0 33.33%;
  max-width: 33.33%;
}

.col-md-8 {
  flex: 0 0 66.67%;
  max-width: 66.67%;
}

.img-thumbnail {
  padding: 0.25rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  max-width: 100%;
  height: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.btn11 {
  color: #fff;
  background-color: white;
  color: rgb(148, 118, 103);
  padding: 0.5rem 1rem;
  /* font-size: 1.25rem; */
  /* line-height: 1.5; */
  border: none;
  border-radius: 0.3rem;
  margin-bottom: 20px;
  font: bolder;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: bolder;
}
.btn11:hover{
  background-color: rgb(148, 118, 103);
  color: white;
}

.btn-primary:hover {
  background-color: rgb(133, 98, 92);
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.modal-content {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  /* background-color: rgb(148, 118, 103); */
  color: #fff;
  border-radius: 0.3rem 0.3rem 0 0;
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.5rem;
}
.modal-content {
  background-color: rgb(148, 114, 99); 
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
.modal-header .btn-close {
  color: #fff !important;
}

.modal-body {
  padding: 1rem;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: bolder;
  color: white;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  font: bolder; /* Add this line to make the text bold */
  color: black;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: rgb(148, 118, 103);
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(148, 118, 103, 0.5);
}

.form-select {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: black;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-weight: bolder; /* Add this line to make the text bold */
}

.form-select:focus {
  color: #495057;
  background-color: #fff;
  border-color: rgb(148, 118, 103);
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(148, 118, 103, 0.5);
}

.text-danger {
  color: #dc3545;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #ddd;
}

.btn12{
  color: rgb(133, 98, 92);
  background-color: white;
  padding: 9px;
  border-radius: 5px;
  border: none;
  font-family: "Cormorant", serif;
  font-optical-sizing: auto;
  font-weight: 900;
  font-style: bolder;
}
.btn12:hover{
  background-color: rgb(148, 118, 103);
  color: white;
}

@media only screen and (max-width: 1250px) {
  .user-details-container {
    overflow-y: auto;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    left: 0;
    box-sizing: border-box; 
  }
  .my {
    font-size: 1.2rem;
    padding-bottom: 10px;
  }

  .text-detail {
    font-size: 1rem;
    padding: 3px;
  }
  .modal-content {
    padding: 10px;
  }

  .modal-header {
    padding: 0.5rem;
  }

  .modal-body {
    padding: 0.5rem;
  }

  .form-control {
    font-size: 0.9rem;
  }

  .form-select {
    font-size: 0.9rem;
  }
  .btn11 {
    padding: 0.3rem 0.5rem;
    font-size: 0.9rem;
  }

  .btn12 {
    padding: 0.3rem 0.5rem;
    font-size: 0.9rem;
  }
}
</style>