<template>
    <div class="loader"></div>
</template>

<style>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.loader {
  border: 12px solid #f3f3f3;
  border-top: 12px solid rgb(59 130 246);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media screen and (max-width: 768px) {
  .loader {
    width: 60px;
    height: 60px;
  }
}
</style>
