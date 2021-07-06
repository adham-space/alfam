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
    <el-checkbox v-model="withBorken" style="margin: 1em 0" @change="brokenStateChanged">Include borkens</el-checkbox>
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
    <el-input
      :value="totalPrice"
      type="number"
      class="tools-wrapper-item"
      placeholder="Discount price"
      @input="changeBasePrice"
    />
    <div style="margin-bottom: 1em">
      <el-switch
        v-model="isDebt"
        active-color="#13ce66"
        inactive-color=""
      />
      Is debt?
    </div>
    <el-date-picker
      v-if="isDebt"
      v-model="debtDate"
      style="margin-bottom: 1em"
      placeholder="Debt back date"
    />
    <el-input
      v-if="isDebt"
      v-model="debtDescription"
      style="margin-bottom: 1em"
      type="textarea"
      rows="4"
    />
    <div class="order-action-btn">
      <!-- <el-button type="primary">Save</el-button>
      <el-button type="danger">Cancel</el-button> -->
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    totalPrice: {
      type: [Number, String],
      default: 0
    }
  },
  data: () => ({
    withBorken: false,
    currentProduct: '',
    currentStatus: '',
    currentConsumer: '',
    costOfUpload: '',
    discountPrice: 0,
    debtDescription: '',
    debtDate: '',
    isDebt: false,
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
  }),
  methods: {
    basePriceChangedOneOfItem(val) { // this will be called when base price of one item is changed
      this.discountPrice = val
      console.log('sends back', val)
    },
    changeBasePrice(val) { // this is to change each item base price accordingly
      this.$emit('totalPriceChanged', val)
    },
    brokenStateChanged(val) {
      this.$emit('brokenState', val)
    }

  }
}
</script>

<style>
    .tools-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: .5rem;
        overflow-y: auto;
    }

    .tools-wrapper-item {
        margin-top: .5rem;
        margin-bottom: .5rem;
    }

    .notificationTable {
      width: 230px;
      border-spacing: 5px;
    }

    .order-action-btn {

    }
</style>
