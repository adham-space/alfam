<template>
  <div class="tools-wrapper">
    <p>List №: ALFAM-001 </p>
    <el-select
      v-model="currentProduct"
      style="width: 100%"
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
      v-model="currentStatus"
      style="width: 100%"
      class="tools-wrapper-item"
      placeholder="Choose action"
    >
      <el-option
        v-for="(pr, i) in Procedures"
        :key="i"
        :label="pr.label"
        :value="pr.value"
      />
    </el-select>
    <el-select
      v-model="currentConsumer"
      class="tools-wrapper-item"
      style="width: 100%"

      placeholder="Choose a consumer"
    >
      <el-option
        v-for="(pr, i) in consumers"
        :key="i"
        :label="pr.label"
        :value="pr.value"
      />
    </el-select>
    <el-select
      v-model="currentConsumer"
      class="tools-wrapper-item"
      style="width: 100%"

      placeholder="Choose a Driver"
    >
      <el-option
        v-for="(pr, i) in consumers"
        :key="i"
        :label="pr.label"
        :value="pr.value"
      />
    </el-select>
    <el-input
      v-model="costOfUpload"
      class="tools-wrapper-item"
      placeholder="Cost to upload (so'm)"
    />
    <slot></slot>
  </div>
</template>
<script>
export default {
  data: () => ({
    currentProduct: '',
    currentStatus: '',
    currentConsumer: '',
    costOfUpload: '',
    products: [
      {
        label: 'Nilufar',
        value: 1
      }
    ],
    Procedures: [
      {
        label: 'Sotib olish',
        value: 1
      },
      {
        label: 'Barter (Almashtirish)',
        value: 2
      },
      {
        label: 'Qaytarib berish',
        value: 3
      }
    ],
    consumers: [
      {
        label: 'A',
        value: 1
      },
      {
        label: 'B',
        value: 2
      },
      {
        label: 'Q',
        value: 3
      }
    ]
  })
}
</script>

<style>
    .tools-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: .5rem;
    }

    .tools-wrapper-item {
        margin-top: .5rem;
    }
</style>
