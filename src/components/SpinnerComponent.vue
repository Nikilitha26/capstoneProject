// Spinner.vue
<template>
  <div class="spinner">
    <div class="spinner-inner">
      <div class="spinner-circle"></div>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.spinner-inner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-top: 2px solid #333;
  animation: spin 1s linear infinite;
}

.spinner-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #333;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>