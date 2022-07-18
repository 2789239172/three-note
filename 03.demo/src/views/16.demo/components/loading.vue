<template>
   <div class="loading-wrapper">
     <p class="text">资源加载中......</p>
     <div class="loading-bar">
       <div class="loading-bar-inner"></div>
     </div>
   </div>
</template>

<script>
export default {
   name: '',
   components: {},
   data() {
       return {};
   },
   methods: {},
}
</script>

<style scoped>
@keyframes text {
  0% {
    max-width: 91px;
  }
  100% {
    max-width: 130px;
  }
}
.loading-wrapper {
  width: 400px;
  height: 80px;
  background: white;
  padding: 10px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  font-size: 18px; 
}
.text {
  overflow: hidden;
  min-width: 91px;
  max-width: 91px;
  white-space: nowrap;
  animation: text 2.5s linear 0s infinite;
}
.loading-bar{
  width: 100%;
  height: 20px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.4) inset;
  margin-top: 15px;
}
</style>
