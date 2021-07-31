<template>
  <el-row style="padding: 1em">
    <el-form ref="storeFormRef" :model="formDataObj" :rules="rules">
      <el-col
        class="toolbar-store"
        :lg="{ offset: 6, span: 12 }"
        :md="{ offset: 4, span: 16 }"
      >
        <el-form-item prop="currentProduct">
          <el-select
            v-model="formDataObj.currentProduct"
            style="margin-right: 1em"
            placeholder="Select product type"
          >
            <el-option
              v-for="type in products_types"
              :key="type._id"
              :label="type.product_name"
              :value="type._id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="current_subType">
          <el-select
            v-model="formDataObj.current_subType"
            style="margin-right: 1em"
            placeholder="Select sub type"
            @change="setCurrentType"
          >
            <el-option
              v-for="subType in subTypes"
              :key="subType._id"
              :label="subType.type_name"
              :value="subType._id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="singan">
          <el-checkbox
            :value="formDataObj.singan"
            style="margin-left: 1rem"
            @change="changedBrokenState"
            >Singan</el-checkbox
          >
        </el-form-item>
      </el-col>
      <el-col :lg="{ offset: 6, span: 12 }" :md="{ offset: 4, span: 16 }">
        <p>
          PARTIYA:
          <span style="background-color: green; color: white">{{
            partiya_title
          }}</span>
        </p>
      </el-col>
      <el-col
        class="store-bdy"
        :lg="{ offset: 6, span: 12 }"
        :md="{ offset: 4, span: 16 }"
      >
        <el-card v-if="!hidePacketField" shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <span>Create one packet</span>
          </div>
          <div class="one-packet">
            <span
              ><span style="color: darkgray; margin-right: 1rem"
                >AREA OF ONE ITEM: </span
              >{{
                Object.keys(currentType).length > 0 ? areaOfOneItem() : "_"
              }}
              <span style="color: darkgray">M<sup>2</sup></span></span
            >

            <div class="amountAndWeight">
              <span style="margin-top: 1rem"
                ><span style="color: darkgray; margin-right: 1rem"
                  >NUMBER OF ITEMS:
                </span>
                <el-form-item prop="numberOfItems">
                  <el-input
                    v-model="formDataObj.numberOfItems"
                    style="width: 150px"
                    type="number"
                    placeholder="Num"
                  /> </el-form-item
              ></span>
              <span style="margin-top: 1rem; margin-left: 1rem"
                ><span style="color: darkgray; margin-right: 1rem"
                  >WEIGHT OF ONE PACKED:
                </span>
                <el-form-item prop="weightOfPacket">
                  <el-input
                    v-model="formDataObj.weightOfPacket"
                    style="width: 150px"
                    type="number"
                    placeholder="Kg"
                  />
                </el-form-item>
              </span>
            </div>
            <span style="margin-top: 1rem"
              ><span style="color: darkgray; margin-right: 1rem"
                >AREA OF ONE PACKET: </span
              >{{ formDataObj.numberOfItems === "" ? "_" : areaOfOnePacket() }}
              <span style="color: darkgray">M<sup>2</sup></span></span
            >
            <span style="margin-top: 1rem"
              ><span style="color: darkgray; margin-right: 1rem"
                >WEIGHT OF AN ITEM: </span
              >{{ formDataObj.weightOfPacket === "" ? "_" : wightOfOneItem() }}
              <span style="color: darkgray">Kg</span></span
            >

            <div class="amountAndWeight">
              <span style="margin-top: 1rem"
                ><span style="color: darkgray; margin-right: 1rem"
                  >BASE PRICE:
                </span>
                <el-form-item prop="base_price">
                  <el-input
                    v-model="formDataObj.base_price"
                    style="width: 150px"
                    type="number"
                    placeholder="Base price"
                  />
                </el-form-item>
              </span>
              <span style="margin-top: 1rem; margin-left: 1rem"
                ><span style="color: darkgray; margin-right: 1rem"
                  >PRICE BY:
                </span>
                <el-form-item prop="base_priceBy">
                  <el-switch v-model="formDataObj.base_priceBy" />
                  {{ base_priceByText }}
                </el-form-item>
              </span>
            </div>
          </div>
        </el-card>

        <el-card shadow="hover" class="box-card" style="margin-top: 1rem">
          <div slot="header" style="height: 4rem">Store To Sklad</div>
          <div class="one-packet">
            <span style="color: darkgray; margin-right: 1rem"
              >TOTAL AREA:
            </span>
            <el-form-item prop="totalArea">
              <el-input
                v-model="formDataObj.totalArea"
                style="width: 150px"
                type="number"
                placeholder="M2"
              />
            </el-form-item>
            <span style="margin-top: 1rem"
              ><span style="color: darkgray">TOTAL NUMBER OF ITEMS: </span
              >{{
                Object.keys(currentType).length > 0 &&
                formDataObj.totalArea !== ""
                  ? totalNumberOfItems()
                  : "_"
              }}
              dona</span
            >

            <span style="margin-top: 1rem"
              ><span style="color: darkgray">TOTAL NUMBER OF PACKETS: </span
              ><span :style="{ color: errorOccured ? 'red' : 'black' }">
                {{
                  Object.keys(currentType).length > 0 &&
                  formDataObj.totalArea !== ""
                    ? numberOfPackets() +
                      " / " +
                      notCompletePacketItems() +
                      " dona"
                    : "_"
                }}
              </span>

              <el-tooltip
                v-if="errorOccured"
                class="item"
                effect="dark"
                content="(m2) MA'LUMOTI XATO KIRITILGAN"
                placement="top"
              >
                <i style="color: red" class="el-icon-circle-close"> XATO</i>
              </el-tooltip>
            </span>

            <span style="margin-top: 1rem"
              ><span style="color: darkgray">TOTAL WEIGHT OF PACKETS: </span
              >{{
                Object.keys(currentType).length > 0 &&
                formDataObj.totalArea !== ""
                  ? totalWeight()
                  : "_"
              }}
              Kg</span
            >
          </div>
        </el-card>

        <el-form-item prop="description" style="width: 100%">
          <el-input
            v-model="formDataObj.description"
            type="textarea"
            style="margin: 1em 0; width: 100%"
            placeholder="Description"
          />
        </el-form-item>
        <el-button
          :loading="isSaving"
          style="color: green"
          @click="storeToSklad()"
          >Store to sklad</el-button
        >
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import request from "@/utils/request";
import { Message } from "element-ui";
export default {
  data() {
    return {
      hidePacketField: false,
      formDataObj: {
        currentProduct: "",
        current_subType: "",
        numberOfItems: "",
        weightOfPacket: "",
        base_price: "",
        base_priceBy: false,
        singan: false,
        totalArea: "",
        description: "",
      },
      rules: {
        currentProduct: [
          {
            trigger: "change",
            required: true,
            validator: (rule, value, cb) => {
              console.log("value", value);
              if (value) {
                cb();
              } else {
                cb(new Error("Product should be selected"));
              }
            },
          },
        ],
        current_subType: [
          {
            trigger: "change",
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb();
              } else {
                cb(new Error("Type of product should be selected"));
              }
            },
          },
        ],
        numberOfItems: [
          {
            trigger: "change",
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb();
              } else {
                cb(new Error("Number should be enetered"));
              }
            },
          },
        ],
        weightOfPacket: [
          {
            trigger: "change",
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb();
              } else {
                cb(new Error("Wight of packet should be enetered"));
              }
            },
          },
        ],
        base_price: [
          {
            trigger: "change",
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb();
              } else {
                cb(new Error("Price should be enetered"));
              }
            },
          },
        ],
        totalArea: [
          {
            trigger: "change",
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb();
              } else {
                cb(new Error("Total area should be enetered"));
              }
            },
          },
        ],
      },
      currentType: {},
      productName: "",
      typeName: "",
      isSaving: false,
    };
  },
  computed: {
    ...mapState("products", [
      "products_types",
      "products",
      "todays_product_nums",
      "isThereBroken",
      "there_is_product_type",
    ]),
    canISave() {
      if (this.isThereBroken && this.formDataObj.singan) return false;
      if (!this.there_is_product_type && this.formDataObj.singan) return false;
      return true;
    },
    partiya_title() {
      const date = new Date();
      console.log("can I save: ", this.canISave);
      if (!this.canISave) {
        Message({
          message:
            "You could not enter more brokens because in this batch already stored, Or first need to save not-broken product type",
          duration: 4500,
          type: "error",
        });
      }
      console.log(this.formDataObj.singan ? 0 : 1);
      return `${this.productName}-${this.typeName}-${
        this.todays_product_nums + (this.formDataObj.singan ? 0 : 1)
      }${this.formDataObj.singan ? "-broken" : ""}-${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
    },
    subTypes() {
      const pr = this.products_types.find(
        (product) => product._id === this.formDataObj.currentProduct
      );
      console.log("pr", pr);
      if (pr) {
        // eslint-disable-next-line
        this.productName = pr.product_name;
        return pr.product_types;
      }
      return {};
    },
    errorOccured() {
      const checkNum = this.notCompletePacketItems();
      const errorInNum = checkNum - parseInt(checkNum);
      return errorInNum > 0.0;
    },
    base_priceByText() {
      if (this.formDataObj.base_priceBy) {
        return "By item num";
      } else {
        return "Area (m2)";
      }
    },
  },
  mounted() {
    this.GET_PRODUCT_TYPES();
    this.GET_PRODUCTS();
  },
  methods: {
    ...mapActions("products", [
      "GET_PRODUCT_TYPES",
      "GET_PRODUCTS",
      "GET_TODAYS_PRODUCTS",
    ]),
    storeToSklad() {
      const sendData = {
        partiya: this.todays_product_nums + (this.formDataObj.singan ? 0 : 1),
        title: this.partiya_title,
        product: this.formDataObj.currentProduct,
        product_type: this.formDataObj.current_subType,
        area_of_an_item: parseFloat(this.areaOfOneItem()),
        number_of_items: parseFloat(this.formDataObj.numberOfItems),
        wight_of_one_packet: parseFloat(this.formDataObj.weightOfPacket),
        area_of_one_packet: parseFloat(this.areaOfOnePacket()),
        weight_of_an_item: parseFloat(this.wightOfOneItem()),
        base_price: parseFloat(this.formDataObj.base_price),
        price_by: this.formDataObj.base_priceBy,
        broken: this.formDataObj.singan,
        total_area: parseFloat(this.formDataObj.totalArea),
        total_number_of_items: parseFloat(this.totalNumberOfItems()),
        total_number_of_packets: parseFloat(this.numberOfPackets()),
        total_wight_of_packets: parseFloat(this.totalWeight()),
        description: this.formDataObj.description,
      };
      this.$refs.storeFormRef.validate((valid) => {
        if (valid && this.canISave) {
          this.isSaving = true;
          request({
            url: "/products/add-product",
            method: "POST",
            data: sendData,
          })
            .then((res) => {
              this.isSaving = false;
              Message({
                message: "Product stored successfully",
                duration: 2000,
                type: "success",
              });
              this.resetAll();
            })
            .catch((err) => {
              this.isSaving = false;
              Message({
                message: "Error: product store " + err.response.data,
                duration: 4000,
                type: "error",
              });
            });
        } else {
          return false;
        }
      });
    },

    changedBrokenState(val) {
      if (!this.isThereBroken && this.there_is_product_type ) {
        if (val) {
          this.hidePacketField = true;
          this.formDataObj.singan = true;
          request({
            url: "/products/get-product-of-type",
            method: "GET",
            params: {
              partiya:
                this.todays_product_nums + (this.formDataObj.singan ? 0 : 1),
              product_type: this.formDataObj.current_subType,
              product: this.formDataObj.currentProduct,
            },
          })
            .then((res) => {
              // console.log(res.data)
              this.currentType = res.data.product_type;
              this.formDataObj.numberOfItems = res.data.number_of_items;
              this.formDataObj.weightOfPacket = res.data.wight_of_one_packet;
              this.formDataObj.base_price = res.data.base_price;
              this.formDataObj.base_priceBy = res.data.price_by;
            })
            .catch((err) => {
              Message({
                message: err.response.data,
                type: "error",
                duration: 4000,
              });
            });
        } else {
          this.hidePacketField = false;
          this.formDataObj.singan = false;
        }
      } else {
        Message({
          message:
            "You could not enter more brokens because in this batch already stored, Or first need to save not-broken product type",
          duration: 4500,
          type: "error",
        });
      }
    },

    resetAll() {
      this.formDataObj.currentProduct = "";
      this.formDataObj.current_subType = "";
      this.formDataObj.base_priceBy = false;
      this.formDataObj.singan = false;
      this.formDataObj.totalArea = "";
      this.formDataObj.base_price = "";
      this.formDataObj.weightOfPacket = "";
      this.formDataObj.numberOfItems = "";
      this.currentType = {};
      this.formDataObj.description = "";
      this.areaOfOneItem();
      this.areaOfOnePacket();
      this.wightOfOneItem();
      this.totalNumberOfItems();
      this.numberOfPackets();
      this.totalWeight();
      this.areaOfOneItem();
      this.typeName = "";
      this.productName = "";
      this.$refs.storeFormRef.resetFields();
      this.hidePacketField = false;
    },
    setCurrentType(val) {
      this.formDataObj.singan = false
      const pr = this.products_types.find(
        (product) => product._id === this.formDataObj.currentProduct
      );
      if (pr) {
        this.currentType = pr.product_types.find((type) => type._id === val);
        this.typeName = this.currentType.type_name;
        this.GET_TODAYS_PRODUCTS({
          product: this.formDataObj.currentProduct,
          product_type: this.formDataObj.current_subType,
          isBroken: this.formDataObj.singan,
        });
      } else {
        this.currentType = {};
        this.formDataObj.weightOfPacket = "";
        this.formDataObj.numberOfItems = "";
      }
    },
    areaOfOneItem() {
      return (this.currentType.height * this.currentType.width) / 10000.0;
    },
    areaOfOnePacket() {
      return (
        ((this.currentType.height * this.currentType.width) / 10000.0) *
        this.formDataObj.numberOfItems
      );
    },
    wightOfOneItem() {
      return (
        this.formDataObj.weightOfPacket / this.formDataObj.numberOfItems
      ).toFixed(2);
    },

    totalWeight() {
      return (this.wightOfOneItem() * this.totalNumberOfItems()).toFixed(2);
    },

    totalNumberOfItems() {
      return (this.formDataObj.totalArea / this.areaOfOneItem()).toFixed(3);
    },
    numberOfPackets() {
      return parseInt(
        this.totalNumberOfItems() / this.formDataObj.numberOfItems
      );
    },

    notCompletePacketItems() {
      return this.totalNumberOfItems() % this.formDataObj.numberOfItems;
    },
  },
};
</script>

<style>
.toolbar-store {
  display: flex;
  align-items: center;
  height: 4rem;
}

.one-packet {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1em;
}

.store-bdy {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box-card {
  width: 100%;
}
.box-card > .el-card__header {
  height: 4rem;
}
.amountAndWeight {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
