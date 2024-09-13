<template>
  <div class="container py-5">
    <h2 class="mb-4">Settings</h2>

    <p class="text-muted">
      Deleting your account is a permanent action that cannot be reversed. If you delete your account, all of your data, including your purchases, orders, and personal information, will be permanently removed from our system. We recommend you carefully consider whether you want to delete your account before proceeding. If you have any questions or concerns about this process, please don't hesitate to contact our support team at supportmindwell@gmail.com.
    </p>

    <button @click="openDeleteModal" class="btn btn-danger btn-lg">
      <i class="fas fa-trash-alt"></i> Delete Account
    </button>

    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" ref="deleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Delete Account</h5>
            <button type="button" class="btn-close" @click="closeDeleteModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete your account? This action is permanent and cannot be reversed.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeDeleteModal">Cancel</button>
            <button type="button" class="btn btn-danger btn-lg" @click="deleteAccount">
              <i class="fas fa-trash-alt"></i> Delete
            </button>
          </div>
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
      deleteModal: null,
    };
  },
  methods: {
    openDeleteModal() {
      this.deleteModal.show();
    },
    closeDeleteModal() {
      this.deleteModal.hide();
    },
    deleteAccount() {
      if (!this.$store.state.userId) {
        console.error('User ID is not set');
        return;
      }
      this.$store.dispatch('deleteUser', this.$store.state.userId)
        .then(() => {
          // Handle success response
          console.log('Account deleted successfully!');
          // You can also redirect the user to the login page or any other page
          this.$router.push('/login');
        })
        .catch((error) => {
          // Handle error response
          console.error('Error deleting account:', error);
        });
    },
  },
  mounted() {
    this.deleteModal = new Modal(this.$refs.deleteModal);
  },
};
</script>

<style scoped>
  /* @import 'bootstrap/dist/css/bootstrap.css' */

  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: "Cormorant", serif;
    font-optical-sizing: auto;
    font-weight: 900;
    font-style: bolder;
    font-size: 20px;
    background-color: #d1ab8d;
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
  }

  h2 {
    font-weight: bold;
    color: rgb(96, 67, 53);
  }

  .text-muted {
    color: #666;
  }

  .btn-danger {
    background-color: rgb(173, 126, 108); 
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }

  .btn-danger:hover {
    background-color: white;
    color: rgb(173, 126, 108);
  }

  .modal-content {
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background-color: #fff; /* added background color */
  }

  .modal-header {
    background-color: rgb(148, 118, 103); 
    color: #fff;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  .modal-title {
    font-weight: bold;
    font-size: 18px;
  }

  .modal-body {
    padding: 20px;
  }

  .modal-footer {
    padding: 10px;
    border-top: 1px solid #ddd;
  }

  .btn-secondary {
    background-color: rgb(173, 126, 108); 
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    border: none;
  }

  .btn-secondary:hover {
    background-color: white;
    border-color: rgb(173, 126, 108);
  }
  @media (max-width: 597px) and (min-width: 300px) {
    .container {
      max-width: 90%;
      padding: 15px; 
    }
  }
</style>
