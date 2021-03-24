<template>
  <el-tabs class="pack-tabs" type="card" @tab-click="handleClick">
    <el-tab-pane class="tab-cnt" label="New list">
      <newList />
    </el-tab-pane>
    <el-tab-pane class="tab-cnt" label="Current products">
      <arxiv />
    </el-tab-pane>
    <el-tab-pane class="tab-cnt" label="Arxiv">
      <arxiv />
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import arxiv from './components/arxiv'
import newList from './components/newList'
export default {
  components: {
    arxiv,
    newList
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style>
  .pack-tabs {
    /* border: 1px solid red; */
    height: calc(100vh - 84px);
    margin: 0 !important;
  }

  .tab-cnt {
    margin: 0 !important;
    height: calc(100vh - 127px);
    /* border: 1px dashed orange; */
  }
</style>
