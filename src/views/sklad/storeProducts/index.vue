<template>
  <el-row>
    <el-col class="toolbar-store" :md="{ offset: 6, span: 12 }">
      <el-cascader :options="options" clearable @change="typeChoosen" />
    </el-col>
    <el-col
      class="store-bdy"
      :lg="{ offset: 6, span: 12 }"
      :md="{ offset: 4, span: 16 }"
    >
      <el-card shadow="hover" class="box-card">
        <div slot="header" class="clearfix">
          <span>Create one packet</span>
        </div>
        <div class="one-packet">
          <span><span
                  style="color: darkgray; margin-right: 1rem"
                >AREA OF ONE ITEM: </span>{{
                  Object.keys(currentType).length > 0
                    ? areaOfOneItem()
                    : "_"
                }}
            <span style="color: darkgray">M<sup>2</sup></span></span>

          <div class="amountAndWeight">
            <span
              style="margin-top: 1rem"
            ><span
               style="color: darkgray; margin-right: 1rem"
             >NUMBER OF ITEMS:
             </span>
              <el-input
                v-model="numberOfItems"
                style="width: 100px"
                type="number"
                placeholder="Num"
              /></span>
            <span
              style="margin-top: 1rem; margin-left: 1rem"
            ><span
               style="color: darkgray; margin-right: 1rem"
             >WEIGHT OF ONE PACKED:
             </span>
              <el-input
                v-model="weightOfPacket"
                style="width: 100px"
                type="number"
                placeholder="Kg"
              /></span>
          </div>

          <span
            style="margin-top: 1rem"
          ><span
             style="color: darkgray; margin-right: 1rem"
           >AREA OF ONE PACKET: </span>{{
             numberOfItems === ""
               ? "_"
               : areaOfOnePacket()
           }}
            <span style="color: darkgray">M<sup>2</sup></span></span>

          <span
            style="margin-top: 1rem"
          ><span
             style="color: darkgray; margin-right: 1rem"
           >WEIGHT OF AN ITEM: </span>{{
             weightOfPacket === ""
               ? "_"
               : wightOfOneItem()
           }}
            <span style="color: darkgray">Kg</span></span>
        </div>
      </el-card>

      <el-card shadow="hover" class="box-card" style="margin-top: 1rem">
        <div slot="header" class="clearfix">
          <span>Store to sklad</span>
        </div>
        <div class="one-packet">
          <span><span
                  style="color: darkgray; margin-right: 1rem"
                >TOTAL AREA:
                </span>
            <el-input
              v-model="totalArea"
              style="width: 150px"
              type="number"
              placeholder="M2"
            /></span>
          <span
            style="margin-top: 1rem"
          ><span style="color: darkgray">TOTAL NUMBER OF ITEMS: </span>{{
            Object.keys(currentType).length > 0 && totalArea !== ""
              ? totalNumberOfItems()
              : "_"
          }}
            dona</span>

          <span
            style="margin-top: 1rem"
          ><span style="color: darkgray">TOTAL NUMBER OF PACKETS: </span><span :style="{'color' : errorOccured ? 'red': 'black'}">
            {{
              Object.keys(currentType).length > 0 && totalArea !== ""
                ? numberOfPackets() + ' / ' + notCompletePacketItems() + ' dona'
                : "_"
            }}
          </span>

            <el-tooltip v-if="errorOccured" class="item" effect="dark" content="(m2) MA'LUMOTI XATO KIRITILGAN" placement="top">
              <i style="color: red" class="el-icon-circle-close"> XATO</i>
            </el-tooltip>

          </span>

          <span
            style="margin-top: 1rem"
          ><span style="color: darkgray">TOTAL WEIGHT OF PACKETS: </span>{{
            Object.keys(currentType).length > 0 && totalArea !== ""
              ? totalWeight()
              : "_"
          }}
            Kg</span>
        </div>
      </el-card>
      <el-button
        style="color: green; margin-top: 1rem"
      >Store to sklad</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      totalArea: '',
      numberOfItems: '',
      weightOfPacket: '',
      currentType: {},
      options: [
        {
          label: 'Nilufar',
          value: 0,
          children: [
            {
              value: 0,
              label: 'Ochi',
              code: '1191A',
              height: 30,
              width: 80,
              photo: {
                status: 'fail',
                name: 'image_2021-02-19_10-50-53.png',
                size: 54827,
                percentage: 100,
                uid: 1613977212930,
                raw: '[object File]',
                url:
                  'blob:http://localhost:9527/1b4b5fcb-600c-4a7c-8027-31ab63e0d148'
              }
            },
            {
              value: 1,
              label: "To'qi",
              code: '1191B',
              height: 30,
              width: 90,
              photo: {
                status: 'fail',
                name: 'image_2021-02-18_10-52-12.png',
                size: 44762,
                percentage: 100,
                uid: 1613977232481,
                raw: '[object File]',
                url:
                  'blob:http://localhost:9527/0ce56dd8-8004-47c5-b194-cabe40f4e34e'
              }
            },
            {
              value: 3,
              label: 'Decor',
              code: '1191C',
              height: 30,
              width: 90,
              photo: {
                status: 'fail',
                name: 'image_2021-02-19_13-32-15.png',
                size: 16961,
                percentage: 100,
                uid: 1613977257115,
                raw: '[object File]',
                url:
                  'blob:http://localhost:9527/b1a02b1a-4778-4ab9-9674-d8f418de214d'
              }
            },
            {
              value: 4,
              label: 'Pol',
              code: '1191D',
              height: 30,
              width: 30,
              photo: {
                status: 'fail',
                name: 'image_2021-02-19_13-32-15.png',
                size: 16961,
                percentage: 100,
                uid: 1613977257115,
                raw: '[object File]',
                url:
                  'blob:http://localhost:9527/b1a02b1a-4778-4ab9-9674-d8f418de214d'
              }
            },
            {
              value: 5,
              label: 'Friz',
              code: '1191F',
              height: 6,
              width: 30,
              photo: {
                status: 'fail',
                name: 'image_2021-02-19_13-32-15.png',
                size: 16961,
                percentage: 100,
                uid: 1613977257115,
                raw: '[object File]',
                url:
                  'blob:http://localhost:9527/b1a02b1a-4778-4ab9-9674-d8f418de214d'
              }
            },
            {
              value: 6,
              label: 'Sigara',
              code: '1191S',
              height: 2,
              width: 30,
              photo: {
                status: 'fail',
                name: 'image_2021-02-19_13-32-15.png',
                size: 16961,
                percentage: 100,
                uid: 1613977257115,
                raw: '[object File]',
                url:
                  'blob:http://localhost:9527/b1a02b1a-4778-4ab9-9674-d8f418de214d'
              }
            }
          ]
        }
      ]
    }
  },
  computed: {
    errorOccured() {
      const checkNum = this.notCompletePacketItems()
      const errorInNum = checkNum - parseInt(checkNum)
      return errorInNum > 0.0
    }
  },
  methods: {
    typeChoosen(typ) {
      console.log('type: ', typ[1])
      if (typ[0] !== undefined) {
        const types = this.options.find((p) => p.value === typ[0]).children
        this.currentType = types.find((t) => t.value === typ[1])
      } else {
        this.currentType = {}
        this.weightOfPacket = ''
        this.numberOfItems = ''
      }
    },

    areaOfOneItem() {
      return this.currentType.height * this.currentType.width / 10000.0
    },
    areaOfOnePacket() {
      return this.currentType.height * this.currentType.width / 10000.0 * this.numberOfItems
    },
    wightOfOneItem() {
      return (this.weightOfPacket / this.numberOfItems).toFixed(2)
    },

    totalWeight() {
      return (this.wightOfOneItem() * this.totalNumberOfItems()).toFixed(2)
    },

    totalNumberOfItems() {
      return (this.totalArea / this.areaOfOneItem()).toFixed(3)
    },
    numberOfPackets() {
      return parseInt(this.totalNumberOfItems() / this.numberOfItems)
    },

    notCompletePacketItems() {
      return this.totalNumberOfItems() % this.numberOfItems
    }

  }
}
</script>

<style>
.toolbar-store {
  display: flex;
  align-items: center;
  height: 3rem;
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

.amountAndWeight {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
