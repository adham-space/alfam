<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400&display=swap');

  #app {
    font-family: 'Nunito', sans-serif;
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(206, 206, 206);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(170, 170, 170);
  }
</style>
