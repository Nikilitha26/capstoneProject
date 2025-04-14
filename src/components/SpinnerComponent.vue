<template>
  <div class="spinner-overlay">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'SpinnerComponent'
}
</script>

<style scoped>
.spinner-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  padding-top: 100px;
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid rgb(148, 118, 103);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

p {
  margin-top: 10px;
  font-family: "Cormorant", serif;
  color: rgb(148, 118, 103);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
