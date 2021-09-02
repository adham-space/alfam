<template>
  <el-row :gutter="10" class="stepOne">
    <el-form ref="storeFormRef" :model="formDataObj" :rules="rules">
      <el-col :offset="2" :span="20">
        <el-select
          v-model="formDataObj.current_subType"
          style="margin-bottom: 1em"
          placeholder="Select sub type"
          @change="setCurrentType"
        >
          <el-option
            v-for="subType in subTypes"
            :key="subType.id"
            :label="subType.type_name"
            :value="subType.id"
          />
        </el-select>
      </el-col>
      <el-col :offset="2" :span="20" class="top-inputs">
        <el-card shadow="hover" class="box-card">
          <div slot="header" class="clearfix">
            <span>Create one packet</span>
          </div>
          <div class="one-packet">
            <span>
              <span style="color: darkgray; margin-right: 1rem">AREA OF ONE ITEM:</span>
              {{
                Object.keys(currentType).length > 0 ? areaOfOneItem() : "_"
              }}
              <span
                style="color: darkgray"
              >
                M
                <sup>2</sup>
              </span>
            </span>

            <div class="amountAndWeight">
              <span style="margin-top: 1rem">
                <span style="color: darkgray; margin-right: 1rem">NUMBER OF ITEMS:</span>
                <el-form-item prop="numberOfItems">
                  <el-input
                    v-model="formDataObj.numberOfItems"
                    style="width: 150px"
                    type="number"
                    placeholder="Num"
                  />
                </el-form-item>
              </span>
              <span style="margin-top: 1rem; margin-left: 1rem">
                <span style="color: darkgray; margin-right: 1rem">WEIGHT OF ONE PACKED:</span>
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
            <span style="margin-top: 1rem">
              <span style="color: darkgray; margin-right: 1rem">AREA OF ONE PACKET:</span>
              {{ formDataObj.numberOfItems === "" ? "_" : areaOfOnePacket() }}
              <span
                style="color: darkgray"
              >
                M
                <sup>2</sup>
              </span>
            </span>
            <span style="margin-top: 1rem">
              <span style="color: darkgray; margin-right: 1rem">WEIGHT OF AN ITEM:</span>
              {{ formDataObj.weightOfPacket === "" ? "_" : wightOfOneItem() }}
              <span
                style="color: darkgray"
              >Kg</span>
            </span>

            <div class="amountAndWeight">
              <span style="margin-top: 1rem">
                <span style="color: darkgray; margin-right: 1rem">BASE PRICE:</span>
                <el-form-item prop="base_price">
                  <el-input
                    v-model="formDataObj.base_price"
                    style="width: 150px"
                    type="number"
                    placeholder="Base price"
                  />
                </el-form-item>
              </span>
              <span style="margin-top: 1rem; margin-left: 1rem">
                <span style="color: darkgray; margin-right: 1rem">PRICE BY:</span>
                <el-form-item prop="base_priceBy">
                  <el-switch v-model="formDataObj.base_priceBy" />
                  {{ base_priceByText }}
                </el-form-item>
              </span>
            </div>
            <el-button
              style="color: green"
              @click="savePacket()"
            >Save Packet</el-button>
          </div>

        </el-card>
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      rules: {
        currentProduct: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, cb) => {
              console.log('value', value)
              if (value) {
                cb()
              } else {
                cb(new Error('Product should be selected'))
              }
            }
          }
        ],
        current_subType: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb()
              } else {
                cb(new Error('Type of product should be selected'))
              }
            }
          }
        ],
        numberOfItems: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb()
              } else {
                cb(new Error('Number should be enetered'))
              }
            }
          }
        ],
        weightOfPacket: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb()
              } else {
                cb(new Error('Wight of packet should be enetered'))
              }
            }
          }
        ],
        base_price: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb()
              } else {
                cb(new Error('Price should be enetered'))
              }
            }
          }
        ]
      },
      currentType: {},
      formDataObj: {
        currentProduct: '',
        current_subType: '',
        numberOfItems: '',
        weightOfPacket: '',
        base_price: '',
        base_priceBy: false
      }
    }
  },
  computed: {
    ...mapState('others/newProduct', ['types']),
    subTypes() {
      return this.types
    },
    base_priceByText() {
      if (this.formDataObj.base_priceBy) {
        return 'By item num'
      } else {
        return 'Area (m2)'
      }
    }
  },
  mounted() {},
  methods: {
    ...mapMutations('others/newProduct', ['SET_PACKET_INFO']),
    savePacket() {
      this.$refs.storeFormRef.validate((valid) => {
        if (valid) {
          this.SET_PACKET_INFO({
            type_id: this.formDataObj.current_subType,
            ...this.formDataObj,
            area_of_an_item: parseFloat(this.areaOfOneItem()),
            number_of_items: parseFloat(this.formDataObj.numberOfItems),
            wight_of_one_packet: parseFloat(this.formDataObj.weightOfPacket),
            area_of_one_packet: parseFloat(this.areaOfOnePacket()),
            weight_of_an_item: parseFloat(this.wightOfOneItem())
          })
          this.formDataObj = {
            currentProduct: '',
            current_subType: '',
            numberOfItems: '',
            weightOfPacket: '',
            base_price: '',
            base_priceBy: false
          }
          this.currentType = {}
          this.$refs.storeFormRef.resetFields()
        } else {
          return false
        }
      })
    },
    wightOfOneItem() {
      return (
        this.formDataObj.weightOfPacket / this.formDataObj.numberOfItems
      ).toFixed(2)
    },
    areaOfOnePacket() {
      return (
        ((this.currentType.height * this.currentType.width) / 10000.0) *
        this.formDataObj.numberOfItems
      )
    },
    areaOfOneItem() {
      console.log(
        'area',
        (this.currentType.height * this.currentType.width) / 10000.0
      )
      return (this.currentType.height * this.currentType.width) / 10000.0
    },
    setCurrentCredentials(pr, val) {
      console.log('pr', pr)
      if (pr.weightOfPacket || pr.numberOfItems) {
        this.formDataObj = {
          currentProduct: '',
          current_subType: val,
          ...pr
        }
      }
    },
    setCurrentType(val) {
      this.formDataObj.singan = false
      const pr = this.types.find(product => product.id === val)
      if (pr) {
        this.currentType = pr
        this.setCurrentCredentials(pr, val)
        this.typeName = this.currentType.type_name
      } else {
        this.currentType = {}
        this.formDataObj.weightOfPacket = ''
        this.formDataObj.numberOfItems = ''
      }
    }
  }
}
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
