<template>
  <div class="h-screen w-100 bg-gray-100 flex flex-col justify-center items-center">
    <div
      class="max-w-md w-1/2 h-1/2 bg-white flex flex-col justify-center items-center shadow-lg rounded-lg"
    >
      <div class="loader"></div>
    </div>
  </div>
</template>

<style>
.loader {
  border: 12px solid #f3f3f3;
  border-top: 12px solid rgb(59 130 246);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 768px) {
  .loader {
    width: 60px;
    height: 60px;
  }
}
</style>
