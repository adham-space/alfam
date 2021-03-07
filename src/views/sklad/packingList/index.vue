<template>
  <el-tabs type="card" @tab-click="handleClick">
    <el-tab-pane label="New list">
      <newList />
    </el-tab-pane>
    <el-tab-pane label="Current products">
      <arxiv />
    </el-tab-pane>
    <el-tab-pane label="Arxiv">
      <arxiv />
    </el-tab-pane>
    <!-- <el-tab-pane label="Task">
      <arxiv />
    </el-tab-pane> -->
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
