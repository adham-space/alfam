<template>
  <div>
    <el-select
      v-model="currentProduct"
      style="width: 11rem"
      placeholder="Choose a product"
    >
      <el-option
        v-for="(pr, i) in products"
        :key="i"
        :label="pr.label"
        :value="pr.value"
      />
    </el-select>
    <el-select
      v-model="currentProduct"
      style="width: 11rem; margin-left: .5em"
      placeholder="Choose a consumer"
    >
      <el-option
        v-for="(pr, i) in products"
        :key="i"
        :label="pr.label"
        :value="pr.value"
      />
    </el-select>
    <el-button
      style="margin-left: 0.5em; color: white; background-color: green"
      icon="el-icon-check"
    >Save</el-button>
  </div>
</template>
<script>
export default {
  data: () => ({
    currentProduct: '',
    products: [
      {
        label: 'Nilufar',
        value: 1
      }
    ]
  })
}
</script>
<style>
</style>
