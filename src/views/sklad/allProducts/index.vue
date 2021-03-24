<template>
  <el-row
    style="height: 100%; border: 2px solid blue; padding: 1em"
  >
    <el-col
      class="sizes"
      :md="{ offset: 1, span: 22 }"
      :sm="{ offset: 0, span: 16 }"
      style="height: 3rem"
    >
      <el-button
        v-for="(btn, i) in sizes"
        :key="i"
        style="margin: 0.3em"
        @click="showCurrentSizeOptions(btn)"
      >
        {{ btn.size }} | {{ btn.cnt }}
      </el-button>
    </el-col>
    <el-col :md="{ offset: 1, span: 22 }" :sm="{ offset: 0, span: 16 }">
      <el-table border width="100%" :data="products_">
        <el-table-column
          type="index"
          label="No"
          align="center"
        />
        <el-table-column
          prop="name"
          label="Kafelni nomi"
          align="center"
          min-width="150px"
        />
        <el-table-column
          v-for="(col, index) in columns"
          :key="index"
          :prop="col.prop"
          :label="col.label"
          :min-width="col.minWidth"
          align="center"
        />
      </el-table>
    </el-col>
    <el-dialog title="" :visible.sync="showImageDilog" width="40%">
      <el-image
        style="width: 90%; height: 90%"
        :src="imageUrl"
        fit="scale-down"
      />
    </el-dialog>

    <el-dialog
      :title="currentSize"
      :visible.sync="dialogSizes"
      align="center"
      fullscreen
    >
      <ul v-for="item in currentOptions" :key="item" class="list" @click="goToPcaking(item)">
        <li class="item">
          <h3>Nilufar</h3>
          <div class="inner-item">
            <span>NAME: Decor</span>
            <span>
              <el-image
                style="width: 90px; height: 90px"
                src="https://images.unsplash.com/photo-1612831661153-4914a5ff7851?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2125&q=80"
                fit="scale-down"
              /></span>
          </div>
        </li>
      </ul>

    </el-dialog>
  </el-row>
</template>

