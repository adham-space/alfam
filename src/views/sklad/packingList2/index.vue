<template>
  <newList />
</template>
<script>
import newList from './components/newList'
export default {
  components: {
    newList
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
<style>
  .pack-tabs {
    height: calc(100vh - 84px);
    margin: 0 !important;
  }
  .tab-cnt {
    margin: 0 !important;
    height: calc(100vh - 127px);
  }
</style>
