<template>
  <div class="loader">
    <div class="loader-inner">
      <div class="loader-bar"></div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.loader-inner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid rgb(148, 118, 103);
  border-top: 2px solid rgb(148, 118, 103);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.loader-bar {
  width: 0%;
  height: 100%;
  background-color: rgb(148, 118, 103);
  position: absolute;
  top: 0;
  left: 0;
  animation: load 5s linear infinite;
}

@keyframes load {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>