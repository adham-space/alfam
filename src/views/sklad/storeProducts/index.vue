<template>
  <el-row style="padding: 1em">
    <el-col :span="11" style="height: calc(100vh - 85px); overflow-y: auto;">
      <el-form ref="storeFormRef" :model="formDataObj" :rules="rules">
        <el-col
          class="toolbar-store"
          :lg="{ offset: 0, span: 24 }"
          :md="{ offset: 0, span: 24 }"
        >
          <el-form-item prop="currentProduct">
            <el-select
              :value="formDataObj.currentProduct"
              style="margin-right: 1em"
              placeholder="Махсулот номи"
              @change="currentProductIsGoingToChange"
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
              placeholder="Турлари"
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
            >Синган</el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :lg="{ offset: 0, span: 24 }" :md="{ offset: 0, span: 24 }">
          <p>
            ПАРТИЯ:
            <span style="background-color: green; color: white">{{
              partiya_title
            }}</span>
          </p>
        </el-col>
        <el-col
          class="store-bdy"
          :lg="{ offset: 0, span: 24 }"
          :md="{ offset: 0, span: 24 }"
        >
          <el-card v-show="!hidePacketField" shadow="hover" class="box-card">
            <div slot="header" class="clearfix">
              <span>1 ТА КАРОБКАНИ МАъЛУМОТИ</span>
            </div>
            <div class="one-packet">
              <span><span
                      style="color: darkgray; margin-right: 1rem"
                    >ДОНАСИНИ ЮЗАСИ: </span>{{
                      Object.keys(currentType).length > 0 ? areaOfOneItem() : "_"
                    }}
                <span style="color: darkgray">M<sup>2</sup></span></span>

              <div class="amountAndWeight">
                <span
                  style="margin-top: 1rem"
                ><span
                   style="color: darkgray; margin-right: 1rem"
                 >1 КАРОБКАДАГИ ДОНАСИ:
                 </span>
                  <el-form-item prop="numberOfItems">
                    <el-input
                      v-model="formDataObj.numberOfItems"
                      style="width: 150px"
                      type="number"
                      placeholder="Донаси"
                    /> </el-form-item></span>
                <span
                  style="margin-top: 1rem; margin-left: 1rem"
                ><span
                   style="color: darkgray; margin-right: 1rem"
                 >1 ТА КАРОБКАНИНГ УМУМИЙ ОҒИРЛИГИ:
                 </span>
                  <el-form-item prop="weightOfPacket">
                    <el-input
                      v-model="formDataObj.weightOfPacket"
                      style="width: 150px"
                      type="number"
                      placeholder="Кг"
                    />
                  </el-form-item>
                </span>
              </div>
              <span
                style="margin-top: 1rem"
              ><span
                 style="color: darkgray; margin-right: 1rem"
               >1 ТА КАРОБКАНИНГ УМУМИЙ ЮЗАСИ: </span>{{ formDataObj.numberOfItems === "" ? "_" : areaOfOnePacket() }}
                <span style="color: darkgray">M<sup>2</sup></span></span>
              <span
                style="margin-top: 1rem"
              ><span
                 style="color: darkgray; margin-right: 1rem"
               >1 ТА ДОНАСИНИ ОҒИРЛИГИ: </span>{{ formDataObj.weightOfPacket === "" ? "_" : wightOfOneItem() }}
                <span style="color: darkgray">Кг</span></span>

              <div class="amountAndWeight">
                <span
                  style="margin-top: 1rem"
                ><span
                   style="color: darkgray; margin-right: 1rem"
                 >КАССА НАРХИ:
                 </span>
                  <el-form-item prop="base_price">
                    <el-input
                      v-model="formDataObj.base_price"
                      style="width: 150px"
                      type="number"
                      placeholder="касса нархи"
                    />
                  </el-form-item>
                </span>
                <span
                  style="margin-top: 1rem; margin-left: 1rem"
                ><span
                   style="color: darkgray; margin-right: 1rem"
                 >БЎЙИЧА:
                 </span>
                  <el-form-item prop="base_priceBy">
                    <el-switch v-model="formDataObj.base_priceBy" />
                    {{ base_priceByText }}
                  </el-form-item>
                </span>
              </div>
              <div style="display: flex; align-items: center">
                <span
                  style="margin-top: 1rem;"
                ><span
                   style="color: darkgray; margin-right: 1rem"
                 >МАҚСАД:
                 </span>
                  <el-form-item prop="target_date">
                    <el-date-picker
                      v-model="formDataObj.target_date"
                      :disabled="disableDatePicker"
                      type="date"
                      placeholder="МАҚСАД"
                    />
                  </el-form-item>
                </span>
                <el-button v-if="isTargetSet" icon="el-icon-edit" type="text" style="margin-left: 1em" @click="editTarget = true" />
              </div>
            </div>
          </el-card>

          <el-card shadow="hover" class="box-card" style="margin-top: 1rem">
            <div slot="header" style="height: 4rem">Складга келтирилган махсулот миқдори</div>
            <div class="one-packet">
              <!-- <el-form-item prop="target_from">

            </el-form-item> -->

              <span
                style="color: darkgray; margin-right: 1rem"
              >УМИМИЙ ЮЗАСИ:
              </span>
              <el-form-item prop="totalArea">
                <el-input
                  v-model="formDataObj.totalArea"
                  style="width: 150px"
                  type="number"
                  placeholder="M2"
                  @input="totalAreaChanged"
                />
              </el-form-item>
              <span
                style="margin-top: 1rem"
              ><span style="color: darkgray">УМИМИЙ ДОНАСИНИ СОНИ: </span>
                <el-form-item prop="totalNumberOfItem">
                  <el-input
                    :value="parseFloat(formDataObj.totalNumberOfItem)"
                    style="width: 150px"
                    type="number"
                    placeholder="умумий донаси"
                    @input="changedTotalNumber"
                  /> дона
                </el-form-item>
                <!-- {{
              Object.keys(currentType).length > 0 &&
                formDataObj.totalArea !== ""
                ? totalNumberOfItems()
                : "_"
            }} -->
              </span>
              <span
                style="margin-top: 1rem"
              ><span style="color: darkgray">УМИМИЙ ПАКЕТЛАРИНИ СОНИ: </span><span :style="{ color: errorOccured ? 'red' : 'black' }">
                <div style="display: flex">
                  <el-form-item prop="numberOfPacket">
                    <el-input
                      :value="parseFloat(formDataObj.numberOfPacket)"
                      style="width: 150px"
                      type="number"
                      placeholder="умумий почкасини донаси"
                      @input="changedTotalPacketNumber"
                    /> /
                  </el-form-item>
                  <el-form-item prop="overPacketNumberOfItems">
                    <el-input
                      :value="parseFloat(formDataObj.overPacketNumberOfItems)"
                      style="width: 150px"
                      type="number"
                      placeholder="донаси"
                      @input="notCompletePacketItem"
                    /> дона
                  </el-form-item>
                </div>
              <!-- {{
                Object.keys(currentType).length > 0 &&
                  formDataObj.totalArea !== ""
                  ? numberOfPackets() +
                    " / " +
                    notCompletePacketItems() +
                    " dona"
                  : "_"
              }} -->
              </span>

                <el-tooltip
                  v-if="errorOccured"
                  class="item"
                  effect="dark"
                  content="(m2) MA'LUMOTI XATO KIRITILGAN"
                  placement="top"
                >
                  <i style="color: red" class="el-icon-circle-close"> ХАТО</i>
                </el-tooltip>
              </span>

              <span
                style="margin-top: 1rem"
              ><span style="color: darkgray">УМИМИЙ ОҒИРЛИГИ: </span>{{
                Object.keys(currentType).length > 0 &&
                  formDataObj.totalArea !== ""
                  ? totalWeight()
                  : "_"
              }}
                Кг</span>
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
            :disabled="isSaving"
            style="color: green"
            @click="storeToSklad()"
          >+</el-button>
        </el-col>
      </el-form>
    </el-col>
    <el-col :span="13" style="height: calc(100vh - 180px); overflow-y: auto">
      <el-button
        :disabled="isSaving"
        :loading="isSaving"
        style="margin: 0 0 .5em .5em; text-align: right"
        @click="saveAllToSklad()"
      >Сохранить</el-button>
      <el-table-draggable
        :key="dragKey"
        ref="draggableTable"
      >
        <el-table
          :key="currentTableKey"
          border
          row-key="product_type"
          :data="new_batch_of_product"
        >
          <el-table-column align="center" width="150" label="Тури" prop="product_type_name">
            <template slot-scope="scope">
              {{ scope.row.product_type_name + (scope.row.broken ? '-синган': '') }}
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="Умумий юзаси" prop="total_area" />
          <el-table-column align="center" width="150" label="Умумий донаси" prop="total_number_of_items" />
          <el-table-column align="center" width="150" label="Умумий пакелтлари" prop="total_number_of_packets">
            <template slot="header">
              <span>Умумий<br>пакелтлари</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="Пакетдан ортиқча" prop="total_number_of_over_packet">
            <template slot="header">
              <span>Пакетдан<br>ортиқча</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="Касса нархи" prop="base_price" />
          <el-table-column align="center" width="150" label="Бўйича" prop="price_by">\
            <template slot-scope="scope">
              {{ scope.row.price_by ? 'Донаси': 'Юзаси (м2)' }}
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="Донасини юзаси" prop="area_of_an_item">
            <template slot="header">
              <span>Донасини <br> юзаси</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="1 Почкадаги донаси" prop="number_of_items">
            <template slot="header">
              <span>1 Почкадаги<br>донаси</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="160" label="1 Почкасини оғирлиги" prop="wight_of_one_packet">
            <template slot="header">
              <span>1 Почкасини<br>оғирлиги</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="150" label="1 Донасиини оғирлиги" prop="weight_of_an_item">
            <template slot="header">
              <span>1 Донасиини<br>оғирлиги</span>
            </template>
          </el-table-column>
          <el-table-column align="center" width="160" label="1 Почкасини юзаси" prop="area_of_one_packet">
            <template slot="header">
              <span>1 Почкасини <br> юзаси</span>
            </template>
          </el-table-column>

          <el-table-column align="center" width="150" label="Мақсад" prop="target_date">
            <template slot-scope="scope">
              {{ getDate(scope.row.target_date) }}
            </template>
          </el-table-column>

          <el-table-column align="center" width="150" label="Умумий оғирлиги" prop="total_wight_of_packets">
            <template slot="header">
              <span>Умумий<br>оғирлиги</span>
            </template>
          </el-table-column>

          <el-table-column fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" @click="removeFromNewBatch(scope.$index)" />
            </template>
          </el-table-column>
        </el-table>
      </el-table-draggable>
      <div>
        <p v-for="pr in new_batch_of_product_to_be_send" :key="pr._id">
          {{ pr.product_type_name }}
        </p>
      </div>
    </el-col>
    <el-dialog
      align="center"
      title=""
      :visible.sync="product_changing_warnig"
      width="30%"
    >
      <span>Сиз махсулотни ўзгартиряпсиз олдинги ўзгаришлар<br>ёъқотилади олдинги ўзгаришларни <br> сохранит қилинг ёки бу ўзгаришлар ўчиришга рухсат берасизми?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="donotDeleteCurrentWork()">Отмена</el-button>
        <el-button type="primary" @click="deleteAllWorkAndSetNewProduct()">Тасдиқлаш</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import request from '@/utils/request'
