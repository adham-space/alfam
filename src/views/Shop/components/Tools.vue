<template>
  <div class="tools-wrapper">
    <p>List №: {{ order.order_name }}</p>

    <el-form
      ref="toolBarFormRef"
      :model="toolBarForm"
      :rules="rules"
      style="width: 100%"
    >
      <el-form-item prop="currentProduct" label="Product">
        <el-select
          v-model="toolBarForm.currentProduct"
          style="width: 100%; background-color: transparent"
          placeholder="Choose a product"
          @change="getProducts"
        >
          <el-option
            style="background-color: transparent"
            v-for="(pr, i) in batches"
            :key="i"
            :label="pr.product"
            :value="pr.product"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="withBorken">
        <el-checkbox
          v-model="toolBarForm.withBorken"
          style="width: 100%"
          @change="brokenStateChanged"
          >Include borkens</el-checkbox
        >
      </el-form-item>
      <el-form-item prop="currentcustomer">
        <el-select
          v-model="toolBarForm.currentcustomer"
          class="tools-wrapper-item"
          style="width: 100%"
          placeholder="Choose a customer"
          @change="customerChanged"
        >
          <el-option
            v-for="(pr, i) in customers"
            :key="i"
            :label="pr.firstName + ' ' + pr.lastName"
            :value="pr._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="currentStatus">
        <el-select
          v-model="toolBarForm.currentStatus"
          style="width: 100%"
          class="tools-wrapper-item"
          placeholder="Choose action"
          @change="procedureChanged"
        >
          <el-option label="Sotib olish" :value="1"  />
          <el-option label="Barter (Almashtirish)" :value="2" />
          <el-option label="Qaytarish" :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item prop="currentDriver">
        <el-select
          v-model="toolBarForm.currentDriver"
          class="tools-wrapper-item"
          style="width: 100%"
          placeholder="Choose a Driver"
          @change="currentDriverChanged"
        >
          <el-option
            v-for="(pr, i) in drivers"
            :key="i"
            :label="pr.firstName + ' ' + pr.lastName"
            :value="pr._id"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="costOfUpload">
        <el-input
          v-model="toolBarForm.costOfUpload"
          type="number"
          class="tools-wrapper-item"
          placeholder="Cost to upload (so'm)"
          @change="costOfUploadChanging"
        />
      </el-form-item>
      <el-form-item prop="totalPrice" label="Discount price (last price)">
        <el-input
          :value="totalPrice"
          type="number"
          class="tools-wrapper-item"
          placeholder="Discount price"
          @input="changebase_price"
        />
      </el-form-item>

      <el-form-item label="Is debt?" prop="isDebt">
        <el-switch
          v-model="toolBarForm.isDebt"
          active-color="#13ce66"
          inactive-color=""
          @change="setIsDebt"
        />
      </el-form-item>

      <el-form-item
        label="Debt return date"
        prop="debtDate"
        v-if="toolBarForm.isDebt"
      >
        <el-date-picker
          v-model="toolBarForm.debtDate"
          type="date"
          format="yyyy-MM-dd"
          value-format="timestamp"
          style="margin-bottom: 1em"
          placeholder="Debt back date"
          @change="setReturnDebtDate"
        />
      </el-form-item>

      <el-form-item
        v-if="toolBarForm.isDebt"
        label="Debt description"
        prop="debtDescription"
      >
        <el-input
          v-model="toolBarForm.debtDescription"
          style="margin-bottom: 1em"
          type="textarea"
          rows="4"
          @change="setDebtDescription"
        />
      </el-form-item>
    </el-form>
    <div class="order-action-btn">
      <el-button
        type="primary"
        :disabled="order_saving"
        :loading="order_saving"
        @click="validateOrder()"
        >Save</el-button
      >
      <el-button type="danger" @click="reset_all()">Cancel</el-button>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";
