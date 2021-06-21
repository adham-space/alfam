<template>
  <div>
    <el-row :gutter="10" class="drivers-body">
      <el-col :span="24" class="drivers-page-tools">
        <div style="display: flex">
          <el-input v-model="search_input" style="border: 1px solid transparent" placeholder="Search for user">
            <el-select slot="prepend" v-model="search_type" :style="search_type == 1 || search_type == 2 ? {'width': '5.5rem'} : {'width': '10rem'} " placeholder="Select">
              <el-option label="ID" :value="1" />
              <el-option label="Name" :value="2" />
              <el-option label="Registred date" :value="3" />
              <el-option label="Shopping times" :value="4" />
              <el-option label="Shopping amount" :value="5" />
            </el-select>
          </el-input>
          <el-button style=" border: 1px solid transparent; margin-left: .5rem " icon="el-icon-search" />
        </div>
        <div>
          <el-button style="border: 1px solid transparent"><svg-icon style="color: green" icon-class="excel" /></el-button>
          <el-button style="border: 1px solid transparent" icon="el-icon-plus" />
          <el-button style="border: 1px solid transparent" icon="el-icon-edit" />
          <el-button style="border: 1px solid transparent; color: red" icon="el-icon-delete" />
        </div>
      </el-col>
      <el-col :span="24" class="drivers-page-body">
        <el-table
          style="width: 100%;"
          height="calc(100% - 3.5rem)"
          :data="tableData"
        >
          <el-table-column align="center" prop="id" label="ID" />
          <el-table-column align="center" prop="name" label="Name" />
          <el-table-column align="center" prop="createdAt" label="Registred date" />
          <el-table-column align="center" prop="shopping_times" label="Shopping times" />
          <el-table-column align="center" prop="shopping_amount" label="Shopping amount" />
        </el-table>
        <div class="pgntion">
          <Pagination
            :total="102"
            :page="1"
            :limit="20"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data: () => ({
    search_input: '',
    search_type: 1,
    tableData: [{
      id: '112',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '112',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '112',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '112',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '112',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '112',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '112',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '112',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '112',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '112',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '112',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '113',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '113',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '113',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '113',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '113',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '113',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '113',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '113',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '113',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }, {
      id: '11231',
      name: 'Adham',
      createdAt: '12/02/2021',
      shopping_amount: '120 000',
      shopping_times: '5'
    }]
  })
}
</script>

<style>
    .drivers-body {
        background-color: rgb(243, 243, 243);
        height: calc(100vh - 89px);
        width: 100%;
        padding: 1rem;
    }

    .el-input-group__append, .el-input-group__prepend {
        background-color: white;
    }
    .drivers-page-tools, .drivers-page-body {
        background-color: white;
        border-radius: 8px;
    }

    .drivers-page-tools {
        height: 3rem;
        /* border: 1px solid red; */
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .drivers-page-body {
        margin-top: 1rem;
        height: calc(100vh - 6rem - 89px);
    }

    .pgntion {
        height: 3.5rem;
        display: flex;
        align-items: center;
    }
</style>