import ElTableDraggable from 'el-table-draggable'
import { Message } from 'element-ui'
export default {
  components: {
    ElTableDraggable
  },
  data() {
    return {
      there_is_product_type: false,
      currentTableKey: 0,
      editing_same_type: false,
      temp_current_product: '',
      product_changing_warnig: false,
      isTargetSet: false,
      editTarget: false,
      pickerOptions: {
        disabledDate: this.disabledDate,
        onPick: this.onpick
      },
      hidePacketField: false,
      formDataObj: {
        totalNumberOfItem: '',
        numberOfPacket: '',
        currentProduct: '',
        current_subType: '',
        numberOfItems: '',
        weightOfPacket: '',
        overPacketNumberOfItems: '',
        base_price: '',
        base_priceBy: false,
        singan: false,
        totalArea: '',
        target_date: '',
        description: ''
      },
      rules: {
        target_date: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, cb) => {
              console.log('value', value)
              if (value) {
                cb()
              } else {
                cb(new Error('Мақсад санаси киритилиши керак'))
              }
            }
          }
        ],
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
        ],
        totalArea: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb()
              } else {
                cb(new Error('Total area should be enetered'))
              }
            }
          }
        ],
        overPacketNumberOfItems: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, cb) => {
              if (value || value === 0) {
                cb()
              } else {
                cb(new Error('overPacketNumberOfItems should be enetered'))
              }
            }
          }
        ],
        numberOfPacket: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, cb) => {
              if (value || value === 0) {
                cb()
              } else {
                cb(new Error('numberOfPacket should be enetered'))
              }
            }
          }
        ],
        totalNumberOfItem: [
          {
            trigger: 'change',
            required: true,
            validator: (rule, value, cb) => {
              if (value) {
                cb()
              } else {
                cb(new Error('totalNumberOfItem should be enetered'))
              }
            }
          }
        ]
      },
      currentType: {},
      dragKey: 102,
      productName: '',
      typeName: '',
      isSaving: false
    }
  },
  computed: {
    ...mapState('products', [
      'products_types',
      'new_batch_of_product',
      'new_batch_of_product_to_be_send',
      'products',
      'todays_product_nums',
      'isThereBroken'
    ]),
    disableDatePicker() {
      if (this.isTargetSet) {
        return !this.editTarget
      } else {
        return false
      }
    },
    canISave() {
      if (this.isThereBroken && this.formDataObj.singan) return false
      if (!this.there_is_product_type && this.formDataObj.singan) return false
      return true
    },
    disabledDate(date) {
      return (new Date()) > date
    },
    partiya_title() {
      const date = new Date()
      console.log('can I save: ', this.canISave)
      if (!this.canISave) {
        Message({
          message:
            'Сиз синган киритолмайсиз, чунки бу тўпламда ушбу турда бутун махсулот сақланмаган, ёки аввал синмаган маҳсулот турини сақлаш керак',
          duration: 3500,
          type: 'error'
        })
      }
      console.log(this.formDataObj.singan ? 0 : 1)
      console.log('todays_product_nums', this.todays_product_nums)
      return `${this.productName}-${this.typeName}-${
        this.todays_product_nums + 1
      }${this.formDataObj.singan ? '-broken' : ''}-${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`
    },
    subTypes() {
      const pr = this.products_types.find(
        (product) => product._id === this.formDataObj.currentProduct
      )
      console.log('pr', pr)
      if (pr) {
        // eslint-disable-next-line
        this.productName = pr.product_name;
        return pr.product_types
      }
      return {}
    },
    errorOccured() {
      const checkNum = this.notCompletePacketItems()

      console.log('checkNum', checkNum)
      const errorInNum = checkNum - parseInt(checkNum)
      return errorInNum > 0.0
    },
    base_priceByText() {
      if (this.formDataObj.base_priceBy) {
        return 'Донаси'
      } else {
        return 'Юзаси (м2)'
      }
    }
  },
  mounted() {
    this.GET_PRODUCT_TYPES()
    this.GET_PRODUCTS()
    setTimeout(() => {
      console.log(this.$refs.draggableTable)
      this.$refs.draggableTable._sortable.options.onEnd = (evn) => {
        console.log('EVN', evn)
      }
    }, 100)
  },
  methods: {
    ...mapMutations('products', [
      'SET_NEW_BATCH_OF_PRODUCTS',
      'REMOVE_FROM_NEW_BATCH',
      'SET_NEW_BATCH_OF_PRODUCTS_DRAG'
    ]),
    ...mapActions('products', [
      'GET_PRODUCT_TYPES',
      'GET_PRODUCTS',
      'GET_TODAYS_PRODUCTS'
    ]),
    currentProductIsGoingToChange(product) {
      if (this.formDataObj.currentProduct) {
        this.product_changing_warnig = true
        this.temp_current_product = product
      } else {
        this.formDataObj.currentProduct = product
      }
    },
    donotDeleteCurrentWork() {
      this.product_changing_warnig = false
      this.temp_current_product = ''
    },
    deleteAllWorkAndSetNewProduct() {
      this.product_changing_warnig = false
      this.formDataObj.currentProduct = this.temp_current_product
      this.temp_current_product = ''
      this.SET_NEW_BATCH_OF_PRODUCTS(-1)
    },
    storeToSklad() {
      const sendData = {
        partiya: this.todays_product_nums + 1,
        title: this.partiya_title,
        product: this.formDataObj.currentProduct,
        product_type: this.formDataObj.current_subType,
        product_type_name: this.typeName,
        area_of_an_item: parseFloat(this.areaOfOneItem()),
        number_of_items: parseFloat(this.formDataObj.numberOfItems),
        wight_of_one_packet: parseFloat(this.formDataObj.weightOfPacket),
        area_of_one_packet: parseFloat(this.areaOfOnePacket()),
        weight_of_an_item: parseFloat(this.wightOfOneItem()),
        base_price: parseFloat(this.formDataObj.base_price),
        price_by: this.formDataObj.base_priceBy,
        broken: this.formDataObj.singan,
        total_area: parseFloat(this.formDataObj.totalArea),
        total_number_of_items: parseFloat(this.formDataObj.totalNumberOfItem),
        total_number_of_packets: parseFloat(this.formDataObj.numberOfPacket),
        total_wight_of_packets: parseFloat(this.totalWeight()),
        total_number_of_over_packet: parseFloat(this.notCompletePacketItems()),
        description: this.formDataObj.description,
        target_date: this.formDataObj.target_date,
        editTargetDate: this.editTarget,
        editing_same_type: this.editing_same_type
      }
      this.$refs.storeFormRef.validate((valid) => {
        if (valid && this.canISave) {
          this.SET_NEW_BATCH_OF_PRODUCTS(sendData)
          this.dragKey = Math.floor(Math.random() * 200)
          setTimeout(() => {
            this.$refs.draggableTable._sortable.options.onEnd = (evn) => {
              const { newDraggableIndex, newIndex, oldDraggableIndex, oldIndex } = evn
              this.SET_NEW_BATCH_OF_PRODUCTS_DRAG({ newDraggableIndex, newIndex, oldDraggableIndex, oldIndex })
            }
          }, 250)
          this.currentTableKey = Math.floor(Math.random() * 100)
          this.resetAll()
        } else {
          return false
        }
      })
    },

    changedBrokenState(val) {
      const indexOfExistingProductType = this.new_batch_of_product.findIndex(pr => pr.product_type === this.formDataObj.current_subType)
      this.there_is_product_type = indexOfExistingProductType !== -1
      const indexOfBrokenExistingProductType = this.new_batch_of_product.findIndex(pr => pr.product_type === this.formDataObj.current_subType && pr.broken)
      if (this.there_is_product_type) {
        if (val) {
          this.hidePacketField = true
          this.formDataObj.singan = true

          if (indexOfBrokenExistingProductType > -1) {
            this.formDataObj.totalArea = this.new_batch_of_product[indexOfBrokenExistingProductType].total_area
            this.formDataObj.overPacketNumberOfItems = this.new_batch_of_product[indexOfBrokenExistingProductType].total_number_of_over_packet
            this.formDataObj.numberOfPacket = this.new_batch_of_product[indexOfBrokenExistingProductType].total_number_of_packets
            this.formDataObj.totalNumberOfItem = this.new_batch_of_product[indexOfBrokenExistingProductType].total_number_of_items
          } else {
            this.editing_same_type = false
            this.formDataObj.totalArea = ''
            this.formDataObj.overPacketNumberOfItems = ''
            this.formDataObj.numberOfPacket = ''
            this.formDataObj.totalNumberOfItem = ''
          }

          this.formDataObj.numberOfItems = this.new_batch_of_product[indexOfExistingProductType].number_of_items
          this.formDataObj.weightOfPacket = this.new_batch_of_product[indexOfExistingProductType].wight_of_one_packet
          this.formDataObj.base_price = this.new_batch_of_product[indexOfExistingProductType].base_price
          this.formDataObj.base_priceBy = this.new_batch_of_product[indexOfExistingProductType].price_by
        } else {
          this.setIfAlreadyEnteredType(this.formDataObj.current_subType)
          this.hidePacketField = false
          this.formDataObj.singan = false
        }
      } else {
        Message({
          message:
            'Сиз синган киритолмайсиз, чунки бу тўпламда ушбу турда бутун махсулот сақланмаган, ёки аввал синмаган маҳсулот турини сақлаш керак',
          duration: 4500,
          type: 'error'
        })
      }
    },

    resetAll() {
      console.log('resetting all...')
      this.editing_same_type = false
      const currentProduct = this.formDataObj.currentProduct
      this.formDataObj.current_subType = ''
      this.formDataObj.current_subTypeName = ''
      this.formDataObj.base_priceBy = false
      this.formDataObj.singan = false
      this.formDataObj.totalArea = ''
      this.formDataObj.target_date = ''
      this.formDataObj.base_price = ''
      this.formDataObj.weightOfPacket = ''
      this.formDataObj.overPacketNumberOfItems = ''
      this.formDataObj.numberOfPacket = ''
      this.formDataObj.totalNumberOfItem = ''
      this.formDataObj.numberOfItems = ''
      this.currentType = {}
      this.formDataObj.description = ''
      this.areaOfOneItem()
      this.areaOfOnePacket()
      this.wightOfOneItem()
      this.totalNumberOfItems()
      this.numberOfPackets()
      this.totalWeight()
      this.areaOfOneItem()
      this.typeName = ''
      this.$refs.storeFormRef.resetFields()
      this.formDataObj.currentProduct = currentProduct
      this.hidePacketField = false
    },
    setCurrentType(val) {
      this.setIfAlreadyEnteredType(val)
      this.formDataObj.singan = false
      const pr = this.products_types.find(
        (product) => product._id === this.formDataObj.currentProduct
      )
      if (pr) {
        this.currentType = pr.product_types.find((type) => type._id === val)
        this.typeName = this.currentType.type_name
        this.GET_TODAYS_PRODUCTS({
          product: this.formDataObj.currentProduct,
          product_type: this.formDataObj.current_subType,
          isBroken: this.formDataObj.singan
        }).then(() => {
          this.getTargetDate(this.formDataObj.current_subType)
        })
      } else {
        this.currentType = {}
        this.formDataObj.weightOfPacket = ''
        this.formDataObj.numberOfItems = ''
      }
    },
    areaOfOneItem() {
      return (this.currentType.height * this.currentType.width) / 10000.0
    },
    areaOfOnePacket() {
      return parseFloat(((
        ((this.currentType.height * this.currentType.width) / 10000.0) *
        this.formDataObj.numberOfItems
      )).toFixed(4))
    },
    wightOfOneItem() {
      return (
        this.formDataObj.weightOfPacket / this.formDataObj.numberOfItems
      ).toFixed(2)
    }, totalWeight() {
      return (this.wightOfOneItem() * this.totalNumberOfItems()).toFixed(2)
    },
    totalAreaChanged() {
      this.formDataObj.totalNumberOfItem = parseFloat((this.formDataObj.totalArea / this.areaOfOneItem()).toFixed(2))
      this.formDataObj.numberOfPacket = parseInt((this.formDataObj.totalNumberOfItem / this.formDataObj.numberOfItems).toFixed(2))
    },
    changedTotalNumber(num) {
      this.formDataObj.totalNumberOfItem = Number(num)
      this.formDataObj.numberOfPacket = parseInt(this.formDataObj.totalNumberOfItem / this.formDataObj.numberOfItems)
      this.formDataObj.overPacketNumberOfItems = this.formDataObj.totalNumberOfItem % this.formDataObj.numberOfItems
      console.log(this.formDataObj.numberOfPacket)
      this.formDataObj.totalArea = parseFloat((this.formDataObj.totalNumberOfItem * this.areaOfOneItem()).toFixed(4))
    },
    changedTotalPacketNumber(num) {
      this.formDataObj.numberOfPacket = Number(num)
      this.formDataObj.totalNumberOfItem = this.formDataObj.numberOfItems * this.formDataObj.numberOfPacket + this.formDataObj.overPacketNumberOfItems
      this.formDataObj.totalArea = parseFloat((this.formDataObj.totalNumberOfItem * this.areaOfOneItem()).toFixed(4))
    },
    totalNumberOfItems() {
      return (this.formDataObj.totalArea / this.areaOfOneItem()).toFixed(3)
    },
    numberOfPackets() {
      return parseInt(
        this.totalNumberOfItems() / this.formDataObj.numberOfItems
      )
    },
    getDate(d) {
      const date = new Date(d)
      return `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()}`
    },
    notCompletePacketItems() {
      return (this.formDataObj.totalNumberOfItem) % this.formDataObj.numberOfItems
    },
    notCompletePacketItem(num) {
      this.formDataObj.numberOfItems = Number(this.formDataObj.numberOfItems)
      this.formDataObj.overPacketNumberOfItems = Number(num) > this.formDataObj.numberOfItems ? this.formDataObj.numberOfItems : Number(num)
      if (this.formDataObj.numberOfPacket || this.formDataObj.numberOfPacket === 0) {
        this.formDataObj.totalNumberOfItem = this.formDataObj.numberOfPacket * this.formDataObj.numberOfItems + this.formDataObj.overPacketNumberOfItems
        this.formDataObj.totalArea = parseFloat((this.formDataObj.totalNumberOfItem * this.areaOfOneItem()).toFixed(4))
      }
    },
    getTargetDate(type) {
      let typeObj
      if (this.new_batch_of_product.length > 0) {
        typeObj = this.new_batch_of_product[0]
      }

      if (typeObj) {
        this.isTargetSet = true
        this.formDataObj.target_date = typeObj.target_date
        this.formDataObj.numberOfItems = typeObj.number_of_items
        this.areaOfOnePacket()
        this.formDataObj.weightOfPacket = typeObj.wight_of_one_packet
        this.wightOfOneItem()
        this.formDataObj.base_price = typeObj.base_price
        this.formDataObj.base_priceBy = typeObj.price_by
      } else {
        this.isTargetSet = false
        this.formDataObj.target_date = ''
      }
    },
    removeFromNewBatch(ind) {
      this.REMOVE_FROM_NEW_BATCH(ind)
    },
    setIfAlreadyEnteredType(type_id) {
      const typeObj = this.new_batch_of_product.find(pr => pr.product_type === type_id)

      if (typeObj) {
        this.editing_same_type = true
        console.log('editing_same_type')
        this.formDataObj.base_priceBy = typeObj.price_by
        this.formDataObj.singan = typeObj.broken
        this.formDataObj.base_price = typeObj.base_price
        this.formDataObj.target_date = typeObj.target_date
        this.formDataObj.weightOfPacket = typeObj.wight_of_one_packet
        this.formDataObj.numberOfItems = typeObj.number_of_items

        this.formDataObj.totalArea = typeObj.total_area
        this.formDataObj.overPacketNumberOfItems = typeObj.total_number_of_over_packet
        this.formDataObj.numberOfPacket = typeObj.total_number_of_packets
        this.formDataObj.totalNumberOfItem = typeObj.total_number_of_items
        // this.currentType = {}
        this.formDataObj.description = typeObj.description
        this.areaOfOneItem()
        this.areaOfOnePacket()
        this.wightOfOneItem()
        this.totalNumberOfItems()
        this.numberOfPackets()
        this.totalWeight()
        this.areaOfOneItem()
      } else {
        this.editing_same_type = false
        this.formDataObj.base_priceBy = false
        this.formDataObj.singan = ''
        this.formDataObj.totalArea = ''
        this.formDataObj.target_date = ''
        this.formDataObj.base_price = ''
        this.formDataObj.weightOfPacket = ''
        this.formDataObj.overPacketNumberOfItems = ''
        this.formDataObj.numberOfPacket = ''
        this.formDataObj.totalNumberOfItem = ''
        this.formDataObj.numberOfItems = ''
        // this.currentType = {}
        this.formDataObj.description = ''
        this.areaOfOneItem()
        this.areaOfOnePacket()
        this.wightOfOneItem()
        this.totalNumberOfItems()
        this.numberOfPackets()
        this.totalWeight()
        this.areaOfOneItem()
      }
    },
    saveAllToSklad() {
      this.isSaving = true
      request({
        url: '/products/add-product',
        method: 'POST',
        data: { new_batch: this.new_batch_of_product_to_be_send },
        timeout: 30000
      })
        .then((res) => {
          this.isSaving = false
          this.editTarget = false
          this.SET_NEW_BATCH_OF_PRODUCTS(-1)
          Message({
            message: 'Махсулот мувоффақиятли сақланди',
            duration: 2000,
            type: 'success'
          })
          this.resetAll()
        })
        .catch((err) => {
          this.isSaving = false
          Message({
            message: 'Махсулот сақлашда хатолик: ' + err.response.data,
            duration: 4000,
            type: 'error'
          })
        })
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
