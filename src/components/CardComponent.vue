<template>
    <div class="card">
      <slot name="home-card"></slot>
      <slot name="products-card"></slot>
    </div>
  </template>
  
  <style scoped>
  .card {
    margin: 20px;
    padding: 20px;
    border: none;
    background: none;
    background-color: transparent;
  }
  </style>