<script>
export default {
  name: 'AllProducts',
  data() {
    return {
      showImageDilog: false,
      currentType: '',
      imageUrl: '',
      currentProduct: {},
      dialogSizes: false,
      currentOptions: 0,
      currentSize: '',
      sizes: [{ size: '60*120', cnt: 5 }, { size: '30*90', cnt: 3 }, { size: '30*90', cnt: 8 }, { size: '30*90', cnt: 4 }, { size: '30*90', cnt: 4 }, { size: '30*90', cnt: 2 }, { size: '30*90', cnt: 6 }],
      products_: [
        {
          name: 'Alisher',
          type1_name: 'Decor',
          type1_size: '60*120',
          type1_total_are: '245',
          type1_code: 'D-001',
          type1_photo: '',

          type2_name: 'Ochi',
          type2_size: '60*120',
          type2_total_are: '245',
          type2_code: 'O-001',
          type2_photo: '',

          type3_name: "To'qi",
          type3_size: '60*120',
          type3_total_are: '245',
          type3_code: 'O-001',
          type3_photo: ''
        },
        {
          name: 'Mosh',
          type1_name: 'Decor',
          type1_size: '30*90',
          type1_total_are: '245',
          type1_code: 'D-001',
          type1_photo: '',

          type2_name: 'Ochi',
          type2_size: '50*80',
          type2_total_are: '245',
          type2_code: 'O-001',
          type2_photo: ''
        }
      ],

      columns: [
        {
          prop: 'type2_total_are',
          label: 'Ochi (M2)',
          minWidth: '120px'
        },

        {
          prop: 'type2_code',
          label: 'Code',
          minWidth: '120px'
        },
        {
          prop: 'type2_size',
          label: 'Ochi (Size)',
          minWidth: '120px'
        },
        {
          prop: 'type2_photo',
          label: 'Kafelni rasmi',
          minWidth: '120px'
        },

        {
          prop: 'type3_total_are',
          label: "To'qi (M2)",
          minWidth: '120px'
        },

        {
          prop: 'type3_code',
          label: 'Code',
          minWidth: '120px'
        },
        {
          prop: 'type3_size',
          label: "To'qi (Size)",
          minWidth: '120px'
        },
        {
          prop: 'type3_photo',
          label: 'Kafelni rasmi',
          minWidth: '120px'
        },

        {
          prop: 'type1_total_are',
          label: 'Decor (M2)',
          minWidth: '120px'
        },

        {
          prop: 'type1_code',
          label: 'Code',
          minWidth: '120px'
        },
        {
          prop: 'type1_size',
          label: 'Decor (Size)',
          minWidth: '120px'
        },
        {
          prop: 'type1_photo',
          label: 'Kafelni rasmi',
          minWidth: '120px'
        }
      ],

      products: [
        {
          name: 'Adham',
          id: 0,
          types: [
            {
              id: 0,
              name: 'Decor',
              code: 'D-001',
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
              id: 1,
              name: 'Pol',
              code: 'P-001',
              height: 23,
              width: 54,
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
              id: 2,
              name: 'Freez',
              code: 'F-001',
              height: 45,
              width: 12,
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
        },
        {
          name: 'Akbar',
          id: 1,
          types: [
            {
              id: 0,
              name: 'Decor',
              code: 'D-001',
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
              id: 1,
              name: 'Pol',
              code: 'P-001',
              height: 23,
              width: 54,
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
              id: 2,
              name: 'Freez',
              code: 'F-001',
              height: 45,
              width: 12,
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
        },
        {
          name: 'Sardor',
          id: 2,
          types: [
            {
              id: 0,
              name: 'Decor',
              code: 'D-001',
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
              id: 1,
              name: 'Pol',
              code: 'P-001',
              height: 23,
              width: 54,
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
              id: 2,
              name: 'Freez',
              code: 'F-001',
              height: 45,
              width: 12,
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
        },
        {
          id: 3,
          name: 'Alisher',
          types: [
            {
              id: 0,
              name: 'Decor',
              code: 'D-001',
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
              id: 1,
              name: 'Pol',
              code: 'P-001',
              height: 23,
              width: 54,
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
              id: 2,
              name: 'Freez',
              code: 'F-001',
              height: 45,
              width: 12,
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
  methods: {
    goToPcaking(item) {
      this.$router.push({
        path: '/sklad/packing-list',
        query: {
          item
        }
      })
      this.dialogSizes = false
    },
    showCurrentSizeOptions(btn) {
      this.dialogSizes = true
      this.currentSize = btn.size
      this.currentOptions = btn.cnt
    },
    showImage(name, url) {
      this.showImageDilog = true
      this.currentType = name
      this.imageUrl = url
    },
    setCurrentRow(currnetRow, oldRow) {
      console.log(currnetRow)
      this.currentProduct = currnetRow
    }
  }
}
</script>

<style>
.sizes {
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  margin-bottom: 1em;
}

.list {
  max-width: 650px;
  list-style: none;
  padding: .2em;
  /* border: 1px solid red; */
  background: rgb(244, 253, 255);
  display: flex;
  /* border: 2px solid transparent; */
  border-radius: 8px;
  overflow: hidden;
}

.list:hover {
  /* border: 2px solid #eee; */
-webkit-box-shadow: 10px 29px 63px -24px rgba(7,71,50,1);
-moz-box-shadow: 10px 29px 63px -24px rgba(7,71,50,1);
box-shadow: 10px 29px 63px -24px rgba(7,71,50,1);
cursor: pointer;
}

.list > ul,
li {
  width: 100%;
  padding: 0;
  list-style: none;
}

.inner-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.item {
  /* border: 1px solid green; */
}
</style>
