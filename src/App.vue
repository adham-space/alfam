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
</style>