import request from "@/utils/request";
import { Message } from "element-ui";
import tools_mixin from "./mixins/tools.mixin";
export default {
  mixins: [tools_mixin],
  props: {
    totalPrice: {
      type: [Number, String],
      default: 0,
    },
    isTableValid: {
      type: [Boolean],
      default: false,
    },
  },
  data: () => ({
    order_saving: false,
    batches: [],
  }),
  computed: {
    ...mapState("products", ["products_types", "product", "order"]),
    drivers() {
      return this.$store.state.drivers.tableData;
    },
    customers() {
      return this.$store.state.customers.tableData;
    },
  },
  mounted() {
    this.getOrderCount();
    this.GET_PRODUCT_TYPES();
    this.GET_CUSTOMERS();
    this.GET_DRIVERS();
    request({
      url: "/products/get-batches-shop",
      method: "GET",
    })
      .then((res) => {
        this.batches = res.data;
        console.log(this.batches)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    ...mapActions("products", [
      "GET_PRODUCT_TYPES",
      "GET_PRODUCT_BY_TYPE_ID",
      "SAVE_ORDER",
    ]),
    ...mapActions("customers", ["GET_CUSTOMERS"]),
    ...mapActions("drivers", ["GET_DRIVERS"]),
    ...mapMutations("products", ["SET_ORDER", "PREPARE_ORDER"]),

    getOrderCount() {
      request({
        url: "/orders/get-order-count-for-today",
      })
        .then((res) => {
          console.log("orders", res.data);
          const d = new Date();
          this.SET_ORDER({
            key: "order_name",
            value: `ALFAM-${res.data[0].count + 1}-${d.getDate()}/${
              d.getMonth() + 1
            }/${d.getFullYear()}`,
          });
        })
        .catch((err) => {
          console.log("orders", err);
        });
    },

    checkTableIsValidToSave() {
      this.$emit("checkTable");
    },

    validateOrder() {
      this.checkTableIsValidToSave();
      setTimeout(() => {
        this.$refs.toolBarFormRef.validate((valid) => {
          if (valid) {
            if (this.isTableValid) {
              this.saveOrder();
            } else {
              this.$notify({
                message: "Check table, there should not be empty, make them 0",
                type: "error",
                duration: 0,
              });
            }
          } else {
            return false;
          }
        });
      }, 120);
    },

    saveOrder() {
      // first need to be check whether everything is ok
      this.order_saving = true;
      this.PREPARE_ORDER();
      setTimeout(() => {
        this.SAVE_ORDER()
          .then(() => {
            this.order_saving = false;
            Message({
              message: "Order successfully saved",
              type: "success",
              duration: 3000,
            });
            this.reset_all();
            this.$emit("closeNotification");
            this.getOrderCount();
          })
          .catch((err) => {
            this.order_saving = false;
            Message({
              message: err.response.data,
              type: "error",
              duration: 3000,
            });
          });
      }, 200);
    },
    setIsDebt(val) {
      this.SET_ORDER({ key: "is_debt", value: val });
    },
    getProducts(val) {
      let product = this.batches.find((batch) => batch.product.includes(val));
      console.log("product: ", product);
      this.SET_ORDER({ key: "product", value: {
        title: product.product,
        product_id: product.product_id,
        partiya: product.partiya
      }});
      this.GET_PRODUCT_BY_TYPE_ID({product_id: product.product_id, partiya: product.partiya});
    },

    changebase_price(val) {
      // this is to change each item base price accordingly
      this.$emit("totalPriceChanged", val);
      this.toolBarForm.totalPrice = val;
      this.SET_ORDER({ key: "last_sum", value: parseFloat(val) });
    },
    brokenStateChanged(val) {
      this.$emit("brokenState", val);
      this.SET_ORDER({ key: "includes_brokens", value: val });

    },
    procedureChanged(val) {
      this.SET_ORDER({ key: "action", value: val });
    },
    setReturnDebtDate(val) {
      this.SET_ORDER({ key: "date_of_return_debt", value: val });
    },
    setDebtDescription(val) {
      this.SET_ORDER({ key: "description_of_debt", value: val });
    },
    costOfUploadChanging(val) {
      this.SET_ORDER({ key: "upload_cost", value: parseFloat(val) });
    },
    currentDriverChanged(val) {
      this.SET_ORDER({ key: "driver", value: val });
    },
    customerChanged(val) {
      this.SET_ORDER({ key: "customer", value: val });
      this.getLastActionOfCustomer();
    },
    reset_all() {
      this.toolBarForm.withBorken = false;
      this.toolBarForm.currentProduct = "";
      this.toolBarForm.currentStatus = "";
      this.toolBarForm.currentcustomer = "";
      this.toolBarForm.costOfUpload = "";
      this.order_saving = false;
      this.toolBarForm.currentDriver = "";
      this.toolBarForm.debtDescription = "";
      this.toolBarForm.debtDate = "";
      this.toolBarForm.isDebt = false;
      this.changebase_price(0);
      this.$refs.toolBarFormRef.resetFields();
    },
  },
};
</script>

<style scope>
.tools-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5em !important;
  overflow-y: auto;
  height: 100%;
  background-color: white;
  border-radius: 10px;
}

.tools-wrapper::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

/* Track */
.tools-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
.tools-wrapper::-webkit-scrollbar-thumb {
  background: rgba(172, 172, 172, 0.247);
  border-radius: 10px;
}

/* Handle on hover */
.tools-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgb(146, 146, 146);
  border-radius: 10px;
}

.tools-wrapper-item {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.notificationTable {
  width: 230px;
  border-spacing: 5px;
}

.order-action-btn {
}
</style>
